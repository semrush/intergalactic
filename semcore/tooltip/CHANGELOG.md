# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.0.0] - 2026-03-27

### BREAK

- **ellipsis**: New major version. Deprecated `Tooltip.Hint`.

## [16.0.11] - 2025-10-30

### Fixed

- The tooltip popper content is not announced by screen readers in Chrome.

## [16.0.10] - 2025-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.9 ~> 16.0.10], `@semcore/popper` [16.0.9 ~> 16.0.10], `@semcore/portal` [16.0.9 ~> 16.0.10], `@semcore/base-components` [16.2.3 ~> 16.4.0]).

## [16.0.9] - 2025-09-17

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.8 ~> 16.0.9], `@semcore/popper` [16.0.8 ~> 16.0.9], `@semcore/portal` [16.0.8 ~> 16.0.9], `@semcore/base-components` [16.2.2 ~> 16.2.3]).

## [16.0.8] - 2025-09-05

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.7 ~> 16.0.8], `@semcore/popper` [16.0.7 ~> 16.0.8], `@semcore/portal` [16.0.7 ~> 16.0.8], `@semcore/base-components` [16.2.1 ~> 16.2.2]).

## [16.0.7] - 2025-08-29

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.6 ~> 16.0.7], `@semcore/popper` [16.0.6 ~> 16.0.7], `@semcore/portal` [16.0.6 ~> 16.0.7], `@semcore/base-components` [16.2.0 ~> 16.2.1]).

## [16.0.6] - 2025-08-07

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.5 ~> 16.0.6], `@semcore/popper` [16.0.5 ~> 16.0.6], `@semcore/portal` [16.0.5 ~> 16.0.6], `@semcore/base-components` [16.1.2 ~> 16.2.0]).

## [16.0.5] - 2025-07-28

### Fixed

- Error with `CREATE_COMPONENT` symbol and different core versions for Popper and Tooltip packages.

## [16.0.4] - 2025-06-23

### Fixed

- Page layout appeared shifted due to width/height changes.

## [16.0.3] - 2025-06-23

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.2 ~> 16.0.3], `@semcore/popper` [16.0.2 ~> 16.0.3], `@semcore/portal` [16.0.2 ~> 16.0.3], `@semcore/base-components` [16.0.2 ~> 16.1.0]).

## [16.0.2] - 2025-06-16

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.1 ~> 16.0.2], `@semcore/popper` [16.0.1 ~> 16.0.2], `@semcore/portal` [16.0.1 ~> 16.0.2], `@semcore/base-components` [16.0.1 ~> 16.0.2]).

## [16.0.1] - 2025-05-30

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [16.0.0 ~> 16.0.1], `@semcore/popper` [16.0.0 ~> 16.0.1], `@semcore/portal` [16.0.0 ~> 16.0.1], `@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.0.0] - 2025-05-19

### Break

- Render the tooltip container only when the tooltip is visible, for better performance. The content is rendered with a small timeout, to ensure correct announcement by the screen reader.

## [6.49.4] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5], `@semcore/flex-box` [5.41.3 ~> 5.41.4], `@semcore/popper` [5.46.3 ~> 5.46.4], `@semcore/portal` [3.41.3 ~> 3.41.4], `@semcore/core` [2.39.3 ~> 2.39.4]).

## [6.49.3] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/flex-box` [5.41.2 ~> 5.41.3], `@semcore/popper` [5.46.2 ~> 5.46.3], `@semcore/portal` [3.41.2 ~> 3.41.3], `@semcore/core` [2.39.2 ~> 2.39.3]).

## [6.49.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2], `@semcore/flex-box` [5.41.1 ~> 5.41.2], `@semcore/popper` [5.46.1 ~> 5.46.2], `@semcore/portal` [3.41.1 ~> 3.41.2], `@semcore/core` [2.39.1 ~> 2.39.2]).

## [6.49.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/flex-box` [5.41.0 ~> 5.41.1], `@semcore/popper` [5.46.0 ~> 5.46.1], `@semcore/portal` [3.41.0 ~> 3.41.1], `@semcore/core` [2.39.0 ~> 2.39.1]).

## [6.49.0] - 2025-03-14

### Added

- Build for ESM.

## [6.48.0] - 2025-02-21

