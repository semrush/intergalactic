# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.0.2] - 2025-05-30

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [16.0.0 ~> 16.0.1], `@semcore/checkbox` [16.0.0 ~> 16.0.1], `@semcore/icon` [16.1.0 ~> 16.2.0], `@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.0.1] - 2025-05-23

### Fixed

- Esm-build by vite.

## [16.0.0] - 2025-05-19

### Added

- Major version.

## [3.60.2] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.41.3 ~> 2.41.4], `@semcore/checkbox` [7.44.3 ~> 7.44.4], `@semcore/utils` [4.48.4 ~> 4.48.5], `@semcore/core` [2.39.3 ~> 2.39.4]).

## [3.60.1] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.41.2 ~> 2.41.3], `@semcore/checkbox` [7.44.2 ~> 7.44.3], `@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/icon` [4.61.0 ~> 4.62.0], `@semcore/core` [2.39.2 ~> 2.39.3]).

## [3.60.0] - 2025-04-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.60.2 ~> 4.61.0]).

## [3.59.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.41.1 ~> 2.41.2], `@semcore/checkbox` [7.44.1 ~> 7.44.2], `@semcore/utils` [4.48.1 ~> 4.48.2], `@semcore/core` [2.39.1 ~> 2.39.2]).

## [3.59.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.41.0 ~> 2.41.1], `@semcore/checkbox` [7.44.0 ~> 7.44.1], `@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/icon` [4.60.0 ~> 4.60.1], `@semcore/core` [2.39.0 ~> 2.39.1]).

## [3.59.0] - 2025-03-14

### Added

- Build for ESM.

## [3.58.7] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.40.0 ~> 2.40.1], `@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/core` [2.38.0 ~> 2.38.1]).

## [3.58.6] - 2025-02-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.39.1 ~> 2.40.0], `@semcore/popper` [5.45.1 ~> 5.45.2], `@semcore/utils` [4.44.1 ~> 4.45.0], `@semcore/core` [2.37.1 ~> 2.38.0]).

## [3.58.5] - 2024-12-20

### Added

- `aria-hidden="true"` to `PatternSymbol` inside `LegendItem` to improve A11Y.

## [3.58.4] - 2024-12-19

### Removed

- `aria-labelledby` from `LegendItem` with shapes other, than checkbox.

### Changed

- `aria-labelledby` value in `LegendItem` to unique id.

## [3.58.3] - 2024-12-17

### Fixed

- Animation of points on ScatterPlot was on every render.

### Added

- `outilne=none` for Hover rect and line.

## [3.58.2] - 2024-12-09

### Added

- `aria-*` attributes for svg from parent group for all simple charts (Chart.*).
- `aria-label=Chart` by default for all advanced charts (Plot...).

## [3.58.1] - 2024-12-05

### Added

- `aria-labelledby` for `LegendItem` checkbox.

## [3.58.0] - 2024-12-04

### Added

- New type of charts - `StackGroupBar`.

## [3.57.0] - 2024-11-29

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.38.2 ~> 2.39.0], `@semcore/flex-box` [5.38.2 ~> 5.39.0], `@semcore/utils` [4.43.3 ~> 4.44.0], `@semcore/core` [2.36.2 ~> 2.37.0]).

## [3.56.4] - 2024-11-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.38.1 ~> 2.38.2], `@semcore/popper` [5.44.1 ~> 5.44.2], `@semcore/utils` [4.43.2 ~> 4.43.3], `@semcore/core` [2.36.1 ~> 2.36.2]).

## [3.56.3] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.38.0 ~> 2.38.1], `@semcore/utils` [4.43.0 ~> 4.43.2], `@semcore/core` [2.36.0 ~> 2.36.1]).

## [3.56.2] - 2024-10-30

### Fixed

- Fix unpredictable behavoir of charts with pattern fill, when interacting with chart's legend

## [3.56.1] - 2024-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.36.0 ~> 2.37.0], `@semcore/popper` [5.43.0 ~> 5.43.1], `@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/core` [2.34.0 ~> 2.35.0]).

## [3.56.0] - 2024-10-23

### Added

- Function type for `hideHoverLine` property in the `Hover` component.

## [3.55.2] - 2024-10-15

### Fixed

- Handle onClick on ChartLegend items.
- `onChangeVisibleItem` handler on ChartLegend component.

## [3.55.1] - 2024-10-15

### Fixed

- Keyboard control in NVDA form mode for Legend checkbox items.
- Each checkbox in the Legend rendered as 3 elements for NVDA.

## [3.55.0] - 2024-10-15

### Added

- Required `aria-*` attributes for the Legend.

### Fixed

- Types for enhances.

## [3.54.0] - 2024-10-11

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.34.0 ~> 2.35.0], `@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/core` [2.32.0 ~> 2.33.0]).

## [3.53.0] - 2024-10-04

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.33.1 ~> 2.34.0], `@semcore/utils` [4.36.2 ~> 4.38.0], `@semcore/core` [2.31.1 ~> 2.32.0]).

## [3.52.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.33.0 ~> 2.33.1], `@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/core` [2.31.0 ~> 2.31.1]).

## [3.52.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.32.0 ~> 2.33.0], `@semcore/utils` [4.35.0 ~> 4.36.0], `@semcore/core` [2.30.0 ~> 2.31.0]).

## [3.51.5] - 2024-09-06

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.31.2 ~> 2.32.0], `@semcore/popper` [5.39.4 ~> 5.39.5], `@semcore/utils` [4.32.2 ~> 4.35.0], `@semcore/core` [2.29.2 ~> 2.30.0]).

## [3.51.4] - 2024-08-23

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.39.3 ~> 5.39.4]).

## [3.51.3] - 2024-08-08

### Changed

- Radial tree radian line wasn't applying provided color.
- Venn chart was rendering `0` data with minSize (not it's not rendered at all).

## [3.51.2] - 2024-08-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.31.1 ~> 2.31.2], `@semcore/popper` [5.39.1 ~> 5.39.2], `@semcore/utils` [4.32.1 ~> 4.32.2], `@semcore/core` [2.29.1 ~> 2.29.2]).

## [3.51.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.31.0 ~> 2.31.1], `@semcore/utils` [4.32.0 ~> 4.32.1], `@semcore/core` [2.29.0 ~> 2.29.1]).

## [3.51.0] - 2024-07-22

### Added

- `minRadius` property to Venn.Chart.
- `index` to children render function of `CompactHorizontalBar` subcomponents.
- Gaps between bars in StackBar chart.

## [3.50.0] - 2024-06-28

### Added

- `CompactHorizontalBar` chart.

## [3.49.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.29.0 ~> 2.30.0], `@semcore/utils` [4.30.0 ~> 4.31.0], `@semcore/core` [2.27.0 ~> 2.28.0]).

## [3.48.1] - 2024-07-05

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.37.0 ~> 5.37.1]).

## [3.48.0] - 2024-06-19

### Added

- `onClick` handler for `HoverRect.Tooltip`.
- `onClickHoverRect` and `onClickBar` handlers for `Chart.Bar`.
- `barIndex` and `barKey` values for `onClick` handler for `Bar` and `HorizontalBar`.

## [3.47.1] - 2024-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.36.0 ~> 5.36.1]).

## [3.47.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.27.2 ~> 2.28.0], `@semcore/utils` [4.28.2 ~> 4.29.0], `@semcore/core` [2.25.2 ~> 2.26.0]).

## [3.46.1] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.27.1 ~> 2.27.2], `@semcore/utils` [4.28.1 ~> 4.28.2], `@semcore/core` [2.25.1 ~> 2.25.2]).

## [3.46.0] - 2024-05-29

### Added

- `ReferenceStripes` component.
- `ReferenceBackground` component (previously `ReferenceLine.Background`).

### Changed

- `ReferenceLine.Background` deprecated in favor of `ReferenceBackground`.

## [3.45.2] - 2024-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.4 ~> 5.35.5]).

## [3.45.1] - 2024-05-28

### Fixed

- Donut chart animation glitching on data change.

## [3.45.0] - 2024-05-27

### Changed

- `Line.Area` got an option `autoInterpolate` that allows to disable auto interpolation of all missing values.
- `Line.Area` data now accepts `interpolateValue` symbol that allows spot interpolation of values if `autoInterpolate` set to `false`.

## [3.44.2] - 2024-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.1 ~> 5.35.2]).

## [3.44.1] - 2024-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.0 ~> 5.35.1]).

## [3.44.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.26.0 ~> 2.27.0], `@semcore/utils` [4.27.0 ~> 4.28.0], `@semcore/core` [2.24.0 ~> 2.25.0]).

## [3.43.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.25.1 ~> 2.26.0], `@semcore/utils` [4.26.2 ~> 4.27.0], `@semcore/core` [2.23.1 ~> 2.24.0]).

## [3.42.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.25.0 ~> 2.25.1], `@semcore/utils` [4.26.1 ~> 4.26.2], `@semcore/core` [2.23.0 ~> 2.23.1]).

## [3.42.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.24.0 ~> 2.25.0], `@semcore/utils` [4.25.0 ~> 4.26.1], `@semcore/core` [2.22.0 ~> 2.23.0]).

## [3.41.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.31.0 ~> 5.32.0]).

## [3.40.2] - 2024-05-14

### Fixed

- Exporting from `@semcore/ui` package.

## [3.40.0] - 2024-05-10

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.29.0 ~> 5.30.0]).

## [3.39.1] - 2024-04-26

### Fixed

- `duration` prop on `Chart` component.

## [3.39.0] - 2024-04-16

### Changed

- Plot `eventEmitter` prop now is strongly typed.

### Added

- `PlotEventEmitter` class that allows to create typed event emitter for imperative control over chart tooltip.

## [3.38.2] - 2024-04-16

### Fixed

- stroke color for ReferenceLine from `--intergalactic-chart-grid-x-axis` to `--intergalactic-chart-grid-y-accent-hover-line`.

## [3.38.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.22.0 ~> 2.22.1], `@semcore/popper` [5.27.0 ~> 5.27.1], `@semcore/utils` [4.23.0 ~> 4.23.1], `@semcore/core` [2.20.0 ~> 2.20.1]).

## [3.38.0] - 2024-04-12

### Added

- `Cigarette` chart.

## [3.37.4] - 2024-04-12

### Fixed

- Dot's size for line, aria and bar charts.

## [3.37.3] - 2024-04-12

### Fixed

- background color for Bar chart from `--intergalactic-chart-palette-order-other-data` to `--intergalactic-chart-grid-bar-chart-base-bg`.

## [3.37.2] - 2024-04-12

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.26.2 ~> 5.26.3]).

## [3.37.1] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.21.1 ~> 2.21.2], `@semcore/utils` [4.22.1 ~> 4.22.2], `@semcore/core` [2.19.1 ~> 2.19.2]).

## [3.37.0] - 2024-03-27

### Added

- API to customize A11Y module values and titles formatting, see <https://developer.semrush.com/intergalactic/data-display/d3-chart/d3-chart-code#A11Y-formatting> for details.

## [3.36.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.20.1 ~> 2.21.0], `@semcore/utils` [4.21.1 ~> 4.22.0], `@semcore/core` [2.18.1 ~> 2.19.0]).

## [3.35.3] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [2.20.0 ~> 2.20.1], `@semcore/popper` [5.23.0 ~> 5.24.0], `@semcore/utils` [4.21.0 ~> 4.21.1], `@semcore/core` [2.18.0 ~> 2.18.1]).

## [3.35.2] - 2024-03-21

### Fixed

- Errors in children render functions.

## [3.35.1] - 2024-03-20

### Changed

- `DotCircle` size in Tooltip from 12px to 8px.

## [3.35.0] - 2024-03-19

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.22.0 ~> 5.23.0]).

## [3.34.0] - 2024-03-12

### Changed

- Improved `Chart.Bubble` plot scaling to better fit bubbles and reduce plot empty space.

## [3.33.0] - 2024-03-12

### Added

- Feature to render custom components (in foreignObject) as axis tick value.

## [3.32.0] - 2024-03-07

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.20.5 ~> 5.21.0]).

## [3.31.3] - 2024-03-07

### Changed

- Improve generation A11Y summary for `StackBar`.

## [3.31.2] - 2024-03-07

### Added

- Logic to define X and Y axis for A11Y summary in Bar charts.

## [3.31.1] - 2024-03-05

### Changed

- Use `event.key` instead of `event.code`.

## [3.31.0] - 2024-03-01

### Added

- `Line.Dots` and `Area.Dots` components `display` prop now accepts function that allows developers to granularly control which dots should be displayed.

### Fixed

- A11Y module "Skip to content after plot" link was not working in some cases.

## [3.30.2] - 2024-02-28

### Fixed

- view of Line.Area with `null` in data.

## [3.30.1] - 2024-02-26

### Fixed

- paddings on X axis in Firefox.

## [3.30.0] - 2024-02-16

### Fixed

- A11Y module "Skip to content after plot" link was not working in some cases.

## [3.29.0] - 2024-02-16

### Changed

- Removed wrongly added deprecation messages about `ReferenceLine` `value` props.
- Added `valueEnd` prop to `ReferenceLine.Background` component that allows to specify background width by chart value.

### Fixed

- `patterns` prop was missing in multiple chart types.

## [3.28.0] - 2024-02-13

### Changed

- A11Y module links are clickable by `Space` now (along with `Enter` as before).

## [3.27.3] - 2024-02-13

### Fixed

- `Dots` component was missing `value` prop in it's props mapping function.

## [3.27.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.18.1 ~> 2.18.2], `@semcore/popper` [5.19.1 ~> 5.20.0], `@semcore/utils` [4.20.1 ~> 4.20.2], `@semcore/core` [2.17.1 ~> 2.17.2]).

## [3.27.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.18.0 ~> 2.18.1], `@semcore/flex-box` [5.18.0 ~> 5.19.0], `@semcore/utils` [4.20.0 ~> 4.20.1], `@semcore/core` [2.17.0 ~> 2.17.1]).

## [3.27.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.17.1 ~> 2.18.0], `@semcore/utils` [4.19.1 ~> 4.20.0], `@semcore/core` [2.16.1 ~> 2.17.0]).

## [3.26.1] - 2024-02-01

### Fixed

- view data in BubbleChart.
- prevent animation on every rerender.

## [3.26.0] - 2024-01-25

### Added

- `patterns` API that enhances charts accessibility.

## [3.25.1] - 2024-01-25

### Fixed

- array index out-of-bounds crash and animation glitch at 0 duration.

## [3.25.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.15.0 ~> 2.16.0], `@semcore/utils` [4.17.0 ~> 4.18.0], `@semcore/core` [2.14.0 ~> 2.15.0]).

## [3.24.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.14.1 ~> 2.15.0], `@semcore/core` [2.13.1 ~> 2.14.0]).

## [3.23.1] - 2024-01-16

### Fixed

- Selection of next focusable element after chart plot.

## [3.23.0] - 2024-01-12

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.14.2 ~> 5.15.0]).

## [3.22.3] - 2023-01-11

### Fixed

- Error in ScatterPlot with undefined values.

## [3.22.2] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.14.0 ~> 2.14.1], `@semcore/utils` [4.16.0 ~> 4.16.2], `@semcore/core` [2.13.0 ~> 2.13.1]).

## [3.22.1] - 2024-01-04

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.14.0 ~> 5.14.1]).

## [3.22.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.13.1 ~> 2.14.0], `@semcore/popper` [5.13.0 ~> 5.14.0], `@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [3.21.4-prerelease.10] - 2023-12-20

