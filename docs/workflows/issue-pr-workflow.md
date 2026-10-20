# Issue PR Workflow

The Issue PR Workflow automates common GitHub operations to reduce manual work and keep issues, branches, and pull requests organized. Developers can trigger these operations by commenting on an issue, allowing the bot to manage the branch and pull request lifecycle.

## Overview

The workflow starts with creating a GitHub issue containing the required metadata. A developer then triggers the bot by commenting on the issue with one of the supported commands.

The bot supports three commands:

**/create** - starts the implementation workflow by creating a branch and pull request.

**/merge** - merges the pull request and completes the workflow.

**/close** - closes the issue and pull request without merging.

### Workflow Lifecycle

1. Create an issue with the required milestone, labels, and branch information.
2. Comment `/create` on the issue to start the automated workflow.
3. The bot creates the branch and initial commit, creates a pull request, synchronizes the issue's labels and milestone to the pull request, adds the `in-progress` label to the issue, and assigns the user to the pull request.
4. Once the pull request is ready to be resolved, comment `/merge` to merge it or `/close` to close it without merging.
5. The bot deletes the branch, closes the issue, and replaces the `in-progress` label with the `closed` label. When `/merge` is used, the pull request is merged; when `/close` is used, it is closed without merging.

# How to create issue

issue should contain Milestone, labels and Branch name section in body

Branch section structure looks like this:

```
## Branch

type - `{type}`
name - `{name}`
```

Example:


```
## Branch

type - `feat`
name - `add-something`
```

```{type}/{issue-number}-{name}```
->
```feat/99-add-something```

### Note

Branch section should be at the end of body