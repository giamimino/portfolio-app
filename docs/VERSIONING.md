# Versioning

This project is called **Portfolio-app** and uses the following versioning format:

`MAJOR.MINOR.PATCH`

The project may also use **beta versions** when a release contains significant changes that need testing before the stable release.

## Version Format

### MAJOR

The major version is increased when the project contains significant or breaking changes.

Example:

`1.5.3 → 2.0.0`

A major release may include:

* Major UI redesigns
* Significant architecture changes
* Breaking changes
* Large changes to existing functionality

### MINOR

The minor version is increased when new functionality or features are added without breaking the existing system.

Example:

`2.1.0 → 2.2.0`

Examples include:

* Adding a new feature
* Adding a new page
* Adding a new section
* Adding new functionality to an existing feature

### PATCH

The patch version is increased for small fixes and changes that do not significantly change the project's functionality.

Example:

`2.2.0 → 2.2.1`

Examples include:

* Bug fixes
* Small UI fixes
* Performance improvements
* Minor corrections

## Beta Releases

Beta versions are used when a release contains significant changes and needs additional testing before becoming a stable release.

For example:

`2.0.0-beta.1`

Then:

`2.0.0-beta.2`

After testing is completed:

`2.0.0`

Beta releases allow the new version to be tested before the final stable release.

## Example Release Cycle

A release with major changes might follow this process:

```text
1.5.3
  ↓
2.0.0-beta.1
  ↓
2.0.0-beta.2
  ↓
2.0.0
```

Each beta version may contain fixes or changes discovered during testing.

## General Rule

Versions should clearly communicate the scale of the changes:

* **MAJOR** → significant or breaking changes
* **MINOR** → new backward-compatible functionality
* **PATCH** → fixes and small changes
* **BETA** → pre-release version used for testing before the stable release