### Fixed

- Order of chart lines/bars and tooltip HoverLine.

## [3.21.3] - 2023-12-14

### Fixed

- Chart dots were not displaying in Firefox.
- Charts appearing animation in Firefox.

## [3.21.3-prerelease.10] - 2023-12-14

### Fixed

- Chart dots were not displaying in Firefox.
- Charts appearing animation in Firefox.

## [3.21.2] - 2023-12-13

### Fixed

- Squeeze of shapes in `ChartLegendTable`.

## [3.21.1] - 2023-12-12

### Fixed

- `ChartLegendTable` labels trimming with `Ellipsis` component.

## [3.21.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.12.0 ~> 2.13.0], `@semcore/popper` [5.11.0 ~> 5.12.0], `@semcore/core` [2.11.0 ~> 2.12.0]).

## [3.20.1] - 2023-12-06

### Fixed

- base element for `Dots`.

## [3.20.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.11.0 ~> 2.12.0], `@semcore/utils` [4.13.0 ~> 4.14.0], `@semcore/core` [2.10.0 ~> 2.11.0]).

## [3.19.5] - 2023-11-24

### Fixed

- Correct types for `Tooltip`s children render function.

## [3.18.4] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.10.1 ~> 2.10.2], `@semcore/utils` [4.10.2 ~> 4.10.3], `@semcore/core` [2.9.1 ~> 2.9.2]).

