# Changelog

All notable changes to this project are documented here.

## [v1.0.0-beta-1] - 2026-10-22

### Fixed

- Fixed production build issues.
- Fixed APK installation failures.
- Fixed APK installation issues with files downloaded from GitHub Releases.
- Fixed environment variable handling in production builds.
- Fixed the shared API library in the client application.
- Fixed responsiveness issues in the About section.
- Fixed the Project component's appearance in light mode.

### Changed
- Prepared the project for production deployment.
- Improved deployment readiness and production configuration.

## [v0.9.0] - 2026-10-21

### Changed
- Prepared the project for production deployment.
- Improved deployment readiness and production configuration.

## [v0.8.0] - 2026-10-21

### Added

- Added project documentation for architecture and development workflows.
- Added individual project detail pages with in-depth project information.
- Added a contact form API with email delivery support.

## [v0.7.0] - 2026-10-20

### Added
- Implemented shared API response caching to reduce redundant requests.
- Added a theme toggle to the header for switching between themes.
- Introduced server middleware for request processing.

### Changed
- Replaced origin-based API access checks with token-based authentication.

## [v0.6.0] - 2026-10-15

### Added
- Introduced a centralized API client to standardize communication with the server.
- Added TypeScript types for API responses.
- Added Project and About Me sections to the landing page.
- Created dedicated Projects and About pages.
- Introduced a landing page API endpoint.

## [v0.5.0] - 2026-10-11

### Added
- Integrated Firebase.
- Implemented server-side services and API endpoints.
- Added a landing page to the Home tab.

### Architecture
- Split the project into separate client and server applications.
- Established development workflows for both applications.
- Set up the server architecture with error handling, response formatting, and CORS configuration.

## [v0.4.0] - 2026-10-05

### Added
- Established the application layout, including SafeArea and Container components.
- Implemented the Home screen, Contact UI, and animated components.
- Introduced reusable header and navigation layouts.

## [v0.3.0] - 2026-09-28

### Added
- Established application navigation and centralized providers.
- Defined shared TypeScript types.
- Reorganized application assets.
- Introduced reusable UI components.
- Implemented a theme system supporting light, dark, and system preferences.

## [v0.2.0] - 2026-09-25

### Development Environment
- Initialized the React Native Expo project and established its file structure.
- Configured NativeWind and Prettier.
- Set up CI workflows, Husky, and lint-staged.
- Integrated Dependabot and automated GitHub issue and pull request workflows.

## [v0.1.0] - 2026-09-21

### Added
- Created the initial Portfolio App repository.
- Added the project license, versioning documentation, changelog, and initial project documentation.

### Status
Initial project setup. Application development had not yet started.