### Added

- Build for ESM.

## [6.47.3] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/popper` [5.45.2 ~> 5.45.3], `@semcore/portal` [3.40.0 ~> 3.40.1], `@semcore/core` [2.38.0 ~> 2.38.1]).

## [6.47.2] - 2025-02-03

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.44.1 ~> 4.45.0], `@semcore/flex-box` [5.39.1 ~> 5.40.0], `@semcore/popper` [5.45.1 ~> 5.45.2], `@semcore/portal` [3.39.1 ~> 3.40.0], `@semcore/core` [2.37.1 ~> 2.38.0]).

## [6.47.1] - 2024-12-16

### Changed

- `aria-haspopup` on trigger can be set from props.

## [6.47.0] - 2024-11-29

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.43.3 ~> 4.44.0], `@semcore/flex-box` [5.38.2 ~> 5.39.0], `@semcore/popper` [5.44.2 ~> 5.45.0], `@semcore/portal` [3.38.2 ~> 3.39.0], `@semcore/core` [2.36.2 ~> 2.37.0]).

## [6.46.3] - 2024-11-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.2 ~> 4.43.3], `@semcore/flex-box` [5.38.1 ~> 5.38.2], `@semcore/popper` [5.44.1 ~> 5.44.2], `@semcore/portal` [3.38.1 ~> 3.38.2], `@semcore/core` [2.36.1 ~> 2.36.2]).

## [6.46.2] - 2024-11-06

### Added

- `max-content` width for Tooltip by default.

## [6.46.1] - 2024-11-04

### Added

- `role=status` to TooltipPopper Wrapper.

## [6.46.0] - 2024-11-01

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.42.0 ~> 4.43.0], `@semcore/flex-box` [5.37.0 ~> 5.38.0], `@semcore/popper` [5.43.1 ~> 5.44.0], `@semcore/portal` [3.37.0 ~> 3.38.0], `@semcore/core` [2.35.0 ~> 2.36.0]).

## [6.45.1] - 2024-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/flex-box` [5.36.0 ~> 5.37.0], `@semcore/popper` [5.43.0 ~> 5.43.1], `@semcore/portal` [3.36.0 ~> 3.37.0], `@semcore/core` [2.34.0 ~> 2.35.0]).

## [6.45.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.39.0 ~> 4.41.0], `@semcore/flex-box` [5.35.0 ~> 5.36.0], `@semcore/popper` [5.42.0 ~> 5.43.0], `@semcore/portal` [3.35.0 ~> 3.36.0], `@semcore/core` [2.33.0 ~> 2.34.0]).

## [6.44.0] - 2024-10-11

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/flex-box` [5.34.0 ~> 5.35.0], `@semcore/popper` [5.41.0 ~> 5.42.0], `@semcore/portal` [3.34.0 ~> 3.35.0], `@semcore/core` [2.32.0 ~> 2.33.0]).

## [6.43.0] - 2024-10-04

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.36.2 ~> 4.38.0], `@semcore/flex-box` [5.33.1 ~> 5.34.0], `@semcore/popper` [5.40.1 ~> 5.41.0], `@semcore/portal` [3.33.1 ~> 3.34.0], `@semcore/core` [2.31.1 ~> 2.32.0]).

## [6.42.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/flex-box` [5.33.0 ~> 5.33.1], `@semcore/popper` [5.40.0 ~> 5.40.1], `@semcore/portal` [3.33.0 ~> 3.33.1], `@semcore/core` [2.31.0 ~> 2.31.1]).

## [6.42.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.35.0 ~> 4.36.0], `@semcore/flex-box` [5.32.0 ~> 5.33.0], `@semcore/popper` [5.39.5 ~> 5.40.0], `@semcore/portal` [3.32.0 ~> 3.33.0], `@semcore/core` [2.30.0 ~> 2.31.0]).

## [6.41.0] - 2024-08-21

### Fixed

- In some rare cases, tooltip wasn't appearing.

## [6.40.4] - 2024-08-20

### Fixed

- Loosing focus in Description.Tooltip.
- Enforce role `button` to DescriptionTooltip trigger.

## [6.40.3] - 2024-08-08

### Fixed

- `z-index` was too high (default value changed 1500 -> 800).

## [6.40.2] - 2024-08-02