## [3.18.3] - 2023-11-13

### Fixed

- Import path in `LegendItem`.

## [3.18.2] - 2023-11-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.9.1 ~> 5.9.2]).

## [3.18.1] - 2023-11-08

### Fixed

- Charts exporting to image.

## [3.18.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.9.0 ~> 2.10.0], `@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [3.17.0] - 2023-10-27

### Added

- `ChartLegend` component.

## [3.16.0] - 2023-10-26

### Added

- Design tokens resolving for `color` props.

### Changed

- Default color of grouped charts (e.g for pie chart) are different by default.
- Default text color is based on inversed and processed background color.

## [3.15.2] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.8.1 ~> 2.8.2], `@semcore/popper` [5.7.7 ~> 5.7.8], `@semcore/utils` [4.8.3 ~> 4.8.4], `@semcore/core` [2.7.6 ~> 2.7.7]).

## [3.15.1] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.8.0 ~> 2.8.1], `@semcore/popper` [5.7.6 ~> 5.7.7], `@semcore/utils` [4.8.2 ~> 4.8.3], `@semcore/core` [2.7.5 ~> 2.7.6]).

## [3.15.0] - 2023-10-11

### Added

- `maxBarSize` prop for `Bars` (Bar, GroupBar, StackBar and horizontals).
- `Line.Area` component.

