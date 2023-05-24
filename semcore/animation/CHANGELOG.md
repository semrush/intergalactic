# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.10.10] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [1.10.9] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [1.10.8] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [1.10.7] - 2023-05-03

### Changed

- During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [1.10.6] - 2023-05-02

### Fixed

- Fixed collapse animations blinking.

## [1.10.5] - 2023-04-25

### Fixed

- Fixed collapse animations (e.g. used in `<Accordion />`) in Safari.

## [1.10.3] - 2023-04-24

## [1.10.2] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [1.10.1] - 2023-04-03

### Fixed

- Nested animation might take initial keyframe from animated parent component in some cases.

## [1.10.0] - 2023-03-27

### Added

- Animation context that allows children components react to parent animation execution.

## [1.9.9] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.0 ~> 3.49.1]).

## [1.9.8] - 2023-03-24

### Added

- Added `pointer-events` properties to scale group `keyframes` to avoid problems with overlapping elements and changing the cursor.

## [1.9.7] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.48.0 ~> 3.48.1]).

## [1.9.2] - 2023-02-28

### Fixed

- Fixed `ISlideProps` interface structure.

## [1.9.1] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [1.9.0] - 2023-02-20

### Added

- Added prop `animationsDisabled` to disable components' animation.
- Added prop `timingFunction` to control animation easing.
- Added `<Scale />` and `<Slide />` animation components.

## [1.8.11] - 2023-02-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [1.8.8] - 2023-01-11

### Fixed

- Fixed flickering in `Collapse` animation.

## [1.8.6] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [1.8.3] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [1.8.2] - 2022-12-12

## [1.8.1] - 2022-12-09

### Changed

- Changed prop `initialAnimation` to optional.

## [1.8.0] - 2022-12-05

### Added

- Added prop `initialAnimation` to run animation on the first rendering

## [1.7.3] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.41.0 ~> 3.42.0], `@semcore/flex-box` [4.6.4 ~> 4.6.5]).

## [1.7.0] - 2022-10-21

### Added

- Added a property that removes the `overflow=hidden` setting.

### Changed

- Returning the original `overflow` after the animation has passed.

## [1.6.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1]).

## [1.6.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [1.5.11] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [1.5.9] - 2022-08-29

### Fixed

- Fixed playing entering animation if init animation state is already reached.

## [1.5.8] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [1.5.0] - 2022-04-03

### Added

- Added `preserveNode` property.

## [1.4.2] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [1.4.1] - 2021-03-05

### Fixed

- Fixed fade animation behavior in prefer reduce motion mode.

## [1.4.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [1.3.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.3.1] - 2021-07-02

### Fixed

- [TS] fixed export components.

## [1.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.2.1] - 2020-12-25

### Fixed

- Fixed bubbling call handlers `onAnimationStart`, `onAnimationEnd` from inside components.

## [1.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.1.4] - 2020-12-07

### Fixed

- Fixed a bug in determining the height in `Collapse`.

## [1.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [1.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.1.0] - 2020-10-08

### Added

- Add `Collapse` animation.

## [1.0.0] - 2020-09-11

### Added

- Initial release
