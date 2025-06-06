# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.0.1] - 2025-05-30

### Changed

- Version patch update due to children dependencies update (`@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.0.0] - 2025-05-19

### Break

- replaced `keyboardFocusEnhance` with `:focus-visible` CSS pseudo-class.

## [4.43.4] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5], `@semcore/core` [2.39.3 ~> 2.39.4]).

## [4.43.3] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/core` [2.39.2 ~> 2.39.3]).

## [4.43.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2], `@semcore/core` [2.39.1 ~> 2.39.2]).

## [4.43.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/core` [2.39.0 ~> 2.39.1]).

## [4.43.0] - 2025-03-14

### Added

- Build for ESM.

## [4.42.4] - 2025-02-22

### Added

- Animation for scrolling to the highlighted node to hide the delay after opening.
- Support for virtual list.

## [4.42.3] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/core` [2.38.0 ~> 2.38.1]).

## [4.42.2] - 2025-02-03

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.45.1 ~> 5.45.2], `@semcore/utils` [4.44.1 ~> 4.45.0], `@semcore/core` [2.37.1 ~> 2.38.0]).

## [4.42.1] - 2025-01-08

### Fixed

- styles for use with DnD.

## [4.42.0] - 2024-12-23

### Added

- `menuitemcheckbox` and `menuitemradio` roles for DropdownMenu.Item.

## [4.41.8] - 2024-12-16

### Fixed

- Items lost highlighting after filtering the list.

## [4.41.7] - 2024-12-05

### Fixed

- Click handler was called for disabled Item.

## [4.41.6] - 2024-12-02

### Fixed

- Dropdown didn't close when the trigger was clicked for the second time.

## [4.41.5] - 2024-11-27

### Fixed

- Handlers were not called for `Dropdown.Item` in a controlled `DropdownMenu` after it was closed and opened again.

## [4.41.4] - 2024-11-25

### Fixed

- Double call of `onVisibleChange` handler.

## [4.41.3] - 2024-11-22

### Fixed

- `onMouseEnter` in Dropdown.Item was not bubbling the event.

## [4.41.2] - 2024-11-08

### Fixed

- Double click event on DropDownMenu.Items.

## [4.41.1] - 2024-11-05

### Added

- Export for `DropdownPopperAriaProps` type.

## [4.41.0] - 2024-11-01

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.42.0 ~> 4.43.0], `@semcore/core` [2.35.0 ~> 2.36.0]).

## [4.40.1] - 2024-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.43.0 ~> 5.43.1], `@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/core` [2.34.0 ~> 2.35.0]).

## [4.40.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.39.0 ~> 4.41.0], `@semcore/core` [2.33.0 ~> 2.34.0]).

## [4.39.0] - 2024-10-11

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/core` [2.32.0 ~> 2.33.0]).

## [4.38.1] - 2024-10-11

### Fixed

- Types for enhances.

## [4.38.0] - 2024-09-24

### Added

- `AbstractDropdown` internal class. It's needed to create DropdownMenu and Select.
- `Dropdown.Item` with styles for DropdownMenu.Item and Select.Item.
- `Dropdown.Group` with styles for wrap DropdownMenu.Item and Select.Item into groups.

## [4.37.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/core` [2.31.0 ~> 2.31.1]).

## [4.37.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.35.0 ~> 4.36.0], `@semcore/core` [2.30.0 ~> 2.31.0]).

## [4.36.4] - 2024-08-28

### Added

- `aria-haspopup=dialog` in Trigger.

## [4.36.3] - 2024-08-20

### Fixed

- Focusing in popover.

## [4.36.2] - 2024-08-20

### Changed

- Enforce role (`combobox` or `button`) to trigger by its tag.

## [4.36.1] - 2024-08-12

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.39.2 ~> 5.39.3]).

## [4.36.0] - 2024-07-29

### Added

- Role `dialog` to the popper.

## [4.35.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.0 ~> 4.32.1], `@semcore/core` [2.29.0 ~> 2.29.1]).

## [4.35.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.38.1 ~> 5.39.0], `@semcore/utils` [4.31.0 ~> 4.32.0], `@semcore/core` [2.28.0 ~> 2.29.0]).

