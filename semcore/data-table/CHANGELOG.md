# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.5.2] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.2.0 ~> 3.3.0]).

## [3.5.1] - 2022-11-08

## [3.5.0] - 2022-11-01

### Added

- Support for inheritance of `alignItems` prop from header to cells.

## [3.4.1] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.1.1 ~> 3.1.2], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [3.4.0] - 2022-10-25

### Added

- Added `disabledScroll` property that disables scrolling in tables.
- Added the ability(`flex="inherit"`) to inherit the size from the top table.

## [3.3.4] - 2022-10-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.1.0 ~> 3.1.1]).

## [3.3.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.2.0] - 2022-10-07

### Added

- Added support `ref` for `DataTable.Column` and `DataTable.Cell`.

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [3.1.9] - 2022-09-13

### Changed

- Improved component accessibility in cases of virtual scroll and columns sorting.

## [3.1.8] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [3.1.0] - 2022-07-18

### Changed

- Add `onScroll` callback for `<Body/>`.

## [3.0.10] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.27.0 ~> 2.28.0], `@semcore/utils` [3.33.0 ~> 3.34.0]).

## [3.0.9] - 2022-07-04

### Fixed

- Fixed scrolling of table when enable virtual scrolling.

## [3.0.8] - 2022-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/progress-bar` [3.0.3 ~> 3.0.4]).

## [3.0.1] - 2022-05-17

### Fixed

- Fixed collapsing of header grouped cells.

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.2.9] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/skeleton` [3.2.1 ~> 3.3.0]).

## [2.2.6] - 2022-04-27

### Fixed

- Fixed columns width was usually not controlled by `w`, `wMin` and `wMax` props

## [2.2.5] - 2022-04-26

### Fixed

- Fixed package lost typings.

## [2.2.4] - 2022-04-25

### Changed

- Fixed grouped rows hover highlight.

## [2.2.3] - 2022-04-25

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [3.7.0 ~> 3.7.1]).

## [2.2.0] - 2022-04-14

### Added

- Virtual scroll support.

## [2.1.0] - 2022-04-07

### Changed

- Internal enhances, rewritten from js to ts, render algorithmic performance increased.

## [2.0.0] - 2022-04-06

### Fixed

- Fixed uninitialized columns width from fixed size to equal flex-boxes.

## [1.5.4] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

## [1.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.5.1] - 2022-02-04

### Changed

- Changed background-color from `transparent` to `#fff` for `use="secondary"` `DataTable.Column` and `DataTable.Cell`.

## [1.5.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [1.4.6] - 2021-09-10

### Changed

- Fixed position table for fixed columns.
- Added support property `onResize` for `DataTable.Body`.

## [1.4.5] - 2021-08-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.4.4] - 2021-06-25

### Added

- [A11y] Added support keyboard for sortable column.

## [1.4.2] - 2021-03-17

### Fixed

- Fixed automatic set property `flexBasis` for `DataTable.Column`.

## [1.4.1] - 2021-02-02

### Fixed

- Removed calculation min width head and body because this is caused bugs.

## [1.4.0] - 2021-01-19

### Added

- Added `style` folder with css in build folder `lib`.

## [1.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.2.1] - 2020-12-14

### Fixed

- Fixed `css` styles for DataTable include class name `use`.

## [1.2.0] - 2020-12-09

### Added

- Added `secondary` theme for `DataTable`. Example `<DataTable use='secondary'/>`.

## [1.1.0] - 2020-12-03

### Changed

- Added warning for deprecated prop 'sticky'.

### Fixed

- Replace special characters in column names because they apply as css variables.

## [1.0.0] - 2020-11-20

### Changed

- Replaced `title` prop with children parse for group column.

## [0.0.1-6] - 2020-11-03

### Fixed

- Set size width column in css variable `Table`

## [0.0.1-5] - 2020-10-30

### Added

- Set min-width for `Head and Body`, which calculate from width `Cell`

## [0.0.1-4] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [0.0.1-3] - 2020-10-09

### Changed

- Changed type for prop `sort`.

## [0.0.1-2] - 2020-10-08

### Added

- Add prop `active` for `Row`.

## [0.0.1-0] - 2020-09-11

### Added

- Initial release
