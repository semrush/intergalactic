# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.2.0] - 2026-06-05

### Added

- Links to the API and examples in the docs.

## [17.1.0] - 2026-05-13

### Added

- New brand theme.

## [17.0.1] - 2026-04-16

### Fixed

- Build processing to correct extract styles.

## [17.0.0] - 2026-04-15

### BREAK

- Removed old implementation for the `ButtonLink`. This is a wrapper for the `Link` but in tag `button` now.
- New major version.

### Fixed

- Adjusted `ButtonLink` baseline.

## [16.0.12] - 2025-11-03

### Added

- `data-ui-name` for Inner container.

## [16.0.11] - 2025-10-29

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [16.0.10 ~> 16.0.11], `@semcore/base-components` [16.4.0 ~> 16.4.1]).

## [16.0.10] - 2025-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.2.3 ~> 16.4.0]).

## [16.0.9] - 2025-09-12

### Fixed

- Typo in `ButtonLink` size defaults.

## [16.0.8] - 2025-09-05

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.2.1 ~> 16.2.2]).

## [16.0.7] - 2025-08-29

### Changed

- Version patch update due to children dependencies update (`@semcore/spin` [16.0.6 ~> 16.0.7], `@semcore/base-components` [16.2.0 ~> 16.2.1]).

## [16.0.6] - 2025-08-07

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.1.2 ~> 16.2.0]).

## [16.0.5] - 2025-07-23

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [16.0.4 ~> 16.0.5], `@semcore/base-components` [16.1.1 ~> 16.1.2]).

## [16.0.4] - 2025-07-04

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [16.0.3 ~> 16.0.4], `@semcore/base-components` [16.1.0 ~> 16.1.1]).

## [16.0.3] - 2025-06-23

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.2 ~> 16.1.0]).

## [16.0.2] - 2025-06-16

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.1 ~> 16.0.2]).

## [16.0.1] - 2025-05-30

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.0.0] - 2025-05-19

### Break

- replaced `keyboardFocusEnhance` with `:focus-visible` CSS pseudo-class.

## [5.43.3] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5]).

## [5.43.2] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.2 ~> 4.48.4]).

## [5.43.1] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2]).

## [5.43.0] - 2025-03-21

### Added

- New `brand` theme. `warning` theme was deprecated.

## [5.42.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.0 ~> 4.48.1]).

## [5.42.0] - 2025-02-21

### Added

- Build for ESM.

## [5.41.2] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1]).

## [5.41.1] - 2025-02-04

### Fixed

- `background-color` token name for primary button with `neighborLocation` enabled.

## [5.41.0] - 2025-02-03

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.44.1 ~> 4.45.0]).

## [5.40.3] - 2025-01-21

### Changed

- Version patch update due to children dependencies update (`@semcore/spin` [5.39.1 ~> 5.39.2]).

## [5.40.2] - 2024-12-30

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.47.0 ~> 6.47.1], `@semcore/utils` [4.44.0 ~> 4.44.1]).

## [5.40.1] - 2024-12-05

### Removed

- Unnecessary `aria-disabled` on disabled button.

## [5.40.0] - 2024-11-29

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.38.2 ~> 5.39.0], `@semcore/utils` [4.43.3 ~> 4.44.0]).

## [5.39.4] - 2024-11-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.2 ~> 4.43.3]).

## [5.39.3] - 2024-11-18

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.46.1 ~> 6.46.2]).

## [5.39.2] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.46.0 ~> 6.46.1], `@semcore/utils` [4.43.0 ~> 4.43.2]).

## [5.39.1] - 2024-10-30

### Fixed

- Disabled state is not applied to ButtonLink.

## [5.39.0] - 2024-10-28

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.41.0 ~> 4.42.0]).

## [5.38.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.39.0 ~> 4.41.0]).

## [5.37.3] - 2024-10-11

### Fixed

- Interaction with non-interactive icons (with `aria-hidden`) in Addons.

## [5.37.2] - 2024-10-01

### Fixed

- `hasChildren` condition to only display full Button or Addon only.