### Changed

- Runtime check of required label in `DescriptionTooltip` popper moved to `Popper` component.

## [6.40.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.0 ~> 4.32.1], `@semcore/flex-box` [5.31.0 ~> 5.31.1], `@semcore/popper` [5.39.0 ~> 5.39.1], `@semcore/portal` [3.31.0 ~> 3.31.1], `@semcore/core` [2.29.0 ~> 2.29.1]).

## [6.40.0] - 2024-07-17

### Changed

- Enabled `z-index` stacking.

## [6.39.1] - 2024-07-19

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.38.0 ~> 5.38.1]).

## [6.39.0] - 2024-07-17

### Added

- `aria-controls` to `DescriptionTooltip.Trigger`.

## [6.38.0] - 2024-07-16

### Added

- `arrowBgColor` and `arrowShadowColor` properties for Tooltip.Popper.

## [6.37.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.30.0 ~> 4.31.0], `@semcore/flex-box` [5.29.0 ~> 5.30.0], `@semcore/popper` [5.37.1 ~> 5.38.0], `@semcore/portal` [3.29.0 ~> 3.30.0], `@semcore/core` [2.27.0 ~> 2.28.0]).

## [6.36.1] - 2024-07-05

### Fixed

- `max-width` size in line with figma design.

## [6.36.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.29.0 ~> 4.30.0], `@semcore/flex-box` [5.28.0 ~> 5.29.0], `@semcore/popper` [5.36.1 ~> 5.37.0], `@semcore/portal` [3.28.0 ~> 3.29.0], `@semcore/core` [2.26.0 ~> 2.27.0]).

## [6.35.1] - 2024-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.36.0 ~> 5.36.1]).

## [6.35.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.28.2 ~> 4.29.0], `@semcore/flex-box` [5.27.2 ~> 5.28.0], `@semcore/popper` [5.35.7 ~> 5.36.0], `@semcore/portal` [3.27.2 ~> 3.28.0], `@semcore/core` [2.25.2 ~> 2.26.0]).

## [6.34.4] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.1 ~> 4.28.2], `@semcore/flex-box` [5.27.1 ~> 5.27.2], `@semcore/popper` [5.35.6 ~> 5.35.7], `@semcore/portal` [3.27.1 ~> 3.27.2], `@semcore/core` [2.25.1 ~> 2.25.2]).

## [6.34.3] - 2024-05-31

### Fixed

- Merging tooltip with Button component was breaking the button styles.
- Removed `aria-haspopup` and `role` from triggers of `Hint` and `Tooltip`.
- Removed `interaction` property from types of `Hint`.
- Removed warning theme from types of `Hint`.

### Changed

- `aria-haspopup` of `DescriptionTooltip` changed to `dialog`.

## [6.34.2] - 2024-06-04

### Fixed

- `DescriptionTooltip` default children.

## [6.34.1] - 2024-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.4 ~> 5.35.5]).

## [6.34.0] - 2024-05-28

### Fixed

- `Tooltip` (`DescriptionTooltip` and `Hint` as well) with click interactions wasn't opening by keyboard interaction if trigger was not a button or icon.

## [6.33.3] - 2024-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.2 ~> 5.35.3]).

## [6.33.2] - 2024-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.1 ~> 5.35.2]).

## [6.33.1] - 2024-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.35.0 ~> 5.35.1]).

## [6.33.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.27.0 ~> 4.28.0], `@semcore/flex-box` [5.26.0 ~> 5.27.0], `@semcore/popper` [5.34.0 ~> 5.35.0], `@semcore/portal` [3.26.0 ~> 3.27.0], `@semcore/core` [2.24.0 ~> 2.25.0]).

## [6.32.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.26.2 ~> 4.27.0], `@semcore/flex-box` [5.25.1 ~> 5.26.0], `@semcore/popper` [5.33.1 ~> 5.34.0], `@semcore/portal` [3.25.1 ~> 3.26.0], `@semcore/core` [2.23.1 ~> 2.24.0]).

## [6.31.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2], `@semcore/flex-box` [5.25.0 ~> 5.25.1], `@semcore/popper` [5.33.0 ~> 5.33.1], `@semcore/portal` [3.25.0 ~> 3.25.1], `@semcore/core` [2.23.0 ~> 2.23.1]).

