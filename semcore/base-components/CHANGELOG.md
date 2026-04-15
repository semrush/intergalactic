# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.0.0] - 2026-04-15

### BREAK

- **breakpoints**: New major version.
- **grid**: New major version.
- **flex-box**: New major version.
- **neighbor-location**: New major version.
- **popper**: New major version.
- **portal**: Removed using `getNodeByRef`. Use `React.RefObject` instead.
- **outside-click**: Removed using `getNodeByRef`. Use `React.RefObject` instead.
- **scroll-area**: Removed using `getNodeByRef`. Use `React.RefObject` instead.

## [16.5.0] - 2026-04-01

### Added

- **box**: Add `hoverCursor` to `Box`.
- `inset` property for the Box component.

## [16.4.2] - 2025-12-01

### Fixed

- The "Popper" with focus or hover interaction opens after moving to the
trigger from the popper using the Tab key.

## [16.4.1] - 2025-10-17

### Fixed

- Mouse interaction with elements inside a `ScrollArea.Container` when the container has focus-visible.

## [16.4.0] - 2025-10-03

### Changed

- Styles for `:focus-visible` in Box and ScrollArea.
- Border-radius for invalid pattern in InvalidStateBox.

## [16.3.0] - 2025-09-20

### Added

- Ability to use two tags in `tag` property. First for some logic like `Ellipsis` or `Select.Trigger` and second for real `html` tag.

## [16.2.4] - 2025-09-12

### Changed

- Don't open popper `onFocus` if last interaction was with mouse.

## [16.2.3] - 2025-09-17

### Changed

- Version patch update due to children dependencies update (`@semcore/core` [16.2.0 ~> 16.3.0]).

## [16.2.2] - 2025-09-05

### Changed

- Version patch update due to children dependencies update (`@semcore/core` [16.1.1 ~> 16.2.0]).

## [16.2.1] - 2025-08-29

### Changed

- Type description for `PopperPopperProps`/`PopperProps`/`ScrollAreaProps`/`ScrollBarProps`/`BoxProps`.

## [16.2.0] - 2025-08-08

### Added

- `text-align` CSS property to `Box` component.

## [16.1.2] - 2025-07-23

### Changed

- Version patch update due to children dependencies update (`@semcore/core` [16.0.3 ~> 16.0.4]).

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