## [3.14.1] - 2023-10-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.7.5 ~> 2.8.0], `@semcore/flex-box` [5.7.5 ~> 5.8.0], `@semcore/popper` [5.7.5 ~> 5.7.6]).

## [3.14.0] - 2023-10-09

### Added

- `nl` locale support.

## [3.13.4] - 2023-10-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.7.4 ~> 2.7.5], `@semcore/utils` [4.8.1 ~> 4.8.2], `@semcore/core` [2.7.4 ~> 2.7.5]).

## [3.13.3] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.7.3 ~> 2.7.4], `@semcore/utils` [4.8.0 ~> 4.8.1], `@semcore/core` [2.7.3 ~> 2.7.4]).

## [3.13.2] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.7.2 ~> 2.7.3], `@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [3.13.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.7.1 ~> 2.7.2], `@semcore/core` [2.7.1 ~> 2.7.2]).

## [3.13.0] - 2023-09-20

### Added

- `index` to render function context type of `HoverLine` and `HoverRect`.
- `size`, `x` and `y` to render function context type of `XAxis.Ticks` and `YAxis.Ticks`.

## [3.12.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.6.3 ~> 2.7.0], `@semcore/utils` [4.6.3 ~> 4.7.0], `@semcore/core` [2.6.3 ~> 2.7.0]).

