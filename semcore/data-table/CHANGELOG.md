# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.0.2] - 2025-05-30

### Fixed

- Animation for accordions in table.

## [16.0.1] - 2025-05-21

### Fixed

- Property `sideIndents`.
- Calculation of sorted columns width on the first render.

### Added

- Support for using `Accordion` on merged rows.

## [16.0.0] - 2025-05-19

### Break

- Major version.

## [4.50.2] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5], `@semcore/core` [2.39.3 ~> 2.39.4]).

## [4.50.1] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.61.0 ~> 4.62.0], `@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/core` [2.39.2 ~> 2.39.3]).

## [4.50.0] - 2025-04-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.60.2 ~> 4.61.0]).

## [4.49.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2], `@semcore/core` [2.39.1 ~> 2.39.2]).

## [4.49.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.60.0 ~> 4.60.1], `@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/core` [2.39.0 ~> 2.39.1]).

## [4.49.0] - 2025-03-14

### Added

- Build for ESM.

## [4.48.1] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/core` [2.38.0 ~> 2.38.1]).

## [4.48.0] - 2025-02-05

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.56.0 ~> 4.57.0]).

## [4.47.9] - 2025-01-27

### Fixed

- Handle table cell focus for any interactions. Now works only for keyboard.

## [4.47.8] - 2025-01-10

### Fixed

- Incorrect calculation sizes for fixed (in right place) columns.

## [4.47.7] - 2024-12-25

### Fixed

- Table remained inert after clicking on sort icon.

## [4.47.6] - 2024-12-24

### Fixed

- Keyboard navigation on table with virtual scroll.

## [4.47.5] - 2024-12-16

### Fixed

- `aria-colindex` was set for each Head.Cell components, even for a group.

### Changed

- Hide scrollbars from Screen Readers in Table.Head and Table.Body.

## [4.47.4] - 2024-11-26

### Fixed

- Keyboard access after changing data in the Table (only if focus outside a Table).

## [4.47.3] - 2024-11-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.2 ~> 4.43.3], `@semcore/core` [2.36.1 ~> 2.36.2]).

## [4.47.2] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.0 ~> 4.43.2], `@semcore/core` [2.36.0 ~> 2.36.1]).

## [4.47.1] - 2024-11-01

### Fixed

- Unexpected focusing on the first element of table after first clicking on some interactive element inside it.

## [4.47.0] - 2024-10-28

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/core` [2.34.0 ~> 2.35.0]).

## [4.46.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.48.0 ~> 4.50.0], `@semcore/utils` [4.39.0 ~> 4.41.0], `@semcore/core` [2.33.0 ~> 2.34.0]).

## [4.45.0] - 2024-10-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.47.0 ~> 4.48.0], `@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/core` [2.32.0 ~> 2.33.0]).

## [4.44.2] - 2024-10-04

### Fixed

- Preventing defaults and propagation for pressing Enter on TableCell with focusable elements.

## [4.44.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.45.0 ~> 4.46.0], `@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/core` [2.31.0 ~> 2.31.1]).

## [4.44.0] - 2024-09-20

### Added

- Keyboard navigation.

## [4.43.0] - 2024-09-04

### Added

- Properties to enable changing size of sortable columns (by default, `false`). `changeSortSize` for columns that could be can be increased for the sort icon and `sortSizeRecalculation` for column due to which there may be an increase. By default, for sortSizeRecalculation used column with maximum width.

## [4.42.0] - 2024-08-23

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.43.2 ~> 4.44.0]).

## [4.41.4] - 2024-08-16

### Fixed

- Sort icon behavior.

## [4.41.3] - 2024-08-16

### Fixed

- Columns width (min-width) calculation.

## [4.41.2] - 2024-08-05

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [5.34.1 ~> 5.35.0], `@semcore/utils` [4.32.1 ~> 4.32.2], `@semcore/core` [2.29.1 ~> 2.29.2]).

## [4.41.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.0 ~> 4.32.1], `@semcore/core` [2.29.0 ~> 2.29.1]).

## [4.41.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/scroll-area` [5.33.1 ~> 5.34.0], `@semcore/utils` [4.31.0 ~> 4.32.0], `@semcore/core` [2.28.0 ~> 2.29.0]).

## [4.40.10] - 2024-07-19

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [5.33.0 ~> 5.33.1]).

## [4.40.9] - 2024-07-15

### Fixed

- View of ScrollArea shadows in table body.

## [4.40.8] - 2024-07-12

### Fixed

- View of Bottom horizontal scroll in table body.

## [4.40.7] - 2024-07-03

### Fixed

- `SortIcon` usage - removed unused prop `active`.

## [4.40.6] - 2024-07-02

### Added

- Types for `scrollContainerRef` in `Datatable.Body`.