## [5.37.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.36.0 ~> 4.36.2]).

## [5.37.0] - 2024-09-09

### Added

- Component `ButtonLink`.

## [5.36.0] - 2024-09-06

### Changed

- Version minor update due to children dependencies update (`@semcore/tooltip` [6.40.4 ~> 6.41.0], `@semcore/utils` [4.32.2 ~> 4.35.0]).

## [5.35.2] - 2024-08-23

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.40.3 ~> 6.40.4]).

## [5.35.1] - 2024-08-12

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.40.2 ~> 6.40.3]).

## [5.35.0] - 2024-07-31

### Changed

- Changed `loading` set spinner color setting. Instead of palette, hardcoded to `theme` and `use` props, color of text in button is used. Default color of this state visually preserved.

## [5.34.1] - 2024-07-26

### Fixed

- Tokens for `Button` with `use="primary"` and `theme="warning"`: from `--intergalactic-icon-primary-warning` and `--intergalactic-icon-primary-warning-hover-active` to `--intergalactic-control-primary-brand`, `--intergalactic-control-primary-brand-hover` and `--intergalactic-control-primary-brand-active`.

## [5.34.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/tooltip` [6.39.1 ~> 6.40.0], `@semcore/utils` [4.31.0 ~> 4.32.0]).

## [5.33.0] - 2024-07-17

### Changed

- Version minor update due to children dependencies update (`@semcore/tooltip` [6.37.0 ~> 6.39.0]).

## [5.32.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.30.0 ~> 4.31.0]).

## [5.31.1] - 2024-07-05

### Changed

- Version patch update due to children dependencies update (`@semcore/spin` [5.28.0 ~> 5.29.0], `@semcore/tooltip` [6.36.0 ~> 6.36.1]).

## [5.31.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.29.0 ~> 4.30.0]).

## [5.30.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.28.2 ~> 4.29.0]).

## [5.29.1] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.1 ~> 4.28.2]).

## [5.29.0] - 2024-05-30

### Added

- `Hint` for Button with addon and without text.

## [5.28.1] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.0 ~> 4.28.1]).

## [5.28.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/spin` [5.25.0 ~> 5.26.0], `@semcore/utils` [4.27.0 ~> 4.28.0]).

## [5.27.0] - 2024-05-21

### Changed

- Now buttons of `s` and `l` size is based on `--intergalactic-form-control-m` and `--intergalactic-form-control-l` design token respectively (with no change in size in default theme).

## [5.26.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2]).

## [5.26.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1]).

## [5.25.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.23.2 ~> 4.24.0]).

## [5.23.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.1 ~> 4.23.2]).

## [5.23.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.0 ~> 4.23.1]).

## [5.23.0] - 2024-04-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.22.2 ~> 4.23.0]).

## [5.22.2] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2]).

## [5.22.1] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.0 ~> 4.22.1]).

## [5.22.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0]).

## [5.21.1] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.21.0 ~> 4.21.1]).

## [5.21.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.20.5 ~> 4.21.0]).

## [5.20.5] - 2024-03-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.4 ~> 4.20.5]).

## [5.20.4] - 2024-02-29

### Fixed

- Old themization with `@semcore/babel-plugin-react-semcore` wasn't working.

## [5.20.3] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3]).

## [5.20.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.1 ~> 4.20.2]).

## [5.20.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.18.0 ~> 5.19.0], `@semcore/utils` [4.20.0 ~> 4.20.1]).

## [5.20.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0]).

## [5.19.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1]).

## [5.19.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0]).

## [5.18.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0]).

## [5.17.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.13.1 ~> 2.14.0]).

## [5.16.0] - 2023-12-22

### Fixed

- Grouped controls separator color and shape. Additional separators are now added only between sibling `Button`s, all other components just removes one of sticked border.

## [5.15.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0]).

## [5.14.1] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [5.14.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.11.0 ~> 2.12.0]).

## [5.13.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.13.0 ~> 4.14.0]).

## [5.12.0] - 2023-11-24

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.10.3 ~> 4.13.0], `@semcore/core` [2.9.2 ~> 2.10.0]).