## [3.11.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.6.2 ~> 2.6.3], `@semcore/core` [2.6.2 ~> 2.6.3]).

## [3.11.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.6.1 ~> 2.6.2], `@semcore/utils` [4.6.1 ~> 4.6.2], `@semcore/core` [2.6.1 ~> 2.6.2]).

## [3.11.1] - 2023-09-05

### Fixed

- Fixed rendering zero segments pies in React<17.

## [3.11.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.5.0 ~> 2.6.0], `@semcore/core` [2.5.0 ~> 2.6.0]).

## [3.10.0] - 2023-08-28

### Fixed

- Added `exports.types` field to fix types resolving.
- Removed deprecation notes from `ticks` props (it was added by mistake).

### Added

- Added `radius` prop on `Line.Dot` component.

## [3.9.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/animation` [2.4.1 ~> 2.5.0], `@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [3.8.2] - 2023-08-24

### Fixed

- Passing `x` and `y` props to `Donut.Label` component.

## [3.8.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.4.0 ~> 2.4.1], `@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [3.8.0] - 2023-08-23

### Changed

- Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.

## [3.7.0] - 2023-08-17

### Changed

- Donut chart now doesn't render `Donut.Pie` that represent 0 part of circle.

## [3.6.0] - 2023-08-17

### Added

- `paddingAngle` prop for Donut chart.

## [3.5.0] - 2023-08-17

### Added

