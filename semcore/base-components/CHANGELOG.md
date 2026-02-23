# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.0.0] - 2026-02-23

### BREAK

- **ellipsis**: Deprecated component. Use the new `ellipsis` prop that's built into various components.
- **portal**: Removed using `getNodeByRef`. Use `React.RefObject` instead.
- **outside-click**: Removed using `getNodeByRef`. Use `React.RefObject` instead.
- **scroll-area**: Removed using `getNodeByRef`. Use `React.RefObject` instead.

### Added

- `inset` property for the Box component.

### Changed

- `Hint` now has slicker and more compact styles.

## [16.4.2] - 2025-12-01

### Fixed

- **popper**: The "Popper" with focus or hover interaction opens after moving to the
trigger from the popper using the Tab key.

## [16.4.1] - 2025-10-17

### Fixed

- **scroll-area**: Mouse interaction with elements inside a `ScrollArea.Container` when the container has focus-visible.

## [16.4.0] - 2025-10-03

### Changed

- **flex-box**: Styles for `:focus-visible`.
- **flex-box**: Border-radius for invalid pattern in InvalidStateBox.

## [16.3.0] - 2025-09-20

### Added

- **flex-box**: Ability to use two tags in `tag` property. First for some logic like `Ellipsis` or `Select.Trigger` and second for real `html` tag.

## [16.2.4] - 2025-09-12

### Changed

- **popper**: Don't open popper `onFocus` if last interaction was with mouse.

## [16.2.1] - 2025-08-29

### Changed

- **popper**: Type description for `PopperPopperProps`/`PopperProps`/`ScrollAreaProps`/`ScrollBarProps`/`BoxProps`.

## [16.2.0] - 2025-08-08

### Added

- **flex-box**: `text-align` CSS property to `Box` component.

## [16.1.0] - 2025-06-20

### Added

- **scroll-area**: New properties - `shadowSize` and `shadowTheme` for customize Shadows.

## [16.0.2] - 2025-06-12

### Added

- **scroll-area**: ResizeObserver for the `Wrapper` component in the `ScrollArea`.

### Changed

- **popper**: `keyboardFocus` to `focus` event for popper triggers with `hover` interaction.

## [16.0.1] - 2025-05-26

### Fixed

- **animation**: `Delay` doesn't work for the `Collapse` component.

## [16.0.0] - 2025-05-19

### Added

- Package with base components.
- **flex-box**: `outline` for all Box'es with `:focus-visible`.
- **scroll-area**: `topOffset` and `bottomOffset` to Bars.
- **portal**: `nodeToMount` property.

### Fixed

- **popper**: `keydown` event was propagated from Popper.
