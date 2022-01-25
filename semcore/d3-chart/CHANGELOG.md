# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.6.2] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `Tooltip`.

## [1.6.1] - 2021-01-21

### Added

- Added Bubble and Scatter plot charts

### Changed

- Tooltip font size changed

## [1.5.6] - 2021-12-08

### Changed

- Moved chart colors vars to style

## [1.5.5] - 2021-12-06

### Fixed

- Calculate correct border radius for Bar.

## [1.5.4] - 2021-11-24

### Fixed

- Fixed set `scale` for `Area, Line`.

## [1.5.3] - 2021-10-27

### Fixed

- Returned data `(x, y, width, height)` in render function for `Bar, Horizontalbar`.

## [1.5.2] - 2021-10-22

### Fixed

- Fixed field `e.currentTarget` for events in `eventEmitter`.

## [1.5.1] - 2021-10-19

### Fixed

- Fixed hide tooltip.

## [1.5.0] - 2021-10-15

### Added

- Added prop `outerRadius` for `Donut` chart.

### Changed

- Fixed call animation for hover in sector `Donut` chart.
- Fixed animation show `Dot` in `Line` chart.

## [1.4.1] - 2021-10-13

### Fixed

- Fixed react key-related warning for `Bar`.

## [1.4.0] - 2021-10-12

### Added

- Added new event `onMouseMoveChart, onMouseLeaveChart` for eventEmitter.

### Fixed

- Fixed show/hide components `Hover, Dots`.

## [1.3.1] - 2021-10-06

### Fixed

- Fixed dependencies in package.json.

## [1.3.0] - 2021-09-30

### Added

- Added radius of curvature for `Bar, HorizontalBar`.
- Added dynamic position tooltip for `HoverRect, HoverLine`.
- Added hover for `Donut.Pie`.

## [1.2.0] - 2021-09-24

### Added

- The ability to pass "undefined" to skip some of the data.

## [1.1.0] - 2021-09-14

### Added

- Display 1% of the sector as the minimum value for Donut chart

## [1.0.0] - 2021-09-08

### Added

- Added animation for all charts.

## [1.0.0-15] - 2021-08-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.0.0-14] - 2021-08-02

### Fixed

- [ts] correct types.

## [1.0.0-13] - 2021-06-18

### BREAK

- Revert area for stack area chart.
- Change data for Venn chart.

### Changed

- Add default ticks for Axis.

## [1.0.0-12] - 2021-06-02

### Added

- Added Venn chart.

## [1.0.0-11] - 2021-05-12

### Fixed

- Fix TS type

## [1.0.0-9] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.0.0-8] - 2021-04-20

### Fixed

- Fixed version dependency for package `@semcore/popper`.

## [1.0.0-7] - 2021-04-15

### Fixed

- Fixed Plot naming.

## [1.0.0-6] - 2021-04-15

### Added

- Added Donut and Semi-donut charts.

## [1.0.0-5] - 2021-03-31

### Fixed

- [TS] Fixed types for `Line` and `Area`.

## [1.0.0-4] - 2021-03-30

### Added

- Added Area and Stacked Area charts.

## [1.0.0-3] - 2021-03-29

### Added

- [TS] Added types for `Bar.Background, HorizontalBar.Background`.

## [1.0.0-2] - 2021-03-18

### Fixed

- Fixed calculate coordinates for `Hover` and `Tooltip` components.

## [1.0.0-1] - 2021-03-10

### Added

- Added support property `tag` for all components.

### Fixed

- Fixed hover for `svg` element inside `XYPlot`.

## [1.0.0-0] - 2021-02-11

### Added

- Initial release.
