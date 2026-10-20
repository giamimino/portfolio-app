# API Versioning

## Overview

This document defines the API versioning strategy, compatibility rules, and lifecycle policy for the project.

API versioning allows the server and client applications to evolve independently while maintaining compatibility with older supported app versions.

Since users may not update their applications immediately, introducing breaking API changes must not automatically break clients that still depend on an older API contract.

## Route Structure

All API endpoints must include an explicit version in their URL.

The route convention is:

`/api/v{version}/{resource}`

Examples:

- `/api/v1/about`
- `/api/v1/projects`
- `/api/v2/projects`

Each API version represents a distinct, supported API contract.

## Versioning Rules

A new API version should be introduced when a change breaks compatibility with an existing API contract.

Examples of breaking changes include:

- Removing or renaming an endpoint.
- Removing or renaming response fields.
- Changing response field types or structures.
- Changing request requirements in a way that breaks existing clients.
- Changing endpoint behavior in a way that existing clients cannot safely handle.

Non-breaking changes, such as adding optional response fields or introducing new endpoints, may be implemented within the existing version when compatible with its contract.

Application releases do not automatically require new API versions. API versions are determined by API compatibility, not by the application's release number.

## Backward Compatibility

Multiple API versions may coexist on the same server.

When a new version introduces breaking changes, older supported versions must retain their existing API contracts.

For example, when introducing v2:

- `/api/v1/projects` continues returning the v1 response structure.
- `/api/v2/projects` may return a new response structure.
- Both versions may reuse the same underlying business logic where appropriate.

Version-specific routes and response transformations should remain separate from shared business logic to minimize unnecessary code duplication.

Changes to shared business logic must be evaluated for their impact on every supported API version.

## API Version Lifecycle

Each API version follows a defined lifecycle.

### Active

The version is supported and available for use by compatible clients. It receives applicable fixes and maintenance.

### Deprecated

The version remains operational, but clients should migrate to a newer supported version.

Deprecation must be documented and communicated before retirement. The retirement date should be announced whenever possible.

### Retired

The version is no longer supported and its endpoints may be removed.

Requests to retired versions should receive a consistent, documented error response rather than an unexpected server failure.

## Deprecation and Support Policy

The intended policy is to provide approximately one year of support after an API version is officially deprecated.

The support period and retirement date must be explicitly documented for each deprecated version.

Before retiring a version, the project should:

- Announce its deprecation and planned retirement date.
- Identify the affected application versions and clients where possible.
- Provide migration guidance for the replacement API version.
- Verify that the retirement will not unnecessarily disrupt supported clients.

The one-year period is a target policy and should be reviewed against actual client usage and maintenance constraints.

## Implementation Guidelines

- All API endpoints must follow the versioned route convention.
- Each version must preserve its documented request and response contracts.
- Shared services and business logic should be reused where practical.
- Version-specific behavior should be isolated to avoid unintended compatibility changes.
- API routes and compatibility behavior must be covered by appropriate tests.
- Version-specific documentation must be updated when contracts change.
- Existing clients must be considered before modifying or retiring an API version.

## Client Compatibility

Each client release should use the API version compatible with its implementation.

The client should not automatically switch to a newer API version unless its code supports that version's contract.

Updating the application and updating the API are separate operations. The server must account for supported clients that remain on older application releases.

## Adding a New API Version

When introducing a new API version:

1. Determine whether the change requires a breaking API contract.
2. Create the new versioned routes.
3. Define the new request and response contracts.
4. Reuse shared business logic where appropriate.
5. Add tests for the new version and existing supported versions.
6. Update the client to use the new version when appropriate.
7. Document the changes and any migration requirements.
8. Deprecate the previous version only when a retirement plan is established.

## Documentation Maintenance

This document is the source of truth for API versioning conventions and lifecycle policy.

Any architectural change that affects API versioning, compatibility, deprecation, or retirement must be reflected here.