## [4.34.1] - 2024-07-19

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.38.0 ~> 5.38.1]).

## [4.34.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.30.0 ~> 4.31.0], `@semcore/core` [2.27.0 ~> 2.28.0]).

## [4.33.1] - 2024-07-05

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.37.0 ~> 5.37.1]).

## [4.33.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.29.0 ~> 4.30.0], `@semcore/core` [2.26.0 ~> 2.27.0]).

## [4.32.2] - 2024-06-14

### Fixed

- Dropdown with any `interaction` except `none` should be opened by pressing `Enter` or `Space`.

## [4.32.1] - 2024-06-14

### Fixed

- Dropdown with `interaction='none'` shouldn't be opened by pressing `Enter` or `Space`.

## [4.32.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.28.2 ~> 4.29.0], `@semcore/core` [2.25.2 ~> 2.26.0]).

## [4.31.7] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.1 ~> 4.28.2], `@semcore/core` [2.25.1 ~> 2.25.2]).

## [4.31.6] - 2024-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.5 ~> 5.35.6]).

## [4.31.5] - 2024-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.4 ~> 5.35.5]).

## [4.31.4] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.3 ~> 5.35.4], `@semcore/utils` [4.28.0 ~> 4.28.1], `@semcore/core` [2.25.0 ~> 2.25.1]).

## [4.31.3] - 2024-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.2 ~> 5.35.3]).

## [4.31.2] - 2024-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.1 ~> 5.35.2]).

## [4.31.1] - 2024-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.0 ~> 5.35.1]).

## [4.31.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.27.0 ~> 4.28.0], `@semcore/core` [2.24.0 ~> 2.25.0]).

## [4.30.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.26.2 ~> 4.27.0], `@semcore/core` [2.23.1 ~> 2.24.0]).

## [4.29.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2], `@semcore/core` [2.23.0 ~> 2.23.1]).

## [4.29.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1], `@semcore/core` [2.22.0 ~> 2.23.0]).

## [4.28.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.31.0 ~> 5.32.0]).

## [4.27.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.29.0 ~> 5.30.0]).

## [4.25.0] - 2024-04-29

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.28.0 ~> 5.29.0], `@semcore/utils` [4.23.2 ~> 4.24.0], `@semcore/core` [2.20.2 ~> 2.21.0]).

## [4.24.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.27.1 ~> 5.28.0], `@semcore/utils` [4.23.1 ~> 4.23.2], `@semcore/core` [2.20.1 ~> 2.20.2]).

## [4.24.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.27.0 ~> 5.27.1], `@semcore/utils` [4.23.0 ~> 4.23.1], `@semcore/core` [2.20.0 ~> 2.20.1]).

## [4.24.0] - 2024-04-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.22.2 ~> 4.23.0], `@semcore/core` [2.19.2 ~> 2.20.0]).

## [4.23.3] - 2024-04-12

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.26.2 ~> 5.26.3]).

## [4.23.2] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2], `@semcore/core` [2.19.1 ~> 2.19.2]).

## [4.23.1] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.25.0 ~> 5.26.1], `@semcore/utils` [4.22.0 ~> 4.22.1], `@semcore/core` [2.19.0 ~> 2.19.1]).

## [4.23.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0], `@semcore/core` [2.18.1 ~> 2.19.0]).

## [4.22.1] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.23.0 ~> 5.24.0], `@semcore/utils` [4.21.0 ~> 4.21.1], `@semcore/core` [2.18.0 ~> 2.18.1]).

## [4.22.0] - 2024-03-19

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.22.0 ~> 5.23.0]).

## [4.21.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.20.5 ~> 4.21.0], `@semcore/core` [2.17.5 ~> 2.18.0]).

## [4.20.0] - 2024-03-07

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.20.5 ~> 5.21.0]).

## [4.19.7] - 2024-03-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.4 ~> 4.20.5], `@semcore/core` [2.17.4 ~> 2.17.5]).

## [4.19.6] - 2024-03-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.3 ~> 4.20.4], `@semcore/core` [2.17.3 ~> 2.17.4]).