## [6.31.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1], `@semcore/flex-box` [5.24.0 ~> 5.25.0], `@semcore/popper` [5.32.0 ~> 5.33.0], `@semcore/portal` [3.24.0 ~> 3.25.0], `@semcore/core` [2.22.0 ~> 2.23.0]).

## [6.30.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.31.0 ~> 5.32.0]).

## [6.29.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/popper` [5.29.0 ~> 5.30.0]).

## [6.27.0] - 2024-04-22

### Changed

- Renamed types `HintProps` to `TooltipHintProps` and `HintPopperProps` to `TooltipHintPopperProps`. Old names are preserved and deprecated.

## [6.26.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.1 ~> 4.23.2], `@semcore/flex-box` [5.22.1 ~> 5.22.2], `@semcore/popper` [5.27.1 ~> 5.28.0], `@semcore/portal` [3.22.1 ~> 3.22.2], `@semcore/core` [2.20.1 ~> 2.20.2]).

## [6.26.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.0 ~> 4.23.1], `@semcore/flex-box` [5.22.0 ~> 5.22.1], `@semcore/popper` [5.27.0 ~> 5.27.1], `@semcore/portal` [3.22.0 ~> 3.22.1], `@semcore/core` [2.20.0 ~> 2.20.1]).

## [6.26.0] - 2024-04-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.22.2 ~> 4.23.0], `@semcore/flex-box` [5.21.2 ~> 5.22.0], `@semcore/popper` [5.26.3 ~> 5.27.0], `@semcore/portal` [3.21.2 ~> 3.22.0], `@semcore/core` [2.19.2 ~> 2.20.0]).

## [6.25.4] - 2024-04-12

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.26.2 ~> 5.26.3]).

## [6.25.3] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2], `@semcore/flex-box` [5.21.1 ~> 5.21.2], `@semcore/popper` [5.26.1 ~> 5.26.2], `@semcore/portal` [3.21.1 ~> 3.21.2], `@semcore/core` [2.19.1 ~> 2.19.2]).

## [6.25.2] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.0 ~> 4.22.1], `@semcore/flex-box` [5.21.0 ~> 5.21.1], `@semcore/popper` [5.25.0 ~> 5.26.1], `@semcore/portal` [3.21.0 ~> 3.21.1], `@semcore/core` [2.19.0 ~> 2.19.1]).

## [6.25.1] - 2024-03-27

### Fixed

- Added missing portal component dependency.

## [6.25.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0], `@semcore/flex-box` [5.20.1 ~> 5.21.0], `@semcore/popper` [5.24.0 ~> 5.25.0], `@semcore/core` [2.18.1 ~> 2.19.0]).

## [6.24.2] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.21.0 ~> 4.21.1], `@semcore/flex-box` [5.20.0 ~> 5.20.1], `@semcore/popper` [5.23.0 ~> 5.24.0], `@semcore/core` [2.18.0 ~> 2.18.1]).

## [6.24.1] - 2024-03-21

### Fixed

- Error about `zIndex` in DOM element.

## [6.24.0] - 2024-03-19

### Removed

- `undefined` role from `Tooltip.Trigger`.

## [6.23.1] - 2024-03-19

### Fixed

- Removed `aria-live` from trigger and added it to popper.

## [6.23.0] - 2024-03-07

### Added

- Alongside `Tooltip` component, `Hint` and `InformationDropdown` components were added to better handle A11Y specific cases.

### Fixed

- Tooltips `z-index` was lower than `z-index` of all other floating elements..

## [6.22.0] - 2024-03-07

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.20.5 ~> 5.21.0]).

## [6.21.1] - 2024-03-07

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.20.4 ~> 5.20.5]).

## [6.21.0] - 2024-03-05

### Fixed

- VoiceOver was not reading the tooltip content in Safari.

### Changed

- `aria-live` container that announces the tooltip content was moved from tooltip inner container with `display: contents` to tooltip popper wrapper.

## [6.20.3] - 2024-03-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.3 ~> 4.20.4], `@semcore/flex-box` [5.19.2 ~> 5.19.3], `@semcore/popper` [5.20.2 ~> 5.20.3], `@semcore/core` [2.17.3 ~> 2.17.4]).