## [5.11.3] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3]).

## [5.11.2] - 2023-11-14

### Fixed

- Width of `Button` by fit-content in flex containers.

## [5.11.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2]).

## [5.11.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [5.10.0] - 2023-10-27

### Changed

- Version preminor update due to children dependencies update (`@semcore/spin` [5.8.2 ~> 5.9.0], `@semcore/utils` [4.8.4 ~> 4.9.0]).

## [5.9.3] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.3 ~> 4.8.4]).

## [5.9.2] - 2023-10-16

### Fixed

- Improved `focus` for `Buttons` in `disabled` states.

## [5.9.1] - 2023-10-13

### Fixed

- Removed `box-shadow` for focused `Buttons` in `loading` or `disabled` states.

## [5.9.0] - 2023-10-10

### Changed

- Version preminor update due to children dependencies update (`@semcore/flex-box` [5.7.5 ~> 5.8.0]).

## [5.8.5] - 2023-10-06

### Fixed

- added `aria-busy='true'` for loading state and `aria-disable` for disabled state.

## [5.8.4] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1]).

## [5.8.3] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [5.8.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.7.1 ~> 2.7.2]).

## [5.8.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1]).

## [5.8.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.6.3 ~> 4.7.0]).

## [5.7.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.2 ~> 2.6.3]).

## [5.7.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2]).

## [5.7.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.0 ~> 2.6.1]).

## [5.7.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.5.0 ~> 2.6.0]).

## [5.6.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0]).

## [5.5.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1]).

## [5.5.0] - 2023-08-23

### Fixed

- Fixed paddings for Button's text and addons.

## [5.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [5.3.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [5.2.2] - 2023-08-18

### Changed

- Version prepatch update due to children dependencies update (`@semcore/neighbor-location` [4.2.0 ~> 4.2.1]).

## [5.2.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [5.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [5.1.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [5.0.1] - 2023-07-24

### Fixed

- `Button` props strictness.

## [5.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [4.4.9] - 2023-06-30

## [4.4.8] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [4.4.7] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4]).

## [4.4.6] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [4.4.5] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2]).

## [4.4.4] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1]).

## [4.4.3] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [4.4.2] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [4.4.1] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [4.4.0] - 2023-05-22

### Changed

- Fixed token for text in button with `use="secondary"` and `theme="info"`.

## [4.3.24] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [4.3.23] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [4.3.21] - 2023-04-24

## [4.3.20] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [4.3.19] - 2023-04-11

### Fixed

- Removed `role=button` from native button.

## [4.3.18] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0]).

## [4.3.8] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

## [4.3.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [4.3.6] - 2023-01-19

### Fixed

- Removed font-family enforcement.

## [4.3.5] - 2023-01-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [4.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.2.3] - 2022-10-26

### Fixed

- Lazy checks for necessity of `aria-label` in non production environment.

## [4.2.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.1.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [4.0.18] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.0.15] - 2022-08-29

### Fixed

- Fixed aria warning detection.

## [4.0.14] - 2022-08-24

### Fixed

- Update version `@semcore/utils` to use additional functions.

## [4.0.13] - 2022-08-19

### Added

- Added empty button aria-label check.

## [4.0.12] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [4.0.4] - 2022-05-27

### Fixed

- Fixed `width, height` for size Button.

## [4.0.3] - 2022-05-23

### Fixed

- Fixed background-color active state for `<Button use='primary' theme='warning'/>`.

## [4.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1]
, `@semcore/flex-box` [4.5.1 ~> 4.5.3]).

## [4.0.1] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" and "s" for "size".

## [3.3.7] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [3.3.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.3.4] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [3.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.2.1] - 2021-04-16

### Changed

- Changed line-height value

## [3.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.1.4] - 2020-12-02

### Fixed

- My little fix build 😬

## [3.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [3.1.0] - 2020-10-13

### Added

- Added alternative API for inserting `Addon`.

## [3.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.2] - 2020-07-13

### Changed

