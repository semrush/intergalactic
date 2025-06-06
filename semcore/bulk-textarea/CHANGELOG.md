# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.2.0] - 2025-05-30

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.1.0 ~> 16.2.0], `@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.1.0] - 2025-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.0.0 ~> 16.1.0]).

## [16.0.0] - 2025-05-19

### Added

- Major version.

## [1.4.2] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5]).

## [1.4.1] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/icon` [4.61.0 ~> 4.62.0]).

## [1.4.0] - 2025-04-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.60.2 ~> 4.61.0]).

## [1.3.0] - 2025-04-01

### Added

- New type for value/onChange. It could be `string` or `string[]`, depends on type of `value` property. `string` by default.

### Fixed

- Error if after processing the inserted value it will be empty array.
- Error with empty `utf` characters in `onChange` / `lineProcessing`.
- Cursor position after focusing a non-empty field.
- Blinking previous error after clicking on another line with error.

## [1.2.0] - 2025-03-28

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.42.1 ~> 5.43.0]).

## [1.1.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/icon` [4.60.0 ~> 4.60.1]).

## [1.1.0] - 2025-03-14

### Added

- Build for ESM.

## [1.0.6] - 2025-03-06

### Fixed

- Tooltip issues when using bulk-textarea without common error message.

## [1.0.5] - 2025-03-03

### Added

- White background for both light and dark themes.

## [1.0.4] - 2025-02-07

### Fixed

- Incorrect filename for module entry point.

## [1.0.3] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/flex-box` [5.40.0 ~> 5.40.1]).

## [1.0.2] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.41.0 ~> 5.41.1], `@semcore/icon` [4.56.0 ~> 4.57.0]).

## [1.0.1] - 2025-02-03

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.44.1 ~> 4.45.0], `@semcore/counter` [3.37.1 ~> 3.37.2], `@semcore/popper` [5.45.1 ~> 5.45.2]).

## [1.0.0] - 2024-12-12

### Added

- New BulkTextArea component.
