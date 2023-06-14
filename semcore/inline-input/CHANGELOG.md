# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.7.1] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.30 ~> 4.7.31], `@semcore/icon` [3.15.1 ~> 3.15.2], `@semcore/utils` [3.53.3 ~> 3.53.4]).

## [3.7.0] - 2023-06-12

### Added

- Swedish (`sv`) locale support.

## [3.6.2] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.29 ~> 4.7.30], `@semcore/icon` [3.15.0 ~> 3.15.1], `@semcore/utils` [3.53.2 ~> 3.53.3]).

## [3.6.1] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.28 ~> 4.7.29], `@semcore/icon` [3.14.16 ~> 3.15.0], `@semcore/utils` [3.53.1 ~> 3.53.2]).

## [3.6.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [3.5.42] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.27 ~> 4.7.28], `@semcore/icon` [3.14.15 ~> 3.14.16], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [3.5.41] - 2023-06-01

### Fixed

- In some cases `onBlurBehavior` effect was called simultaneously with explicitly called confirm or cancel effect.

## [3.5.40] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.26 ~> 4.7.27], `@semcore/icon` [3.14.14 ~> 3.14.15], `@semcore/utils` [3.52.0 ~> 3.53.0]).

## [3.5.39] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.25 ~> 4.7.26], `@semcore/icon` [3.14.13 ~> 3.14.14], `@semcore/utils` [3.51.1 ~> 3.52.0]).

## [3.5.38] - 2023-05-25

### Fixed

- In some rare `onConfirm` and `onCancel` race condition were occurring.

## [3.5.37] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.24 ~> 4.7.25], `@semcore/icon` [3.14.12 ~> 3.14.13], `@semcore/utils` [3.51.0 ~> 3.51.1]).

## [3.5.36] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.23 ~> 4.7.24], `@semcore/icon` [3.14.11 ~> 3.14.12], `@semcore/utils` [3.50.7 ~> 3.51.0]).

## [3.5.35] - 2023-05-15

### Fixed

- Pressing `Escape` or `Enter` might trigger both `onConfirm` and `onCancel`.

## [3.5.34] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.22 ~> 4.7.23], `@semcore/icon` [3.14.10 ~> 3.14.11], `@semcore/utils` [3.50.6 ~> 3.50.7]).

## [3.5.33] - 2023-05-10

### Fixed

- Removed mistaken types.

## [3.5.32] - 2023-05-10

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.4.9 ~> 5.4.10]).

## [3.5.29] - 2023-04-24

### Fixed

- Improvements for a11y. Hidden controls because they are accessible via the keyboard.

## [3.5.27] - 2023-04-14

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.18 ~> 4.7.19], `@semcore/icon` [3.14.6 ~> 3.14.7], `@semcore/utils` [3.50.0 ~> 3.50.2]).

## [3.5.1] - 2023-01-11

### Fixed

- Fixed displaying tooltip of `ConfirmControl`.

### Changed

- Changed all translations of `CancelControl` text tooltip.

## [3.4.4] - 2023-01-10

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/icon` [3.5.0 ~> 3.5.1], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.1] - 2022-11-30

### Fixed

- Disabled moving focus in tooltips.

## [3.2.0] - 2022-11-30

### Changed

- Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.

## [3.1.8] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.6.3 ~> 4.6.4], `@semcore/icon` [3.3.0 ~> 3.3.1], `@semcore/utils` [3.40.0 ~> 3.41.0]).

## [3.1.6] - 2022-11-08

## [3.1.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/icon` [3.1.1 ~> 3.1.2], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [3.1.1] - 2022-10-28

### Added

- Added accessability needed aria label.

## [3.1.4] - 2022-10-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.1.0 ~> 3.1.1]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.0.25] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [3.0.9] - 2022-06-03

### Fixed

- Remove 4px vertical paddings.

## [3.0.8] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.4 ~> 4.5.5], `@semcore/icon` [2.26.1 ~> 2.27.0], `@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/button` [4.0.5 ~> 4.0.6]).

## [3.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [3.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.24.0 ~> 2.25.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

### Changed

- Moved all color definitions to themable styles.

## [2.0.2] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.0.0] - 2022-04-07

### Changed

- Changed `<InlineInput />` api to make it more consistent with other components.

## [1.0.0] - 2022-03-30

### Added

- Introduced `<InlineInput />` component.