## [6.20.2] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3], `@semcore/flex-box` [5.19.1 ~> 5.19.2], `@semcore/popper` [5.20.1 ~> 5.20.2], `@semcore/core` [2.17.2 ~> 2.17.3]).

## [6.20.1] - 2024-02-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.20.0 ~> 5.20.1]).

## [6.20.0] - 2023-02-13

### Fixed

- Some assistive technologies were reading tooltip popper content twice.

### Added

- Tooltip trigger children render function got `popperId` param that allows to apply `aria-describedby` on specific children of tooltip trigger.

## [6.19.0] - 2023-02-07

### Changed

- Disabled focus looping when focusable elements exist in tooltip.

## [6.18.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.0 ~> 4.20.1], `@semcore/flex-box` [5.18.0 ~> 5.19.0], `@semcore/popper` [5.19.0 ~> 5.19.1], `@semcore/core` [2.17.0 ~> 2.17.1]).

## [6.18.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0], `@semcore/flex-box` [5.17.1 ~> 5.18.0], `@semcore/popper` [5.18.1 ~> 5.19.0], `@semcore/core` [2.16.1 ~> 2.17.0]).

## [6.17.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1], `@semcore/flex-box` [5.17.0 ~> 5.17.1], `@semcore/popper` [5.18.0 ~> 5.18.1], `@semcore/core` [2.16.0 ~> 2.16.1]).

## [6.17.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0], `@semcore/flex-box` [5.16.0 ~> 5.17.0], `@semcore/popper` [5.17.0 ~> 5.18.0], `@semcore/core` [2.15.0 ~> 2.16.0]).

## [6.16.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0], `@semcore/flex-box` [5.15.0 ~> 5.16.0], `@semcore/popper` [5.16.0 ~> 5.17.0], `@semcore/core` [2.14.0 ~> 2.15.0]).

## [6.15.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/flex-box` [5.14.1 ~> 5.15.0], `@semcore/popper` [5.15.0 ~> 5.16.0], `@semcore/core` [2.13.1 ~> 2.14.0]).

## [6.14.0] - 2024-01-12

### Changed

- Version preminor update due to children dependencies update (`@semcore/popper` [5.14.2 ~> 5.15.0]).

## [6.13.2] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.16.0 ~> 4.16.2], `@semcore/flex-box` [5.14.0 ~> 5.14.1], `@semcore/popper` [5.14.1 ~> 5.14.2], `@semcore/core` [2.13.0 ~> 2.13.1]).

## [6.13.1] - 2023-12-26

### Fixed

- `aria-haspopup` for `disabled` tooltips.

## [6.13.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/flex-box` [5.13.1 ~> 5.14.0], `@semcore/popper` [5.13.0 ~> 5.14.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [6.13.0-prerelease.10] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/flex-box` [5.13.1 ~> 5.14.0], `@semcore/popper` [5.13.0 ~> 5.14.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [6.12.2] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/flex-box` [5.13.0 ~> 5.13.1], `@semcore/popper` [5.12.1 ~> 5.13.0], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [6.12.1] - 2023-12-07

### Fixed

- Incorrect behavior in Tooltip when it has a focusable elements inside themself and don't close from the first `esc` keypress.

## [6.12.0] - 2023-11-29

### Changed

- Deprecated `interaction` property.

## [6.11.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.13.0 ~> 4.14.0], `@semcore/flex-box` [5.11.0 ~> 5.12.0], `@semcore/popper` [5.10.0 ~> 5.11.0], `@semcore/core` [2.10.0 ~> 2.11.0]).

## [6.10.4] - 2023-11-24

### Fixed

- `aria-describedby` instead of `aria-labelledby`.
- Working that `aria` property in uncontrolled mode.

## [6.10.3] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3], `@semcore/flex-box` [5.10.1 ~> 5.10.2], `@semcore/popper` [5.9.2 ~> 5.9.3], `@semcore/core` [2.9.1 ~> 2.9.2]).

## [6.10.2] - 2023-11-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.9.1 ~> 5.9.2]).

## [6.10.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2], `@semcore/flex-box` [5.10.0 ~> 5.10.1], `@semcore/popper` [5.9.0 ~> 5.9.1], `@semcore/core` [2.9.0 ~> 2.9.1]).

