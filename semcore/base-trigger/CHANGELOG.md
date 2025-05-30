# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.2.0] - 2025-05-30

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.1.0 ~> 16.2.0], `@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.1.0] - 2025-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.0.0 ~> 16.1.0]).

## [16.0.0] - 2025-05-19

### Break

- replaced `keyboardFocusEnhance` with `:focus-visible` CSS pseudo-class.

### Added

- `tabIndex` in `BaseTrigger` to fix focus [issue on webkit](https://bugs.webkit.org/show_bug.cgi?id=229895).

## [4.53.2] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5]).

## [4.53.1] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.61.0 ~> 4.62.0], `@semcore/utils` [4.48.2 ~> 4.48.4]).

## [4.53.0] - 2025-04-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.60.2 ~> 4.61.0]).

## [4.52.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2]).

## [4.52.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.60.0 ~> 4.60.1], `@semcore/utils` [4.48.0 ~> 4.48.1]).

## [4.52.0] - 2025-03-14

### Added

- Build for ESM.

## [4.51.1] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1]).

## [4.51.0] - 2025-02-05

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.56.0 ~> 4.57.0]).

## [4.50.0] - 2025-02-03

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.44.1 ~> 4.45.0]).

## [4.49.4] - 2025-01-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.53.1 ~> 4.55.0], `@semcore/spin` [5.39.1 ~> 5.39.2]).

## [4.49.3] - 2024-12-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.44.0 ~> 4.44.1]).

## [4.49.2] - 2024-12-05

### Removed

- Default tag `button` from FilterTrigger and ButtonTrigger to reduce code duplication.

## [4.49.1] - 2024-11-29

### Changed

- Default tag for BaseTrigger to `button` as part of a11y improvement.

## [4.49.0] - 2024-11-20

### Fixed

- Added `Hint` to the `FilterTrigger.ClearButton`.
- Remove redundant `aria-label` & `aria-labelledby` from `FilterTrigger.ClearButton`.
- Added `role` combobox to the `FilterTrigger.TriggerButton`.
- Added `count` prop to `FilterTrigger.Counter`, along with screenreader only `selected` text.
- `placeholder` text is now `aria-hidden` for triggers because of `aria-label` and double pronouncing.

## [4.48.2] - 2024-11-21

### Fixed

- HTML element of `LinkTrigger` from `div` to `button` as part of a11y improvements. The change allows to use 'LinkTrigger' with `label` properly

## [4.48.1] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.0 ~> 4.43.2]).

## [4.48.0] - 2024-11-01

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.51.0 ~> 4.52.0], `@semcore/utils` [4.42.0 ~> 4.43.0]).

## [4.47.0] - 2024-10-28

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.41.0 ~> 4.42.0]).

## [4.46.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.48.0 ~> 4.50.0], `@semcore/utils` [4.39.0 ~> 4.41.0]).

## [4.45.1] - 2024-10-11

### Fixed

- Interaction with non-interactive icons (with `aria-hidden`) in Addons.

## [4.45.0] - 2024-10-04

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.36.2 ~> 4.38.0]).

## [4.44.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.45.0 ~> 4.46.0], `@semcore/utils` [4.36.0 ~> 4.36.2]).

## [4.44.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.35.0 ~> 4.36.0]).

## [4.43.1] - 2024-09-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.44.0 ~> 4.44.1], `@semcore/utils` [4.32.2 ~> 4.35.0]).

## [4.43.0] - 2024-08-23

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.43.2 ~> 4.44.0]).

## [4.42.2] - 2024-08-05

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.1 ~> 4.32.2]).

## [4.42.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.0 ~> 4.32.1]).

## [4.42.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.31.0 ~> 4.32.0]).

## [4.41.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.41.0 ~> 4.42.0], `@semcore/utils` [4.30.0 ~> 4.31.0]).

## [4.40.0] - 2024-07-05

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.39.1 ~> 4.41.0], `@semcore/spin` [5.28.0 ~> 5.29.0]).

## [4.39.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.38.0 ~> 4.39.1], `@semcore/utils` [4.29.0 ~> 4.30.0]).

## [4.38.1] - 2024-06-26

### Fixed

- `aria-*` props didn't pass to the `Trigger` in the `Filter.Trigger`.

## [4.38.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.28.2 ~> 4.29.0]).

## [4.37.2] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.36.1 ~> 4.37.0], `@semcore/utils` [4.28.1 ~> 4.28.2]).

## [4.37.1] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.0 ~> 4.28.1]).

## [4.37.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/spin` [5.25.0 ~> 5.26.0], `@semcore/utils` [4.27.0 ~> 4.28.0]).

