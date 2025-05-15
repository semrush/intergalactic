# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.10.0] - 2025-05-07

### Changed

- "Magic comments" placements for work with esm-builds by vite.

## [1.9.3] - 2024-02-01

### Fixed

- Supported latest changes in `core` and `utils` packages.

## [1.9.2] - 2024-02-01

### Changed

- version of `postcss`.

## [1.9.1] - 2023-12-05

### Fixed

- Build with `--modules=cjs` flag.

## [1.9.0] - 2023-02-15

### Changed

- Removed `postcss-combine-duplicated-selectors` as far as it was breaking CSS injection processing.
- Removed `cssnano` due to [poor support of CSS rules merging](https://github.com/cssnano/cssnano/issues/805).
- Added `csso` as a main CSS optimization package.

## [1.8.1] - 2023-01-27

### Fixed

- Fixed variable transformation error when using the special name `--intergalactic-*`.

## [1.8.0] - 2023-01-26

### Added

- Added `postcss-combine-duplicated-selectors` package to optimize CSS files.

## [1.7.0] - 2023-01-20

### Changed

- Put all CSS `:hover` selectors into `@media(hover: hover)` block.

## [1.6.0] - 2022-09-31

### Added

- Added support of `--intergalactic-*` CSS variables.

## [1.5.0] - 2022-09-31

### Changed

- Enable cssnano by default.

## [1.4.1] - 2022-09-23

### Fixed

- Fixed the problem of not initializing styles without using them.

## [1.4.0] - 2022-09-13

### Changed

- Update 'postcss-import-sync2' dependency version.

## [1.3.0] - 2022-07-13

### Changed

- Container reshadow hash and class hash are now the same.

## [1.2.1] - 2022-03-14

### Fixed

- Fixed old node versions support.

## [1.2.0] - 2022-03-11

### Added

- Added export function `postcss` from main js file `@semcore/babel-plugin-styles`.
- Added `PLACEHOLDER_REPLACER` property for function `postcss`.

## [1.1.3] - 2022-02-17

### Fixed

- Fixed recursive CSS variables resolving

## [1.1.2] - 2022-02-16

### Fixed

- Disabled unsafe minification rules

## [1.1.1] - 2022-02-03

### Fixed

- Supported nested CSS variables in CSS variables fallback

## [1.1.0] - 2022-01-10

### Added

- Added ability to process `:global` selectors.

## [1.0.4] - 2021-04-30

### Fixed

- Fixed incorrect handling of reshadow-specific classes

## [1.0.3] - 2021-04-30

### Fixed

- Fixed parsed data attribute
- Remove bin field for package.json

## [1.0.1] - 2021-04-26

### Added

- Initial release
