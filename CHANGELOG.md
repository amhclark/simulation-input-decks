# Change Log

All notable changes to the "Simulation Input Decks" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.7] - 2024-03-03
### Changed
- Added explicit removal of rulers for non-fem/rad files
- Improved handling of global ruler settings

## [0.0.6] - 2024-03-03
### Changed
- Completely rewrote ruler management to use VS Code's language-specific settings
- Added automatic creation and management of workspace settings.json
- Improved Windows compatibility for ruler positions
- Added proper file associations for .fem and .rad files

## [0.0.5] - 2024-03-03
### Fixed
- Removed constant window reloading that made the extension unusable
- Rulers now update without requiring window reload

## [0.0.4] - 2024-03-03
### Added
- Manual ruler update command for troubleshooting
- Debug logging for better issue tracking
- Extension activation on startup

### Fixed
- Fixed issue with rulers not appearing on initial load
- Improved ruler update reliability
- Added automatic editor refresh after ruler updates

## [0.0.3] - 2024-03-03
### Fixed
- Fixed inconsistent ruler behavior in large files
- Ensured rulers appear at correct intervals for both file types
- Extended ruler coverage up to 160 characters
- Changed from configurable to fixed ruler positions for reliability

## [0.0.2] - 2024-03-03
### Changed
- Removed comment support for both .fem and .rad files
- Simplified language configurations to focus on ruler functionality

## [0.0.1] - 2024-03-03
### Added
- Initial release
- Support for .fem and .rad files
- Customizable rulers for both file types
- Basic language support with bracket matching