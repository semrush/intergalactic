# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] - 2021-01-28

### BREAK

- Change default scope to `@semcore`.

## [2.2.1] - 2020-12-02

### Fixed

- Fixed same theme hash for different component versions.

## [2.2.0] - 2020-07-30

### Added

- Added `scope` options set name scope npm packages, which need detection
- Added verification value `theme`, when package with global theme missing.

## [2.1.1] - 2020-07-29

### Fixed

- Updated default options for `css-purge` to `{ shorten: false }` to fix incorrect colors interpolation

## [2.1.0] - 2020-06-28

### Added

- Added `purgeCSS` options forwarding
- Added `verbose` flag to reduce spam for local theme
- Added multiple themes support
- Added cache for themes resolving
- Added cache for styles transpile level

### Fixed

- Disabled `purgeCSS`'s breaking `font` optimisations
- Fixed quotes mirroring issue for `purgeCSS` call

## [2.0.0] - 2020-06-09

### Added

- Initial release