## [4.40.5] - 2024-06-25

### Added

- `catch` for errors in animation promises in headers.

## [4.40.4] - 2024-06-14

### Added

- Possibility to pass `scrollContainerRef` property to `Datatable.Body` and set it to a real table body container - `Scroll.Containter`.

## [4.40.3] - 2024-06-13

### Fixed

- Incorrect display of `ScrollArea.Bar` after reducing the parent size.

## [4.40.2] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.36.1 ~> 4.37.0], `@semcore/utils` [4.28.1 ~> 4.28.2], `@semcore/core` [2.25.1 ~> 2.25.2]).

## [4.40.1] - 2024-06-10

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [5.30.0 ~> 5.30.1]).

## [4.40.0] - 2024-06-07

### Changed

- Version minor update due to children dependencies update (`@semcore/scroll-area` [5.29.1 ~> 5.30.0]).

## [4.39.1] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.0 ~> 4.28.1], `@semcore/core` [2.25.0 ~> 2.25.1]).

## [4.39.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.27.0 ~> 4.28.0], `@semcore/core` [2.24.0 ~> 2.25.0]).

## [4.38.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.26.2 ~> 4.27.0], `@semcore/core` [2.23.1 ~> 2.24.0]).

## [4.37.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2], `@semcore/core` [2.23.0 ~> 2.23.1]).

## [4.37.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1], `@semcore/core` [2.22.0 ~> 2.23.0]).

## [4.36.0] - 2024-05-16

### Changed

- If sorted column is too narrow to fit sorting item, the column slightly increases it's width.

## [4.34.3] - 2024-04-22

### Fixed

- Warning in console about invalid value of `tabIndex` attribute.

## [4.34.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.1 ~> 4.23.2], `@semcore/core` [2.20.1 ~> 2.20.2]).

## [4.34.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.0 ~> 4.23.1], `@semcore/core` [2.20.0 ~> 2.20.1]).

## [4.34.0] - 2024-04-09

### Changed

- Table body focus ring top border got little offset to prevent overlapping with fixed (sticky) header.

## [4.33.4] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2], `@semcore/core` [2.19.1 ~> 2.19.2]).

## [4.33.3] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.0 ~> 4.22.1], `@semcore/core` [2.19.0 ~> 2.19.1]).

## [4.33.2] - 2024-03-28

### Fixed

- Displaying elements with `position=relative` in table with fixed columns.

## [4.33.1] - 2024-03-28

### Fixed

- Made Table.Header unfocusable.

## [4.33.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0], `@semcore/core` [2.18.1 ~> 2.19.0]).

## [4.32.1] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.21.0 ~> 4.21.1], `@semcore/core` [2.18.0 ~> 2.18.1]).

## [4.32.0] - 2024-03-22

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.28.0 ~> 4.29.0]).

## [4.31.0] - 2024-03-19

### Fixed

- `data-table` layout shift on the first render

### Changed

- Keyboard navigation in table with fixed columns.

## [4.30.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.27.1 ~> 4.28.0], `@semcore/utils` [4.20.5 ~> 4.21.0], `@semcore/core` [2.17.5 ~> 2.18.0]).

## [4.29.0] - 2024-03-12

### Added

- `withScrollBar` prop to enable scrolling in `DataTable.Head`.
- `renderRows` prop to `DataTable.Body` for low level control over rows rendering. Especially it allows to use custom virtual rendering.

## [4.28.4] - 2024-03-11

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [5.20.8 ~> 5.20.9]).

## [4.28.3] - 2024-03-07

### Changed

- Don't focus hidden DataTable.Head.

## [4.28.2] - 2024-03-07

### Changed

- Version prepatch update due to children dependencies update (`@semcore/scroll-area` [5.20.6 ~> 5.20.7]).

## [4.28.1] - 2024-03-05

### Changed

- Use `event.key` instead of `event.code`.

## [4.28.0] - 2024-02-29

### Added

- `disablePortal` prop to `Table.StickyHead`.

### Changed

- Sortable focused headers cell now shows sorting icon.

## [4.27.3] - 2024-02-27

### Fixed

- Calculation of column widths to properly render Skeleton after the first paint.

## [4.27.2] - 2024-02-23

### Fixed

- Virtual scroll in table - setup row size observer in `requestAnimationFrame`.

## [4.27.1] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3], `@semcore/core` [2.17.2 ~> 2.17.3]).

## [4.27.0] - 2024-02-13

### Changed

- Header sorting cells are clickable by `Space` now (along with `Enter` as before).

## [4.26.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.24.1 ~> 4.25.0], `@semcore/utils` [4.20.1 ~> 4.20.2], `@semcore/core` [2.17.1 ~> 2.17.2]).