- Added special `interpolateValue` symbol that allows to interpolate points on line and area charts.

## [3.4.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/animation` [2.2.0 ~> 2.2.1], `@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [3.4.0] - 2023-09-08

### Changed

- Updated d3 dependencies to resolve peerDependencies mismatch.

## [3.3.1] - 2023-08-08

### Changed

- Added `exports` fields for better nextjs support.

## [3.3.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.1.0 ~> 2.2.0], `@semcore/utils` [4.0.0 ~> 4.1.0]).

## [3.2.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/animation` [2.0.0 ~> 2.1.0], `@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [3.1.1] - 2023-07-31

### Fixed

- Donut chart hover animation after chart resizing.

## [3.1.0] - 2023-07-27

### Changed

- Use `event.key` instead of `event.code` for better support of non QWERTY keyboard layouts.

## [3.0.2] - 2023-07-24

### Fixed

- Broken tooltip styles.

## [3.0.1] - 2023-07-18

### Fix

- Removed ResizeObserver initiating during SSR.

## [3.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

### Changed

- Deprecated `import { Tooltip } from '@semcore/ui/d3-chart` in favor of better typed Tooltips.
- On type level made `name` property of `Donut.Pie` obligatory.
- On type level made `name` property of `Venn.Circle` obligatory.

### Added

- Typed `HoverLine.Tooltip`, `HoverRect.Tooltip`, `Radar.Tooltip`, `Bubble.Tooltip`, `Donut.Tooltip`, `ScatterPlot.Tooltip` and `Venn.Tooltip`.

## [2.17.5] - 2023-06-30

## [2.17.4] - 2023-06-27

### Fixed

- Fixed animation on hover when moving mouse quickly on border of `Donut` chart.

## [2.17.3] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.19 ~> 1.10.20], `@semcore/utils` [3.53.4 ~> 3.54.0]).

## [2.17.2] - 2023-06-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.18 ~> 1.10.19], `@semcore/utils` [3.53.3 ~> 3.53.4]).

## [2.17.1] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.18 ~> 1.10.19], `@semcore/utils` [3.53.3 ~> 3.53.4]).

## [2.17.0] - 2023-06-12

### Added

- Swedish (`sv`) locale support.

## [2.16.2] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.17 ~> 1.10.18], `@semcore/utils` [3.53.2 ~> 3.53.3]).

## [2.16.1] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.16 ~> 1.10.17], `@semcore/utils` [3.53.1 ~> 3.53.2]).

## [2.16.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [2.15.5] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.15 ~> 1.10.16], `@semcore/popper` [4.17.17 ~> 4.19.0], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [2.15.4] - 2023-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.14 ~> 1.10.15]).

## [2.15.3] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.13 ~> 1.10.14], `@semcore/utils` [3.52.0 ~> 3.53.0]).

## [2.15.2] - 2023-05-29

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.12 ~> 1.10.13]).

## [2.15.1] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.11 ~> 1.10.12], `@semcore/utils` [3.51.1 ~> 3.52.0]).

## [2.15.0] - 2023-05-24

### Changed

- Improved support of `zh` and `ja` locales in vertical titles.

## [2.14.10] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.9 ~> 1.10.10], `@semcore/utils` [3.50.7 ~> 3.51.0]).

## [2.14.9] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.10 ~> 4.17.11]).

## [2.14.8] - 2023-05-12

### Fixed

- Fixed radial tree icons displaying.

## [2.14.7] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.8 ~> 1.10.9], `@semcore/utils` [3.50.6 ~> 3.50.7]).

## [2.14.6] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.7 ~> 1.10.8], `@semcore/utils` [3.50.5 ~> 3.50.6]).

## [2.14.3] - 2023-05-02

## [2.14.2] - 2023-04-26

### Fixed

- Fixed warnings in development mode.

## [2.14.0] - 2023-04-19

### Added

- Added automatic conversion of react components to text for accessibility titles.

## [2.13.13] - 2023-04-18

### Fixed

- Fixed calculating height of `StackBar` and `HorizontalBar` components.

## [2.13.12] - 2023-04-18

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.10.1 ~> 1.10.2], `@semcore/utils` [3.50.0 ~> 3.50.3]).

## [2.13.8] - 2023-03-31

### Fixed