## [4.36.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.26.2 ~> 4.27.0]).

## [4.35.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2]).

## [4.35.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1]).

## [4.34.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.23.2 ~> 4.24.0]).

## [4.32.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.1 ~> 4.23.2]).

## [4.32.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.0 ~> 4.23.1]).

## [4.32.0] - 2024-04-09

### Added

- composition API for `FilterTrigger`.

## [4.31.2] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2]).

## [4.31.1] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.0 ~> 4.22.1]).

## [4.31.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0]).

## [4.30.1] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.21.0 ~> 4.21.1]).

## [4.30.0] - 2024-03-22

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.28.0 ~> 4.29.0]).

## [4.29.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.27.1 ~> 4.28.0], `@semcore/utils` [4.20.5 ~> 4.21.0]).

## [4.28.0] - 2024-03-07

### Added

- ButtonTrigger got `chevron` prop that controls display of chevron icon.

## [4.27.1] - 2024-03-07

### Fixed

- Behavior in forms was broken.

## [4.27.0] - 2024-03-04

### Changed

- Tag for `ButtonTrigger` is `button` instead of `div`.

## [4.26.7] - 2024-03-06

### Fixed

- In some rare cases `FilterTrigger` may share it's ref between component instances.

## [4.26.6] - 2024-03-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.26.1 ~> 4.27.0], `@semcore/utils` [4.20.3 ~> 4.20.4]).

## [4.26.5] - 2024-02-26

### Fixed

- A11Y in Firefox for clear button in FilterTrigger.

## [4.26.4] - 2024-02-23

### Fixed

- Returning focus on trigger after clear `FilterTrigger`.

## [4.26.3] - 2024-02-22

### Fixed

- Filter trigger options navigations were not announced by assistive technologies.

## [4.26.2] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3]).

## [4.26.1] - 2024-02-19

### Fixed

- Pressing enter in forms was triggering `FilterTrigger` to open.

## [4.26.0] - 2024-02-14

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.25.0 ~> 4.26.0]).

## [4.25.1] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.24.1 ~> 4.25.0], `@semcore/utils` [4.20.1 ~> 4.20.2]).

## [4.25.0] - 2024-02-07

### Added

- `triggerRef` prop for FilterTrigger component to access inner trigger.

## [4.24.1] - 2024-02-05

### Fixed

- Invalid attribute errors in console that appears when component has invalid state.

## [4.24.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0]).

## [4.23.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1]).

## [4.23.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0]).

## [4.22.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0]).

## [4.21.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.13.1 ~> 2.14.0]).

## [4.20.2] - 2024-01-15

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.20.1 ~> 4.20.2]).

## [4.20.1] - 2024-01-08

### Fixed

- `BaseTriggerProps` type had `{ [key: string]: unknown; }` that was breaking it's and all inherited types manipulations.

## [4.20.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0]).

## [4.19.1] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [4.19.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.11.0 ~> 2.12.0]).

## [4.18.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.13.0 ~> 4.14.0]).

## [4.17.0] - 2023-11-24

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.10.3 ~> 4.13.0], `@semcore/core` [2.9.2 ~> 2.10.0]).

## [4.16.1] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3]).

## [4.16.0] - 2023-11-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.15.0 ~> 4.16.0]).

## [4.15.2] - 2023-11-10

### Fixed

- Blue border for `Trigger` when it `active` and in `normal` state.