## [4.26.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.18.0 ~> 5.19.0], `@semcore/utils` [4.20.0 ~> 4.20.1], `@semcore/core` [2.17.0 ~> 2.17.1]).

## [4.26.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0], `@semcore/core` [2.16.1 ~> 2.17.0]).

## [4.25.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1], `@semcore/core` [2.16.0 ~> 2.16.1]).

## [4.25.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0], `@semcore/core` [2.15.0 ~> 2.16.0]).

## [4.24.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0], `@semcore/core` [2.14.0 ~> 2.15.0]).

## [4.23.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.13.1 ~> 2.14.0]).

## [4.22.0] - 2024-01-15

### Added

- Sort icon animation back.

## [4.21.2] - 2024-01-15

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.20.1 ~> 4.20.2]).

## [4.21.1] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.16.0 ~> 4.16.2], `@semcore/core` [2.13.0 ~> 2.13.1]).

## [4.21.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [4.20.1] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [4.20.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.11.0 ~> 2.12.0]).

## [4.19.1] - 2023-11-30

### Fixed

- Lighthouse accessibility warning about existing scrollbar role element inside of the table.

## [4.19.0] - 2023-11-30

### Added

- Sort icon is visible when column is focused by keyboard.

## [4.18.0] - 2023-11-24

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.10.3 ~> 4.13.0], `@semcore/core` [2.9.2 ~> 2.10.0]).

## [4.17.2] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3], `@semcore/core` [2.9.1 ~> 2.9.2]).

## [4.17.1-prerelease.10] - 2023-11-20

### Changed

- Removed animation from sort icon.

## [4.17.0] - 2023-11-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.15.0 ~> 4.16.0]).

## [4.16.2] - 2023-11-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.14.1 ~> 4.15.0], `@semcore/scroll-area` [5.12.1 ~> 5.12.2]).

## [4.16.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2], `@semcore/core` [2.9.0 ~> 2.9.1]).

## [4.16.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.13.0 ~> 4.14.0], `@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [4.15.0] - 2023-10-27

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.12.0 ~> 4.13.0], `@semcore/utils` [4.8.4 ~> 4.9.0], `@semcore/core` [2.7.7 ~> 2.8.0]).

## [4.14.1] - 2023-10-27

### Changed

- Value for `--intergalactic-icon-secondary-neutral-hover-active` token.

## [4.14.0] - 2023-10-26

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.11.2 ~> 4.12.0]).

## [4.13.2] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.3 ~> 4.8.4], `@semcore/core` [2.7.6 ~> 2.7.7]).

## [4.13.1] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.2 ~> 4.8.3], `@semcore/core` [2.7.5 ~> 2.7.6]).

## [4.13.0] - 2023-10-10

### Changed

- Version preminor update due to children dependencies update (`@semcore/flex-box` [5.7.5 ~> 5.8.0]).

## [4.12.3] - 2023-10-03

### Fixed

- Table with columns with fixed position was not displayed correctly.

## [4.12.2] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1], `@semcore/core` [2.7.3 ~> 2.7.4]).

## [4.12.1] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.9.2 ~> 4.10.0], `@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [4.12.0] - 2023-09-21

### Added

- `font-variant-numeric` for table cells

## [4.11.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.7.1 ~> 2.7.2]).

## [4.11.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1], `@semcore/core` [2.7.0 ~> 2.7.1]).

## [4.11.0] - 2023-09-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.8.3 ~> 4.9.0]).

## [4.10.4] - 2023-09-13

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.8.2 ~> 4.8.3], `@semcore/utils` [4.6.3 ~> 4.7.0], `@semcore/core` [2.6.3 ~> 2.7.0]).

## [4.10.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.2 ~> 2.6.3]).

## [4.10.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2], `@semcore/core` [2.6.1 ~> 2.6.2]).

## [4.10.1] - 2023-09-08

### Fixed

- Fixed initial columns rendering width when `wMax` or `wMin` props provided.

## [4.10.0] - 2023-09-05

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.7.1 ~> 4.8.0]).

## [4.9.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.0 ~> 2.6.1]).

## [4.9.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.5.0 ~> 2.6.0]).

## [4.8.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [4.7.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [4.7.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/scroll-area` [5.5.0 ~> 5.6.0]).

## [4.6.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.4.1 ~> 4.5.0], `@semcore/utils` [4.3.1 ~> 4.4.0], `@semcore/core` [2.3.1 ~> 2.4.0]).

## [4.5.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [4.5.0] - 2023-08-18

### Added

- `data` prop for `DataTable.Cell` and `DataTable.Row` that allows more convenient typings than `DataTable.Cell<typeof data>`.

### Fixed

- Collapsing of table included in row of other table.

## [4.4.0] - 2023-08-17

### Changed

- Version preminor update due to children dependencies update (`@semcore/scroll-area` [5.2.1 ~> 5.3.0]).