- Теперь z-index изменяется на +1 при фокусе с клавиатуры, для правильного отображения бордера с соседними элементами.

## [3.0.1] - 2020-06-22

### Fixed

- Поменялся цвет текста с `gray40` на `gray60` у `secondary-muted` и `tertiary-muted`.

## [3.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.5.1] - 2020-02-14

### Added

- [theme] Обновили стили `<Button use="tertiary">` для `sellerly`

## [2.5.0] - 2020-02-13

### Added

- Добавлена тема `sellerly`, фокус у контрола по умолчанию цвета `light-ultramarine`

## [2.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (`build.css`)

## [2.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через CSS переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы
- Добавлено прокидываение классов на `Spin` внутри кнопки

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.2.0] - 2019-09-30

### Added

- Добавлен `forwardRef` на компонент

## [2.1.13] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.1.12] - 2019-09-23

### Changed

- Обоновлена типизация. Теперь компонент принимает св-ва от `React.LinkHTMLAttributes`

## [2.1.11] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [2.1.10] - 2019-08-07

### Fixed

- Исправлено отоборажение в NeighborLocation для `use="primary"`

## [2.1.9] - 2019-07-31

### Fixed

- Исправлена сборка для рендера CSS на сервере

## [2.1.8] - 2019-07-24

### Fixed

- Добавлен `font-weight: normal`

## [2.1.7] - 2019-07-05

### Removed

- Зависимость от `@semcore/control`

## [2.1.6] - 2019-06-03

### Changed

- Обновлена версия `@semcore/control`

## [2.1.5] - 2019-05-27

### Fixed

- Добавлен пропущенный `color`

## [2.1.4] - 2019-05-13

### Changed

- Обнавлена версия `Spin` и изменена верстка

### Fixed

- Добавлен `line-height: 1` для выравнивания текста
- Добавлен `border: transparent` по умолчанию
- Исправлено добавление лишнего `Button.Text` при вставке через фрагмент

## [2.1.3] - 2019-05-07

### Changed

- Исправлены стили для корректной работы с `@semcore/control`
- Обновлена версия `@semcore/control`

## [2.1.2] - 2019-04-24

### Fixed

- Добавили `line-height: 1` к тексту кнопки

### Changed

- Изменены отступы `Button.Addon` для размера `xl` с 8px на 12px

## [2.1.1] - 2019-03-18

### Fixed

- Исправлена работа свойства `active`

## [2.1.0] - 2019-02-13

### Added

- Зависимость от комопнента `Control`

## [2.0.0] - 2019-01-18

### BREAK

- Убрано свойство `before`/`after`
- Убрано свойство `fullWidth`
- Убрано свойство `inputRef`
- Убраны стили для не используемых тем
- Добавленно свойство CSS `vertical-align: middle;`

### Added

- Компонент унаследован от `Box`
- Добавлены статические компоненты `Text`, `Addon`
- Добавлена возможность сбрасывать темы и размеры

### Fixed

- Корректное отобрежение цветной темы в `Spin`

## [1.3.0] - 2018-11-17

### Fixed

- Исправлены стили для корректной работы с другим тэгом
- Добавлены недостающие HTML-attributes

## [1.2.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE
- Добавлена возможность изменять тег на произвольный
- Добавлена возможность отключать размер и стили

## [1.1.1] - 2018-10-09

### Fixed

- Цвет текста для типа `tertiary` с темой `info` изменен на `--denim-blue`

### Added

- `warning` для типа `primary` с темой `muted`

## [1.1.0] - 2018-08-17

### Added

- Добавленна возможность работы с компонентом `ControlsGroup`

### Removed

- Убрали поддержку зависимости от React15

## [1.0.0] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

### Changed

- Обновлена зависимость от utils

## [1.0.0-3] - 2018-07-13

### Added

- Свойсво "fullWidth" для растягивания кнопки по всей ширине
- Добавлен spin для состояния loading

## [1.0.0-2] - 2018-07-06

### Added

- Инкапсуляция стилей

## [1.0.0-1] - 2018-06-04

### Added

- Initial release