## [6.10.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/flex-box` [5.9.0 ~> 5.10.0], `@semcore/popper` [5.8.0 ~> 5.9.0], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [6.9.0] - 2023-10-26

### Added

- Design tokens resolving for `theme` prop.

## [6.8.8] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.3 ~> 4.8.4], `@semcore/flex-box` [5.8.1 ~> 5.8.2], `@semcore/popper` [5.7.7 ~> 5.7.8], `@semcore/core` [2.7.6 ~> 2.7.7]).

## [6.8.7] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.2 ~> 4.8.3], `@semcore/flex-box` [5.8.0 ~> 5.8.1], `@semcore/popper` [5.7.6 ~> 5.7.7], `@semcore/core` [2.7.5 ~> 2.7.6]).

## [6.8.6] - 2023-10-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.7.5 ~> 5.8.0], `@semcore/popper` [5.7.5 ~> 5.7.6]).

## [6.8.5] - 2023-10-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.1 ~> 4.8.2], `@semcore/flex-box` [5.7.4 ~> 5.7.5], `@semcore/popper` [5.7.4 ~> 5.7.5], `@semcore/core` [2.7.4 ~> 2.7.5]).

## [6.8.4] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1], `@semcore/flex-box` [5.7.3 ~> 5.7.4], `@semcore/popper` [5.7.3 ~> 5.7.4], `@semcore/core` [2.7.3 ~> 2.7.4]).

## [6.8.3] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/flex-box` [5.7.2 ~> 5.7.3], `@semcore/popper` [5.7.2 ~> 5.7.3], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [6.8.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.7.1 ~> 5.7.2], `@semcore/popper` [5.7.1 ~> 5.7.2], `@semcore/core` [2.7.1 ~> 2.7.2]).

## [6.8.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1], `@semcore/flex-box` [5.7.0 ~> 5.7.1], `@semcore/popper` [5.7.0 ~> 5.7.1], `@semcore/core` [2.7.0 ~> 2.7.1]).

## [6.8.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.6.3 ~> 4.7.0], `@semcore/flex-box` [5.6.3 ~> 5.7.0], `@semcore/popper` [5.6.3 ~> 5.7.0], `@semcore/core` [2.6.3 ~> 2.7.0]).

## [6.7.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.6.2 ~> 5.6.3], `@semcore/popper` [5.6.2 ~> 5.6.3], `@semcore/core` [2.6.2 ~> 2.6.3]).

## [6.7.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2], `@semcore/flex-box` [5.6.1 ~> 5.6.2], `@semcore/popper` [5.6.1 ~> 5.6.2], `@semcore/core` [2.6.1 ~> 2.6.2]).

## [6.7.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.6.0 ~> 5.6.1], `@semcore/popper` [5.6.0 ~> 5.6.1], `@semcore/core` [2.6.0 ~> 2.6.1]).

## [6.7.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/flex-box` [5.5.0 ~> 5.6.0], `@semcore/popper` [5.5.0 ~> 5.6.0], `@semcore/core` [2.5.0 ~> 2.6.0]).

## [6.6.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/flex-box` [5.4.1 ~> 5.5.0], `@semcore/popper` [5.4.1 ~> 5.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [6.5.0] - 2023-08-24

### Added

- Internal API for enforcing component advanced mode.

## [6.4.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/flex-box` [5.4.0 ~> 5.4.1], `@semcore/popper` [5.4.0 ~> 5.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [6.4.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.3.1 ~> 4.4.0], `@semcore/flex-box` [5.3.1 ~> 5.4.0], `@semcore/popper` [5.3.1 ~> 5.4.0], `@semcore/core` [2.3.1 ~> 2.4.0]).

## [6.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/flex-box` [5.3.0 ~> 5.3.1], `@semcore/popper` [5.3.0 ~> 5.3.1], `@semcore/core` [2.3.0 ~> 2.3.1]).

## [6.3.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/flex-box` [5.2.1 ~> 5.3.0], `@semcore/popper` [5.2.2 ~> 5.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [6.2.2] - 2023-08-18

### Changed

- Version prepatch update due to children dependencies update (`@semcore/popper` [5.2.1 ~> 5.2.2]).

