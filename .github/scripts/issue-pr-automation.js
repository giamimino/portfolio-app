/**
 * @param {Object} Options
 * @param {import('@actions/github').context} Options.context
 * @param {ReturnType<import('@actions/github').getOctokit>} Options.github
 */

module.exports = async ({ github, context }) => {
  const comment = context.payload.comment.body.trim().toLowerCase();
  const issueNumber = context.payload.issue.number;
  const commenter = context.payload.comment.user.login;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  switch (comment) {
    case '/create':
      {
        console.log('Creating branch...');

        // step 1 create branch name

        const body = context.payload.issue.body;

        if (!body) {
          throw new Error(`Issue #${issueNumber} has no body.`);
        }

        const branchSection = body.split('## Branch')[1];

        if (!branchSection) {
          throw new Error("Missing '## Branch' section.");
        }

        const branchInfo = branchSection.split('``');

        const branchType = branchInfo[1];
        const branchName = branchInfo[3];

        if (!branchType || !branchName) {
          throw new Error('Invalid branch information.');
        }

        const branch = `${branchType}/${issueNumber}-${branchName}`;

        // step 2 Create Branch

        const { data: mainRef } = await github.rest.git.getRef({
          owner: owner,
          repo: repo,
          ref: 'heads/main',
        });

        const sha = mainRef.object.sha;

        await github.rest.git.createRef({
          owner: owner,
          repo: repo,
          ref: `refs/heads/${branch}`,
          sha,
        });

        // step 3 Create initial commit

        await github.rest.repos.createOrUpdateFileContents({
          owner: owner,
          repo: repo,
          path: 'ISSUE.md',
          message: 'Initialize issue branch',
          content: Buffer.from(body).toString('base64'),
          branch,
          committer: {
            name: 'github-actions[bot]',
            email: '41898282+github-actions[bot]@users.noreply.github.com',
          },
          author: {
            name: 'github-actions[bot]',
            email: '41898282+github-actions[bot]@users.noreply.github.com',
          },
        });

        console.log(`Created branch: ${branch}`);

        // step 4 Create PR

        console.log('Creating PR...');

        const issueTitle = context.payload.issue.title;

        const { data: PR } = await github.rest.pulls.create({
          owner: owner,
          repo: repo,
          title: issueTitle,
          head: branch,
          base: 'main',
          body: `Created automatically from issue #${issueNumber}`,
        });

        const milestone = context.payload.issue.milestone?.number;

        console.log(`Commenter: ${commenter}`);
        console.log(
          `Milestone: ${context.payload.issue.milestone?.number ?? 'none'}`,
        );

        await github.rest.issues.update({
          owner,
          repo,
          issue_number: PR.number,
          assignees: [commenter],
          milestone,
        });

        console.log(`Created PR #${PR.number}: ${PR.html_url}`);

        // step 5 Sync issue labels to PR

        console.log('Syncing issue labels to PR...');

        const labels = context.payload.issue.labels.map(label => label.name);

        await github.rest.issues.addLabels({
          owner: owner,
          repo: repo,
          issue_number: PR.number,
          labels,
        });

        console.log('issue labels successfully synced to PR');

        // step 6 Update issue labels

        await github.rest.issues.addLabels({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          labels: ['in-progress'],
        });

        // step 7 Comment on issue

        console.log('commenting on issue...');

        const commentBody = `
      ## ✅ Assignment completed successfully

      **Branch:** \`${branch}\`

      The development branch has been created and is ready to use.   
      `;

        await github.rest.issues.createComment({
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
          body: commentBody,
        });

        console.log('successfully commented on issue');
        console.log('The /create command was successfully executed');
      }
      break;

    case '/merge':
      {
        // step 1 Get PR number

        console.log('Getting PR Number...');

        const { data: pulls } = await github.rest.pulls.list({
          owner,
          repo,
          state: 'open',
          per_page: 100,
        });

        const pull = pulls.find(pr =>
          pr.body?.includes(`Created automatically from issue #${issueNumber}`),
        );

        if (!pull) {
          throw new Error(`No PR found for issue #${issueNumber}`);
        }

        const prNumber = pull.number;

        console.log(`Found PR #${prNumber}`);

        // step 2 Merge PR

        console.log('Merging PR...');

        const { data: mergeResult } = await github.rest.pulls.merge({
          owner,
          repo,
          pull_number: prNumber,
          merge_method: 'squash',
        });

        if (!mergeResult.merged) {
          throw new Error(
            `Failed to merge PR #${prNumber}: ${mergeResult.message}`,
          );
        }

        console.log(`Successfully merged PR #${prNumber}`);

        // step 3 Delete merged branch

        console.log(`Deleting merged branch...`);

        const { data: PR } = await github.rest.pulls.get({
          owner,
          repo,
          pull_number: prNumber,
        });

        const mergedBranch = PR.head.ref;

        await github.rest.git.deleteRef({
          owner,
          repo,
          ref: `heads/${mergedBranch}`,
        });

        console.log(`Deleted branch: ${mergedBranch}`);

        // step 4 Update issue labels

        console.log('Updating issue labels...');

        const { data: labels } = await github.rest.issues.listLabelsOnIssue({
          owner,
          repo,
          issue_number: issueNumber,
        });

        const hasInProgress = labels.some(
          label => label.name === 'in-progress',
        );

        if (hasInProgress) {
          await github.rest.issues.removeLabel({
            owner,
            repo,
            issue_number: issueNumber,
            name: 'in-progress',
          });
        }

        await github.rest.issues.addLabels({
          owner,
          repo,
          issue_number: issueNumber,
          labels: ['closed'],
        });

        console.log('Successfully updated issue labels');

        // step 5 Close issue

        console.log('Closing issue...');

        if (context.payload.issue.state !== 'closed') {
          await github.rest.issues.update({
            owner,
            repo,
            issue_number: issueNumber,
            state: 'closed',
          });

          await github.rest.issues.createComment({
            owner,
            repo,
            issue_number: issueNumber,
            body: `### Issue Completed

The associated pull request has been successfully merged, and this issue has been automatically closed.

**Pull Request:** #${prNumber}
**Branch:** ${mergedBranch}`,
          });

          console.log(`Issue #${issueNumber} was closed `);
        } else {
          console.log(`Issue #${issueNumber} was already closed `);
        }
      }
      break;

    case '/close':
      {
        // step 1 Get PR number

        console.log('Getting PR Number...');

        const { data: pulls } = await github.rest.pulls.list({
          owner,
          repo,
          state: 'open',
          per_page: 100,
        });

        const pull = pulls.find(pr =>
          pr.body?.includes(`Created automatically from issue #${issueNumber}`),
        );

        if (!pull) {
          throw new Error(`No PR found for issue #${issueNumber}`);
        }

        const prNumber = pull.number;

        console.log(`Found PR #${prNumber}`);

        // step 2 Delete branch

        console.log(`Deleting branch...`);

        const { data: PR } = await github.rest.pulls.get({
          owner,
          repo,
          pull_number: prNumber,
        });

        const branch = PR.head.ref;

        await github.rest.git.deleteRef({
          owner,
          repo,
          ref: `heads/${branch}`,
        });

        console.log(`Deleted branch: ${branch}`);

        // step 3 Update issue labels

        console.log('Updating issue labels...');

        const { data: labels } = await github.rest.issues.listLabelsOnIssue({
          owner,
          repo,
          issue_number: issueNumber,
        });

        const hasInProgress = labels.some(
          label => label.name === 'in-progress',
        );

        if (hasInProgress) {
          await github.rest.issues.removeLabel({
            owner,
            repo,
            issue_number: issueNumber,
            name: 'in-progress',
          });
        }

        await github.rest.issues.addLabels({
          owner,
          repo,
          issue_number: issueNumber,
          labels: ['closed'],
        });

        console.log('Successfully updated issue labels');

        // step 5 Close issue

        console.log('Closing issue...');

        if (context.payload.issue.state !== 'closed') {
          await github.rest.issues.update({
            owner,
            repo,
            issue_number: issueNumber,
            state: 'closed',
          });

          await github.rest.issues.createComment({
            owner,
            repo,
            issue_number: issueNumber,
            body: `### Issue Closed

The associated pull request has been closed, and this issue has been automatically closed.

**Pull Request:** #${prNumber}
**Branch:** ${mergedBranch}`,
          });

          console.log(`Issue #${issueNumber} was closed `);
        } else {
          console.log(`Issue #${issueNumber} was already closed `);
        }
      }
      break;
  }
};
