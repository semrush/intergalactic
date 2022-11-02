# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.3.0] - 2022-09-31

### Added

- Added support for npm aliases

## [4.2.4] - 2022-09-23

### Changed

- Version patch update due to children dependencies update (`@semcore/babel-plugin-styles` [1.4.0 ~> 1.4.1]).

## [4.2.3] - 2022-09-13

### Fixed

- Remove unused plugin '@semcore/babel-plugin-shadow'.

## [4.2.2] - 2022-07-14

### Changed

- Version patch update due to children dependencies update (`@semcore/babel-plugin-styles` [1.2.1 ~> 1.3.0]).

## [4.2.0] - 2022-03-11

### Added

- Added export function `getColorVars`.

## [4.1.4] - 2022-02-03

### Fixed

- Updated critical children dependencies

## [4.1.3] - 2022-02-03

### Fixed

- Do not crash in case of variables absence in theme file for backward capability to `4.1.0`.

## [4.1.1] - 2022-01-27

### Fixed

- Supported internal `pkgName` option.

## [4.1.0] - 2021-11-26

### Added

- Added replace variables var.css for support theme.

## [4.0.1] - 2021-04-30

### Fixed

- Fixed error parse structure dir

## [4.0.0] - 2021-04-26

### BREAK

- Remove `media` options.

### Changed

- The style processing system has been changed.

### Added

- Added the ability to version components in themes.

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