## [4.3.1] - 2023-08-14

### Changed

- Version minor update due to children dependencies update (`@semcore/core` [2.2.0 ~> 2.2.1]).

## [4.3.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [4.2.1] - 2023-08-01

### Fixed

- Using special characters and spaces in the data keys were braking columns width.

## [4.2.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0], `@semcore/icon` [4.1.0 ~> 4.2.0]).

## [4.1.0] - 2023-07-27

### Changed

- Use `event.key` instead of `event.code` for better support of non QWERTY keyboard layouts.

## [4.0.2] - 2023-07-18

### Fixed

- Fixed `disabledScroll` visual behavior.

## [4.0.1] - 2023-07-18

### Fixed

- Removed ResizeObserver initiating during SSR.

## [4.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

### Changed

- Version major update due to children dependencies update (`@semcore/icon` [4.0.0 ~> 4.0.0]).

## [3.11.1] - 2023-06-30

## [3.11.0] - 2023-06-29

### Added

- Added background for active state for `Row`.

## [3.10.3] - 2023-06-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.15.3 ~> 3.16.0]).

## [3.10.2] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [3.10.1] - 2023-06-16

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [4.3.13 ~> 4.4.0]).

## [3.10.0] - 2023-06-15

### Changed

- Moved `role="rowgroup"` on focusable scroll areas to match automatic A11Y checks.

## [3.9.7] - 2023-06-14

### Fixed

- Grouped rows aria roles.

## [3.9.6] - 2023-06-13

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [4.3.10 ~> 4.3.11]).

## [3.9.5] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [3.9.4] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.14.16 ~> 3.15.0], `@semcore/utils` [3.53.1 ~> 3.53.2]).

## [3.9.3] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [4.3.7 ~> 4.3.8], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [3.9.2] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [3.9.1] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [3.9.0] - 2023-05-25

### Changed

- Improved `DataTable` typings, now props `sort`, `onSortChange`, `uniqueKey` types are automatically infered from `data` prop and children rendering row data might be better typed like `<DataTable.Cell<{}, typeof data> name="keyword">`.

## [3.8.9] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [3.8.8] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [3.8.7] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [3.8.4] - 2023-04-28

### Fixed

- Semantically connected cells with corresponding headers.
- Added `scope` for table header.

## [3.8.3] - 2023-04-25

### Fixed

- Fixed missing `key` warning.

## [3.8.1] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [3.8.0] - 2023-03-31

### Changed

- Changed the presentation of the sort icon. Now it always runs into the text.

## [3.7.29] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0]).

## [3.7.17] - 2023-02-22

### Fixed

- Fixed empty table body with virtual scroll enabled displays unexpected "0".

## [3.7.15] - 2023-02-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.46.1 ~> 3.47.0]).

## [3.7.13] - 2023-02-13

### Fixed

- Fixed view of cells when using cell grouping and columns at the same time.

## [3.7.9] - 2023-01-20

### Fixed

- Fix floating sort icon to right align.

## [3.7.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.7.0 ~> 3.8.0], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.7.1] - 2022-12-22

### Fixed

- Fix style for `resizable`.

## [3.7.0] - 2022-12-21

### Changed

- Removed vertical borders from header cells.
- Added props `vBorders`, `borderLeft` and `borderRight` to have possibility to render vertical borders.
- Added prop `compact` to reduce table paddings.
- Added gradient to the sorting icon.

## [3.6.3] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1]).

## [3.6.2] - 2022-12-16

### Changed

- Added `react-dom` to peer dependencies.

## [3.6.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.5.1] - 2022-11-08

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

- [A11Y] Added support keyboard for sortable column.

## [1.4.2] - 2021-03-17

### Fixed

- Fixed automatic set property `flexBasis` for `DataTable.Column`.

## [1.4.1] - 2021-02-02

### Fixed

- Removed calculation min width head and body because this is caused bugs.

## [1.4.0] - 2021-01-19

### Added

- Added `style` folder with CSS in build folder `lib`.

## [1.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.2.1] - 2020-12-14

### Fixed

- Fixed `CSS` styles for DataTable include class name `use`.

## [1.2.0] - 2020-12-09

### Added

- Added `secondary` theme for `DataTable`. Example `<DataTable use='secondary'/>`.

## [1.1.0] - 2020-12-03

### Changed

- Added warning for deprecated prop 'sticky'.

### Fixed

- Replace special characters in column names because they apply as CSS variables.

## [1.0.0] - 2020-11-20

### Changed

- Replaced `title` prop with children parse for group column.

## [0.0.1-6] - 2020-11-03

### Fixed

- Set size width column in CSS variable `Table`

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

## [0.0.1-prerelease.10] - 2020-09-11

### Added

- Initial release
