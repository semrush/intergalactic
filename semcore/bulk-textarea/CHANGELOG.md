# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.1.0] - 2026-05-12

### Added

- New brand theme.

## [17.0.2] - 2026-04-30

### Fixed

- Vulnerabilities were discovered in the `dompurify` version.

## [17.0.1] - 2026-04-16

### Fixed

- Build processing to correct extract styles.

## [17.0.0] - 2026-04-15

### BREAK

- New major version.

### Fixed

- Fixed types for `Bulktextarea.InputField`.

## [16.7.0] - 2026-04-01

### Added

- Added `autoFocus` prop for `BulkTextarea.InputField`

## [16.6.2] - 2025-11-17

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [16.0.11 ~> 16.0.12], `@semcore/icon` [16.7.2 ~> 16.7.3]).

## [16.6.1] - 2025-10-29

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [16.5.1 ~> 16.7.2], `@semcore/tooltip` [16.0.10 ~> 16.0.11], `@semcore/base-components` [16.4.0 ~> 16.4.1]).

## [16.6.0] - 2025-10-03

### Changed

- Styles for `:focus`.

## [16.5.1] - 2025-09-17

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [16.0.8 ~> 16.0.9], `@semcore/base-components` [16.2.2 ~> 16.2.3]).

## [16.5.0] - 2025-09-05

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.6.0 ~> 16.7.0], `@semcore/base-components` [16.2.1 ~> 16.2.2]).

## [16.4.0] - 2025-08-29

### Added

- Controlled mode for errors.
- `onImmediatelyChange` internal property.

### Fixed

- Incorrect paddings for line numbers starting from 1000 lines.

## [16.3.1] - 2025-08-29

### Changed

- Type description for `BulkTextareaProps`.

## [16.3.0] - 2025-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/typography` [16.1.5 ~> 16.2.0], `@semcore/icon` [16.4.0 ~> 16.5.0], `@semcore/base-components` [16.1.2 ~> 16.2.0]).

## [16.2.4] - 2025-07-10

### Fixed

- Missing type names for `InputFieldProps` on API page for Bulk Textarea due to ESLint fixes.

## [16.2.3] - 2025-07-04

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [16.2.2 ~> 16.2.3], `@semcore/tooltip` [16.0.3 ~> 16.0.4], `@semcore/base-components` [16.1.0 ~> 16.1.1]).

## [16.2.2] - 2025-06-23

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.2 ~> 16.1.0]).

## [16.2.1] - 2025-06-16

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.1 ~> 16.0.2]).

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
