# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.2.2] - 2026-09-04

### Changed

- **animation**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSAnimation` namespace.
- **flex-box**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSBox/NSFlex/NSInvalidStateBox/NSScreenReaderOnly` namespaces.
- **grid**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSGrid` namespace.
- **hint**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSHint` namespace.
- **neighbor-location**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSNeighborLocation` namespace.
- **outside-click**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSOutsideClick` namespace.
- **popper**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSPopper` namespace.
- **portal**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSPortal` namespace.
- **scroll-area**: Refactor component types. Deprecated atomic types. Atomic types are
part of `NSScrollArea` namespace.

## [17.2.1] - 2026-06-26

### Fixed

- **flex-box**: Outline has a shimmering black color.
- **popper**: Outline has a shimmering black color.
- **flex-box**: Removed `tag` prop for `BoxProps`.
- **outside-click**: Checking `node.contains` because in d3-chart a node may not be an
HTMLElement.
- **animation**: Incorrect processing of oklch values.
- **breakpoints**: Incorrect processing of oklch values.
- **flex-box**: Incorrect processing of oklch values.
- **grid**: Incorrect processing of oklch values.
- **hint**: Incorrect processing of oklch values.
- **neighbor-location**: Incorrect processing of oklch values.
- **outside-click**: Incorrect processing of oklch values.
- **popper**: Incorrect processing of oklch values.
- **portal**: Incorrect processing of oklch values.
- **scroll-area**: Incorrect processing of oklch values.

## [17.2.0] - 2026-06-05

### Added

- **flex-box**: New props: `bg`, `border`, `borderRadius`.
- **breakpoints**: Links to the API and examples in the docs.
- **flex-box**: Links to the API and examples in the docs.
- **hint**: Links to the API and examples in the docs.
- **neighbor-location**: Links to the API and examples in the docs.
- **outside-click**: Links to the API and examples in the docs.
- **popper**: Links to the API and examples in the docs.
- **portal**: Links to the API and examples in the docs.
- **scroll-area**: Links to the API and examples in the docs.

### Changed

- **flex-box**: Added export for types.

## [17.1.0] - 2026-05-13

### Added

- **animation**: New brand theme.
- **breakpoints**: New brand theme.
- **grid**: New brand theme.
- **flex-box**: New brand theme.
- **neighbor-location**: New brand theme.
- **popper**: New brand theme.
- **portal**: New brand theme.
- **outside-click**: New brand theme.
- **scroll-area**: New brand theme.

## [17.0.2] - 2026-04-30

### Fixed

- **flex-box**: Incorrect handling of styles for focus ring offset values.

## [17.0.1] - 2026-04-16

### Fixed

- Build processing to correct extract styles.

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
