# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.1.1] - 2025-07-04

### Changed

- Version patch update due to children dependencies update (`@semcore/core` [16.0.1 ~> 16.0.3]).

## [16.1.0] - 2025-06-20

### Added

- New properties - `shadowSize` and `shadowTheme` for customize Shadows.

## [16.0.2] - 2025-06-12

### Added

- ResizeObserver for the `Wrapper` component in the `ScrollArea`.

### Changed

- `keyboardFocus` to `focus` event for popper triggers with `hover` interaction.

## [16.0.1] - 2025-05-26

### Fixed

- `Delay` doesn't work for the `Collapse` component.

## [16.0.0] - 2025-05-19

### Added

- Package with base components.
- `outline` for all Box'es with `:focus-visible`.
- `topOffset` and `bottomOffset` to Bars in ScrollArea.
- `nodeToMount` property to `Portal`.

### Fixed

- `keydown` event was propagated from `Popper`.