## [6.2.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/popper` [5.2.0 ~> 5.2.1], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [6.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0], `@semcore/flex-box` [5.1.0 ~> 5.2.0], `@semcore/popper` [5.1.0 ~> 5.2.0]).

## [6.1.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0], `@semcore/popper` [5.0.2 ~> 5.1.0]).

## [6.0.2] - 2023-07-24

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [5.0.1 ~> 5.0.2]).

## [6.0.1] - 2023-07-17

### Change

- Removed ScreenReaderOnly block for tooltips with `interaction=hover`.

## [6.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [5.4.26] - 2023-06-30

## [5.4.25] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0], `@semcore/flex-box` [4.7.31 ~> 4.7.32], `@semcore/popper` [4.19.4 ~> 4.19.5]).

## [5.4.24] - 2023-06-22

## [5.4.23] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4], `@semcore/flex-box` [4.7.30 ~> 4.7.31], `@semcore/popper` [4.19.2 ~> 4.19.3]).

## [5.4.22] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3], `@semcore/flex-box` [4.7.29 ~> 4.7.30], `@semcore/popper` [4.19.1 ~> 4.19.2]).

## [5.4.21] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2], `@semcore/flex-box` [4.7.28 ~> 4.7.29], `@semcore/popper` [4.19.0 ~> 4.19.1]).

## [5.4.20] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1], `@semcore/flex-box` [4.7.27 ~> 4.7.28], `@semcore/popper` [4.17.17 ~> 4.19.0]).

## [5.4.19] - 2023-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.16 ~> 4.17.17]).

## [5.4.18] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0], `@semcore/flex-box` [4.7.26 ~> 4.7.27], `@semcore/popper` [4.17.15 ~> 4.17.16]).

## [5.4.17] - 2023-05-29

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.14 ~> 4.17.15]).

## [5.4.16] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0], `@semcore/flex-box` [4.7.25 ~> 4.7.26], `@semcore/popper` [4.17.13 ~> 4.17.14]).

## [5.4.15] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1], `@semcore/flex-box` [4.7.24 ~> 4.7.25], `@semcore/popper` [4.17.12 ~> 4.17.13]).

## [5.4.14] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0], `@semcore/flex-box` [4.7.23 ~> 4.7.24], `@semcore/popper` [4.17.11 ~> 4.17.12]).

## [5.4.13] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.17.10 ~> 4.17.11]).

## [5.4.12] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/flex-box` [4.7.22 ~> 4.7.23], `@semcore/popper` [4.17.9 ~> 4.17.10]).

## [5.4.11] - 2023-05-11

## [5.4.10] - 2023-05-10

### Fixed

- Screen reader tooltip content updates correctly on change

### Changed

- Changed content layout for screen reader. Now it's in `Tooltip.Popper`

## [5.4.9] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/flex-box` [4.7.21 ~> 4.7.22], `@semcore/popper` [4.17.7 ~> 4.17.8]).

## [5.4.2] - 2023-04-11

### Fixed

- Turn `aria-haspopup` to `false` for Tooltip with `hover=interaction`.

## [5.4.1] - 2023-04-03

### Changed

- Tooltip with `hover=interaction` content is duplicated into screen-reader-only block.

## [5.3.24] - 2023-03-28

### Fixed

- Fixed tooltip border color for default theme.

## [5.3.23] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/flex-box` [4.7.17 ~> 4.7.18], `@semcore/popper` [4.16.11 ~> 4.16.12]).

## [5.3.15] - 2023-03-09

### Fixed

- Fixed tooltip borders color.

## [5.3.14] - 2023-03-01

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.16.3 ~> 4.16.4]).

## [5.3.12] - 2023-02-22

## [5.3.11] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1], `@semcore/flex-box` [4.7.9 ~> 4.7.10], `@semcore/popper` [4.16.0 ~> 4.16.1]).

## [5.3.9] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

## [5.3.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7], `@semcore/popper` [4.15.1 ~> 4.15.2]).

## [5.3.5] - 2023-01-10

## [5.3.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/popper` [4.14.3 ~> 4.14.4]).

## [5.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [5.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [5.2.0] - 2022-11-30

### Changed

- Updated border-color for `warning` theme from `--red-400` to `--red-500`.

## [5.1.5] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4], `@semcore/popper` [4.13.4 ~> 4.13.5]).