## [4.19.5] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3], `@semcore/core` [2.17.2 ~> 2.17.3]).

## [4.19.4] - 2024-02-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.20.0 ~> 5.20.1]).

## [4.19.3] - 2024-02-16

### Fixed

- Removed deprecation messages about `interaction` property (that were added by mistake).

## [4.19.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.19.1 ~> 5.20.0], `@semcore/utils` [4.20.1 ~> 4.20.2], `@semcore/core` [2.17.1 ~> 2.17.2]).

## [4.19.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.18.0 ~> 5.19.0], `@semcore/utils` [4.20.0 ~> 4.20.1], `@semcore/core` [2.17.0 ~> 2.17.1]).

## [4.19.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0], `@semcore/core` [2.16.1 ~> 2.17.0]).

## [4.18.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1], `@semcore/core` [2.16.0 ~> 2.16.1]).

## [4.18.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0], `@semcore/core` [2.15.0 ~> 2.16.0]).

## [4.17.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0], `@semcore/core` [2.14.0 ~> 2.15.0]).

## [4.16.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.13.1 ~> 2.14.0]).

## [4.15.0] - 2024-01-12

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.14.2 ~> 5.15.0]).

## [4.14.2] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.16.0 ~> 4.16.2], `@semcore/core` [2.13.0 ~> 2.13.1]).

## [4.14.1] - 2024-01-04

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.14.0 ~> 5.14.1]).

## [4.14.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.13.0 ~> 5.14.0], `@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [4.13.2] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.12.1 ~> 5.13.0], `@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [4.13.1] - 2023-12-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.12.0 ~> 5.12.1]).

## [4.13.0] - 2023-12-05

### Changed

- Deprecated some values of `interaction` property.

## [4.12.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.13.0 ~> 4.14.0], `@semcore/core` [2.10.0 ~> 2.11.0]).

## [4.11.0] - 2023-11-24

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.10.3 ~> 4.13.0], `@semcore/core` [2.9.2 ~> 2.10.0]).

## [4.10.3] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3], `@semcore/core` [2.9.1 ~> 2.9.2]).

## [4.10.2] - 2023-11-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.9.1 ~> 5.9.2]).

## [4.10.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2], `@semcore/core` [2.9.0 ~> 2.9.1]).

## [4.10.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [4.9.0] - 2023-10-27

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.8.4 ~> 4.9.0], `@semcore/core` [2.7.7 ~> 2.8.0]).

## [4.8.4] - 2023-10-25

### Changed

- Prevent `Tab` keypress for opened dropdown with non-focusable content.

## [4.8.3] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.7.7 ~> 5.7.8], `@semcore/utils` [4.8.3 ~> 4.8.4], `@semcore/core` [2.7.6 ~> 2.7.7]).

## [4.8.2] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.7.6 ~> 5.7.7], `@semcore/utils` [4.8.2 ~> 4.8.3], `@semcore/core` [2.7.5 ~> 2.7.6]).

## [4.8.1] - 2023-10-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.7.5 ~> 5.8.0], `@semcore/popper` [5.7.5 ~> 5.7.6]).

## [4.8.0] - 2023-10-09

### Added

- `nl` locale support.

## [4.7.5] - 2023-10-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.1 ~> 4.8.2], `@semcore/core` [2.7.4 ~> 2.7.5]).

## [4.7.4] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1], `@semcore/core` [2.7.3 ~> 2.7.4]).

## [4.7.3] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [4.7.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.7.1 ~> 2.7.2]).

## [4.7.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1], `@semcore/core` [2.7.0 ~> 2.7.1]).

## [4.7.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.6.3 ~> 4.7.0], `@semcore/core` [2.6.3 ~> 2.7.0]).

## [4.6.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.2 ~> 2.6.3]).

## [4.6.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2], `@semcore/core` [2.6.1 ~> 2.6.2]).

## [4.6.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.0 ~> 2.6.1]).

## [4.6.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.5.0 ~> 2.6.0]).

## [4.5.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [4.4.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [4.4.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.3.1 ~> 4.4.0], `@semcore/core` [2.3.1 ~> 2.4.0]).