## [4.15.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2]).

## [4.15.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.13.0 ~> 4.14.0], `@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [4.14.0] - 2023-10-26

### Added

- Design tokens resolving for prop `color`.

## [4.13.0] - 2023-10-26

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.11.2 ~> 4.12.0]).

## [4.12.2] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.3 ~> 4.8.4]).

## [4.12.1] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.2 ~> 4.8.3]).

## [4.12.0] - 2023-10-10

### Changed

- Version preminor update due to children dependencies update (`@semcore/flex-box` [5.7.5 ~> 5.8.0]).

## [4.11.0] - 2023-10-09

### Added

- `nl` locale support.

## [4.10.2] - 2023-10-06

### Fixed

- Invalid attribute React warnings.

## [4.10.1] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1]).

## [4.10.0] - 2023-10-22

### Fixed

- Empty FilterTrigger now gets role `button` during empty state instead of `group`.

## [4.9.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.7.1 ~> 2.7.2]).

## [4.9.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1]).

## [4.9.0] - 2023-09-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.8.3 ~> 4.9.0]).

## [4.8.3] - 2023-09-13

### Changed

- Version prepatch update due to children dependencies update (`@semcore/icon` [4.8.2 ~> 4.8.3], `@semcore/utils` [4.6.3 ~> 4.7.0]).

## [4.8.2] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.2 ~> 2.6.3]).

## [4.8.1] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2]).

## [4.8.0] - 2023-09-05

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.7.1 ~> 4.8.0]).

## [4.7.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.0 ~> 2.6.1]).

## [4.7.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.5.0 ~> 2.6.0]).

## [4.6.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0]).

## [4.5.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1]).

## [4.5.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/icon` [4.4.1 ~> 4.5.0], `@semcore/utils` [4.3.1 ~> 4.4.0]).

## [4.4.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [4.4.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [4.3.2] - 2023-08-18

### Changed

- Version prepatch update due to children dependencies update (`@semcore/neighbor-location` [4.2.0 ~> 4.2.1]).

## [4.3.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [4.3.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [4.2.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0], `@semcore/icon` [4.1.0 ~> 4.2.0]).

## [4.1.0] - 2023-07-27

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.0.0 ~> 4.1.0]).

## [4.0.1] - 2023-07-24

### Fixed

- `BaseTrigger` props strictness.

## [4.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [3.12.2] - 2023-06-30

## [3.12.1] - 2023-06-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.15.3 ~> 3.16.0]).

## [3.12.0] - 2023-06-23

### Added

- `FilterTrigger` focus returning after the clear effect.

## [3.11.2] - 2023-06-13

### Fixed

- Transferring style for trigger active state from FilterTrigger/LinkTrigger to BaseTrigger.

### Changed

- Remove unused style in FilterTrigger.

## [3.11.0] - 2023-06-12

### Added

- Swedish (`sv`) locale support.

## [3.10.2] - 2023-06-12

### Fixed

- Disabled FilterTrigger inner parts animations for proper container animation.

## [3.10.1] - 2023-06-09

### Added

- FilterTrigger `aria-labelledby` reference from the "Clear" button to make screen reader users easier understand what the button is related to.

## [3.10.0] - 2023-06-07

### Fixed

- Passing props to FilterTrigger inner select.

## [3.9.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [3.8.0] - 2023-06-07

### Changed

- FilterTrigger background changed from gray to white.

## [3.7.0] - 2023-06-06

### Changed

- Blue border of trigger in the active state.

## [3.6.3] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [3.6.2] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [3.6.1] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [3.6.0] - 2023-05-22

### Changed

- Updated border-color for invalid and valid states. Made them more contrast according to accessibility recommendations.
- Updated styles for FilterTrigger, added styles for `hover` distinguished from `active` state.

## [3.5.19] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [3.5.18] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [3.5.16] - 2023-04-24

## [3.5.15] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [3.5.4] - 2023-03-01

## [3.5.3] - 2023-02-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.12.0 ~> 3.13.0]).