## [5.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [5.0.16] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.31 ~> 4.12.0]).

## [5.0.13] - 2022-08-30

### Added

- Added `aria-live` attribute for better A11Y.

## [5.0.12] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/popper` [4.11.28 ~> 4.11.29]).

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Removed ability to pass custom color to "theme" property.
- Remove named import "Tooltip".

## [4.3.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/popper` [4.11.16 ~> 4.11.17]).

## [4.3.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.3.3] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `Tooltip`.

## [4.3.2] - 2022-01-18

### Changed

- Removed unused dependency `@semcore/icon`.

## [4.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.3.0] - 2021-05-11

### Changed

- Rewrite code from TS to JS 🧑‍💻

## [4.2.0] - 2021-04-30

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.1.1] - 2021-04-28

### Added

- Added role `tooltip`

## [4.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.0.9] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.0.8] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [4.0.7] - 2020-09-30

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.6] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.5] - 2020-07-06

### Changed

- Обновлена зависимость `@semcore/popper` для корректного отображения "галочки" `Tooltip`'а

## [4.0.4] - 2020-06-10

### Fixed

- Исправлены TS типы

## [4.0.3] - 2020-06-08

### Fixed

- Исправлена типизация `ITooltipContext`

## [4.0.2] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.4.3] - 2019-12-26

### Fixed

- Получение DOM-ноды через `ref` для всех компоненетов

## [3.4.2] - 2019-12-20

### Fixed

- Добавлен `font-weight: normal`. Теперь `font-weight` не наследуется при отключенном рендере в портал.

## [3.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (`build.css`)

## [3.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через CSS переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

### Fixed

- Исправлено перемещение тултипа если он не влизает в нужном месте

## [3.2.1] - 2019-09-31

### Changed

- Обновлена зависимость `Popper`
- Добавлено дефолтное свойство `inline` для обертки триггера

## [3.1.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.1.1] - 2019-09-27

### Fixed

- Добавлен `white-space: normal;` для случаев когда у родителя `nowrap`

## [3.1.0] - 2019-09-13

### Added

- Добавлены пользовательские темы для тултипа, теперь в свойство `theme` можно передать свой цвет

## [3.0.5] - 2019-09-05

### Changed

- Заменены устаревшие типографические переменные

## [3.0.4] - 2019-07-31

### Fixed

- Добавлены ts типы `PopperTrigger` для `TooltipBase`
- Исправлена сборка для рендера CSS на сервере

## [3.0.3] - 2019-06-25

### Fixed

- Поведение на `onOutsideClick` теперь можно отключить, сделав `return false`

## [3.0.2] - 2019-06-25

### Fixed

- Исправлено поведение `onOutsideClick`

### Changed

- Обновлена версия `@semcore/popper`

## [3.0.1] - 2019-06-13

### Fixed

- Исправлены типы TS для `title`, так как `title` является стандартным свойством dom

## [3.0.0] - 2019-06-06

### BREAK

- Изменено поведение `TooltipBase`, теперь он добавляет обертку (div) вокруг trigger'a
- При дефолтном импорте, пользовательские `props` теперь прокидываются на trigger, а не на popper

## [2.2.0] - 2019-05-15

### Added

- Добавлена возможность указывать `theme` у базового тултипа(именованный экспорт)

## [2.1.0] - 2019-05-13

### Added

- Добавлен `line-height` в `Popper`
- `Popper` унаследован от `Box`

## [2.0.2] - 2019-04-16

### Fixed

- Добавлен `max-width: 250px;` и `word-wrap: break-word;`

## [2.0.1] - 2019-04-11

### Fixed

- Добавлен размер текста по умолчанию(12px)
- Скрываем всплывающее окно, если триггер вышел за `viewport`

## [2.0.0] - 2019-01-17

### Added

- `Tooltip.Popper`, свойство `closeIcon`
- `Tooltip.Popper`, свойство `theme`
- Темы `warning`, `invert`
- Добавлен автокомплит для IDE

### Changed

- Фон тултипа изменен на белый
- Текст тултипа изменен на `--gray20`

### Fixed

- Добавлен border-radius для `Tooltip.Popper`

## [1.0.0] - 2018-12-09

### Added

- Initial release