## [4.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [4.3.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [4.2.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [4.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [4.1.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [4.0.1] - 2023-07-18

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.0.0 ~> 5.0.1]).

## [4.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [3.6.4] - 2023-06-30

## [3.6.3] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [3.6.2] - 2023-06-22

## [3.6.1] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4]).

## [3.6.0] - 2023-06-12

### Added

- Swedish (`sv`) locale support.

## [3.5.2] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [3.5.1] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2]).

## [3.5.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [3.4.35] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.17 ~> 4.19.0], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [3.4.34] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [3.4.33] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [3.4.32] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [3.4.31] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [3.4.30] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.10 ~> 4.17.11]).

## [3.4.29] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [3.4.28] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [3.4.25] - 2023-05-02

### Changed

- Removed `aria-flowto` because it has bad screen readers support and often confuse users in supporting screen readers.

## [3.4.24] - 2023-04-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [3.4.21] - 2023-03-28

### Added

- Added default color (`--intergalactic-text-primary`) to the component.

## [3.4.20] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0]).

## [3.4.16] - 2023-03-23

### Fixed

- `aria-controls` and `aria-expanded` HTML attributes wasn't applied on closed dropdown.

## [3.4.15] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.3 ~> 3.47.4]).

## [3.4.12] - 2023-03-06

### Fixed

- Fixed the ability to move text to the next line with the Enter key in `Textarea`.

## [3.4.11] - 2023-03-01

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.16.3 ~> 4.16.4]).

## [3.4.10] - 2023-02-22

## [3.4.9] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [3.4.7] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

## [3.4.6] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.4.3] - 2023-01-10

## [3.4.2] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.1.2] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.31 ~> 4.12.0]).

## [3.1.0] - 2022-09-07

### Added

- Screen readers support.

## [3.0.11] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Removed deprecated prop `popperStretch`.

## [2.3.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [2.3.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.0] - 2021-06-10

### Added

- Support keydown `Enter` and `Space` for open Popper.
- Logic checked interactive trigger from `DropdownMenu`.

## [2.2.2] - 2021-06-08

### Fixed

- Fix TS type

## [2.2.1] - 2021-05-07

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.8] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.7] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.0.6] - 2020-09-30

### Fixed

- Add missing TS type properties in context

## [2.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.4] - 2020-07-22

### Fixed

- Исправли проблему неправильного позиционирование `Dropdown.Popper` относительно триггера с заданным значением
`stretch` для `Dropdown` .

## [2.0.3] - 2020-07-06

### Changed

- Обновлена версия зависимости `@semcore/popper`

## [2.0.2] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.1] - 2020-06-08

### Fixed

- Исправлена типизация `IDropdownContext`

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

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

## [1.2.4] - 2019-12-02

### Fixed

- Добавлен `white-space: normal;` так как он может наследоваться в случаях отключения рендера в портал(`disablePortal`)
- Убрано скрытие Popper, когда его Trigger выходит из viewbox

## [1.2.3] - 2019-11-14

### Fixed

- Добавлен проброс `onOutsideClick` и `modifiers`

## [1.2.2] - 2019-10-10

### Changed

- Обнавлены зависимости `popper`/`flex-box`/`utils`
- Исправлен дефолтный триггер

## [1.2.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.2.0] - 2019-05-13

### Added

- Добавленно свойство `popperStretch` отвечающие за размер всплывающего окна
- Компонент `Popper` унаследован от `Box`

## [1.1.3] - 2019-04-12

### Fixed

- Скрываем всплывающее окно, если триггер вышел за `viewport`

## [1.1.2] - 2019-04-09

### Added

- Добавлен тип `IDropdownPopperProps`

## [1.1.1] - 2019-01-02

### Added

- Экспорт `PortalProvider`

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.0] - 2018-11-07

### Added

- возможность использовать рендер функцию в `Dropdown.Popper`

## [1.0.0-3] - 2018-10-11

### BREAK

- версию пакета `@semcore/popper`

## [1.0.0-2] - 2018-09-27

### Changed

- версию пакета `@semcore/utils`

## [1.0.0-1] - 2018-09-27

### Added

- Initial release