## [3.5.2] - 2023-02-22

## [3.5.1] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [3.5.0] - 2023-02-20

### Added

- Added triggers width animation triggered by change of `value` prop.

## [3.4.12] - 2023-02-13

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.9.0 ~> 3.10.0]).

## [3.4.11] - 2023-02-13

## [3.4.10] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

## [3.4.9] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.7.0 ~> 3.8.0], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.4.7] - 2023-01-19

### Fixed

- Removed font-family enforcement.

## [3.4.6] - 2023-01-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.4.2] - 2022-12-21

### Fixed

- Fixed the problem of not showing the placeholder when the body of the `BaseTrigger` is empty.

## [3.4.1] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1]).

## [3.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.3.3] - 2022-12-14

### Fixed

- Fixed hardcoded spacing style literal.

## [3.3.2] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.1] - 2022-12-12

### Changed

- The icon in `LinkTrigger` is centered vertically.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.8] - 2022-11-15

### Added

- Added support text ellipsis in `LinkTrigger.Text`.

## [3.2.7] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.2.0 ~> 3.3.0]).

## [3.2.6] - 2022-11-07

### Fixed

- Fixed `FilterTrigger` accessibility.

## [3.2.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/icon` [3.1.1 ~> 3.1.2]).

## [3.2.1] - 2022-10-17

### Fixed

- Fixed the problem of not showing the placeholder when the body of the `FilterTrigger` is empty.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.1.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [3.0.24] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [3.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [3.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.24.0 ~> 2.25.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" and "s" for "size".

## [2.6.5] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.6.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.5.3] - 2022-02-25

### Fixed

- Improved keyboard focus styles.

## [2.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.5.1] - 2022-02-18

### Fixed

- Fixed LinkTrigger hovered text color.

## [2.5.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.4.1] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [2.4.0] - 2021-10-01

### Changed

- Up version package `@semcore/dot`.

## [2.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [2.3.0] - 2021-06-08

### Changed

- Rewrite code from TS to JS 🧑‍💻
- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.2] - 2021-04-16

### Changed

- Changed line-height value

## [2.2.1] - 2020-12-23

### Fixed

- Fixed color `spinner` for `ButtonTrigger`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.1.0] - 2020-08-12

### Added

- Добавили новый триггер `LinkTrigger`
- Добавили состояние `loading` для `ButtonTrigger`

## [2.0.4] - 2020-07-13

### Changed

- Теперь z-index изменяется на +1 при фокусе с клавиатуры, для правильного отображения бордера с соседними элементами.

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.2] - 2020-06-08

### Fixed

- Исправлена типизация `FilterTrigger.Counter`

## [2.0.2-prerelease.10] - 2020-06-03

### Fixed

- `FilterTrigger`, исправлено отображение свойства `disabled`
- `FilterTrigger`, исправлен цвет `FilterTrigger.Counter`

## [2.0.1] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.4.1] - 2020-02-13

### Fixed

- Переименовали сбилженные файлы с `sm.style.css` -> `style.css`

## [1.4.0] - 2020-02-12

### Added

- Добавлена тема `sellerly`, контрол `FilterTrigger` по умолчанию цвета `light-ultramarine`

## [1.3.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (`build.css`)

## [1.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через CSS переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.1.9] - 2019-10-25

### Changed

- Обновили размер шеврона, теперь он один (size=`xs`) для всех размеров триггера

## [1.1.8] - 2019-10-21

### Fixed

- Возвращенна работа с клавиатуры

## [1.1.7] - 2019-10-15

### Fixed

- Добавлено состояние `active` при открытии в `FilterTrigger`

## [1.1.6] - 2019-10-14

### Added

- Добавлен `export` интерфейса для `ButtonTrigger`

## [1.1.5] - 2019-10-11

### Fixed

- Исправлена возможность задавать ширину FilterTrigger

## [1.1.1] - 2019-10-09

### Added

- Добавлены `ButtonTrigger`/`FilterTrigger`

## [1.0.0] - 2019-10-07

### Added

- Initial release