- Fixed calculating width of `HorizontalBar` component.

## [2.13.7] - 2023-03-31

### Fixed

- Fixed display `Line.Null`.

## [2.13.6] - 2023-03-31

### Fixed

- Fixed adding custom styles for `Radar` chart.

## [2.13.5] - 2023-03-29

### Fixed

- Fixed calculating height of `Bar` component.

## [2.13.4] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.9 ~> 1.10.0], `@semcore/utils` [3.49.1 ~> 3.50.0]).

## [2.13.3] - 2023-03-27

### Fixed

- Added correct display when there is no data in A11Y table.

## [2.13.2] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.7 ~> 1.9.8], `@semcore/popper` [4.16.9 ~> 4.16.10], `@semcore/utils` [3.48.1 ~> 3.49.0]).

## [2.13.0] - 2023-03-23

### Added

- Added `additionalFields` in `a11yAltTextConfig` for extra text description to the data when using a screen reader

## [2.12.2] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.4 ~> 1.9.5], `@semcore/utils` [3.47.3 ~> 3.47.4]).

## [2.12.1] - 2023-03-21

### Fixed

- Fixed `Radar` chart with negative rotation hover handling.

## [2.12.0] - 2023-03-16

### Added

- Add `angleOffset` parameter to `Radar` chart.

## [2.11.1] - 2023-03-16

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.3 ~> 1.9.4], `@semcore/utils` [3.47.2 ~> 3.47.3]).

## [2.11.0] - 2023-03-13

### Changed

- Much improved A11Y summary generation for `Radar` chart.

## [2.10.0] - 2023-03-07

### Added

- Added footer in `Tooltip`.

## [2.9.1] - 2023-03-06

### Fixed

- Added backward compatibility with react 16.9.

## [2.9.0] - 2023-03-06

### Added

- Added a new chart type `Radar`.

## [2.8.19] - 2023-03-01

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.16.3 ~> 4.16.4]).

## [2.8.18] - 2023-02-28

### Fixed

- Fixed summary generation was broken after i18n enhancement release.

## [2.8.17] - 2023-02-28

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.1 ~> 1.9.2]).

## [2.8.16] - 2023-02-22

## [2.8.15] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.9.0 ~> 1.9.1], `@semcore/utils` [3.47.0 ~> 3.47.1]).

## [2.8.14] - 2023-02-11

### Fixed

- Added check for the presence of DON at start of animation for `RadialTree`.

## [2.8.13] - 2023-02-10

### Fixed

- Fixed display of `Bar` with height 0 - it is should not be rendered.

## [2.8.12] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

## [2.8.11] - 2023-01-27

### Fixed

- Fixed animation for `Donut`.

## [2.8.10] - 2023-01-26

### Changed

- Changed minimum height in types for `Bar`.

## [2.8.9] - 2023-01-25

### Fixed

- Fixed and changed minimum height of `Bar`.

## [2.8.8] - 2023-01-23

### Fixed

- Fixed definition of users locale.

## [2.8.7] - 2023-01-19

### Fixed

- Fixed animation in React strict mode for `RadialTree` and `Donut`.

## [2.8.6] - 2023-01-19

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.8.8 ~> 1.8.9], `@semcore/utils` [3.44.3 ~> 3.45.0]).

## [2.8.3] - 2022-01-10

### Fixed

- Added prop `transparent` for all charts opacity

## [2.8.2] - 2023-01-10

## [2.8.1] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.8.5 ~> 1.8.6], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [2.8.0] - 2022-01-05

### Added

- Added prop `transparent` for charts opacity

## [2.7.2] - 2022-12-27

### Fixed

- Fixed `Donut` chart rendering when hovering over a chart while it is loading.

## [2.7.1] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.8.4 ~> 1.8.5], `@semcore/utils` [3.44.0 ~> 3.44.1]).

## [2.7.0] - 2022-12-14

### Changed

- Supported semi-async internationalization of text in A11Y module.

## [2.6.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.6.0] - 2022-12-12

### Added

- Design tokens based theming.

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

- Ensured A11Y module do not break mouse interactions.

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

- Changed paths in CSS files to relative.

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

- Exclude props from HTML for `Tooltip.Dot`
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

## [1.0.0-prerelease.10] - 2021-02-11

### Added

- Initial release.
