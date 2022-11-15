# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.5.2] - 2022-11-11

### Fixed

- Allowed to pass any svg attributes.

## [2.5.1] - 2022-11-11

### Fixed

- Fixed `Bar` click handler typings.

## [2.5.0] - 2022-11-10

### Fixed

- Fixed support handling of bars event handling with `paddingOuter`.

### Added

- `Bar` component now supports `onClick` handler with bar data in callback.

## [2.4.10] - 2022-11-03

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.13.3 ~> 4.13.4]).

## [2.4.9] - 2022-11-03

### Fixed

- Fixed hover and active animated for `Donut` chart.

## [2.4.8] - 2022-11-02

### Fixed

- Fixed display of minimum bar size in `StackBar`.

### Added

- Added display of minimum bar size in `HorizontalBar`.

## [2.4.7] - 2022-11-01

### Fixed

- Fixed inner radius for `Donut` chart. It began to equal what is indicated in the `innerRadius` prop.

## [2.4.6] - 2022-10-31

### Fixed

- Fixed reference lines were missing dashed style.

## [2.4.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.7.0 ~> 1.7.1], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [2.4.3] - 2022-10-20

### Fixed

- Fixed typings of render functions.

## [2.4.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.6.1 ~> 1.6.2], `@semcore/utils` [3.39.0 ~> 3.39.1]).

## [2.4.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.3.8] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.31 ~> 4.12.0]).

## [2.3.7] - 2022-10-05

### Fixed

- Ensured a11y module do not break mouse interactions.

## [2.3.6] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.10 ~> 1.5.11], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [2.3.5] - 2022-09-23

### Fixed

- Fixed issue with uninitialized styles in some charts.

## [2.3.4] - 2022-09-21

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.29 ~> 4.11.30]).

## [2.3.3] - 2022-09-13

### Fixed

- Changed paths in css files to relative.

## [2.3.2] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.9 ~> 1.5.10], `@semcore/utils` [3.37.0 ~> 3.37.1]).

## [2.3.0] - 2022-08-22

### Added

- Introduced charts accessibility module.

## [2.2.7] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.7 ~> 1.5.8], `@semcore/utils` [3.36.0 ~> 3.37.0]).

## [2.2.5] - 2022-08-04

### Fixed

- Fixed `ResponsiveContainer` memory leak on unmount.

## [2.2.4] - 2022-08-02

### Fixed

- `Venn` chart was not mentioned in exported types.

## [2.2.3] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.4 ~> 1.5.5], `@semcore/utils` [3.34.0 ~> 3.35.0]).

## [2.2.2] - 2022-07-20

### Fixed

- Fixed ability to change `tag` in render(prop) functions.
- Fixed `RadialTree` typings.
- Fixed `RadialTree` rendering in Safari.
- Fixed `RadialTree` radian labels rendering.

## [2.2.1] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.3 ~> 1.5.4], `@semcore/utils` [3.33.0 ~> 3.34.0]).

## [2.2.0] - 2022-06-30

### Added

- Added index to Bubble chart
- Added property minimal height `hMin` for Bar (`<Bar hMin={...}/>`)
- Added property `active` for `Donut.Pie`

### Fixed

- Exclude props from html for `Tooltip.Dot`
- Recalculate position for `Dot` after update scale
- Optimization render `Dot`

## [2.1.0] - 2022-06-01

### Changed

- Changed type names from 'ITooltipProps' to 'ITooltipChartProps' so that there are no intersections with other components.
- Changed type names from 'ITooltipContext' to 'ITooltipChartContext' so that there are no intersections with other components.

## [2.0.10] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.1 ~> 1.5.2], `@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/button` [4.0.4 ~> 4.0.5], `@semcore/checkbox` [6.0.3 ~> 6.0.4]).

## [2.0.7] - 2022-05-25

### Fixed

- Fixed position title for axis.

## [2.0.6] - 2022-05-23

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.25.1 ~> 2.26.0]).

## [2.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [1.9.0] - 2022-04-14

### Added

- Added `<RadialTree />` chart.

## [1.8.0] - 2022-04-11

### Fixed

- Fixed left and right `<Axis.Title />` unexpected horizontal transition based on title characters count.

## [1.7.1] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

## [1.7.0] - 2022-03-28

### Fixed

- Left and bottom plot titles now do not overlap axis ticks.

## [1.6.9] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/animation` [1.4.1 ~> 1.4.2]).

## [1.6.8] - 2022-03-10

### Fixed

- Fixed figure cut on right or bottom edges when left or top margin is positive.

## [1.6.7] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [1.6.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.6.4] - 2022-02-10

### Fixed

- Fixed animation display when resizing.

## [1.6.3] - 2022-01-26

### Changed

- Revert function `findComponent` for check children in `Tooltip`, because it's valid for children `() => ({})`.

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
