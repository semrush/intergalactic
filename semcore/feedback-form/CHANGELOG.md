# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [16.1.1] - 2025-05-30

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [16.0.0 ~> 16.0.1], `@semcore/icon` [16.1.0 ~> 16.2.0], `@semcore/button` [16.0.0 ~> 16.0.1], `@semcore/base-components` [16.0.0 ~> 16.0.1]).

## [16.1.0] - 2025-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [16.0.0 ~> 16.1.0]).

## [16.0.0] - 2025-05-19

### Break

- replaced `keyboardFocusEnhance` with `:focus-visible` CSS pseudo-class.

## [6.42.2] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.44.3 ~> 7.44.4], `@semcore/button` [5.43.2 ~> 5.43.3], `@semcore/utils` [4.48.4 ~> 4.48.5], `@semcore/core` [2.39.3 ~> 2.39.4]).

## [6.42.1] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.44.2 ~> 7.44.3], `@semcore/icon` [4.61.0 ~> 4.62.0], `@semcore/button` [5.43.1 ~> 5.43.2], `@semcore/utils` [4.48.2 ~> 4.48.4], `@semcore/core` [2.39.2 ~> 2.39.3]).

## [6.42.0] - 2025-04-11

### Changed

- Version minor update due to children dependencies update (`@semcore/icon` [4.60.2 ~> 4.61.0]).

## [6.41.0] - 2025-04-01

### Changed

- Email in FeedbackRating error notice as a link.
- Star icons in Slider component.
- Close feedback form behavior - the rating value is cleared.
- It is impossible to open a form with an empty rating.

## [6.40.0] - 2025-03-28

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.42.1 ~> 5.43.0]).

## [6.39.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.44.0 ~> 7.44.1], `@semcore/icon` [4.60.0 ~> 4.60.1], `@semcore/button` [5.42.0 ~> 5.42.1], `@semcore/utils` [4.48.0 ~> 4.48.1], `@semcore/core` [2.39.0 ~> 2.39.1]).

## [6.39.0] - 2025-03-14

### Added

- Build for ESM.

## [6.38.5] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.43.0 ~> 7.43.1], `@semcore/button` [5.41.1 ~> 5.41.2], `@semcore/flex-box` [5.40.0 ~> 5.40.1], `@semcore/utils` [4.45.0 ~> 4.45.1], `@semcore/core` [2.38.0 ~> 2.38.1]).

## [6.38.4] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.56.0 ~> 4.57.0], `@semcore/button` [5.41.0 ~> 5.41.1], `@semcore/notice` [5.44.0 ~> 5.44.1]).

## [6.38.3] - 2025-01-27

### Added

- `notificationTitle` prop to `FeedbackRating`.

## [6.38.2] - 2024-01-21

### Added

- type `email` for config in `FeedbackRating.Item`.

## [6.38.1] - 2024-12-19

### Added

- `aria-describedby`, that refers to ScreenRiderOnly text, `aria-labelledby` referring to the notice text, `aria-valuetext` to SliderRating.
- `role="image"` and `aria-label` for SliderRating's readonly mode
- `role="none"` to SVGs in SliderRating.
- `aria-labelledby` for the FeedbackRating's modal container, that refers to Header of it
- autofocus to first checkbox. Moved from `textarea`.
- `aria-describedby`, that connects privacy-description text and related form control in FeedbackRating form.
- same visual feedback for keyboard interactions to SliderRating same as on hover.

### Changed

- color of privacy-description text to the `text-secondary` token in FeedbackRating form.
- `FeedbackRating.Header` as optional, when specifying FeedbackRating's `header` prop.

### Removed

- `title` attribute from FeedbackRating form.
- `<ul><li>` structure from checkboxes, leaving only `div role="group"` in FeedbackRating form.
- unnecessary tooltip around `input[type="hidden"]`.
- `line-height` from privacy-description text in FeedbackRating form.
- `aria-invalid` from checkbox's parent elements.
- `aria-haspop` from tooltip of field controls

## [6.38.0] - 2024-12-18

### Added

- `tabindex` for the `FeedbackFrom.Success` component with `outline=none`.

## [6.37.1] - 2024-12-05

### Fixed

- `aria-errormessage` always appearing in FeedbackItem, even if form control is valid.
- `type="checkbox"` attributes on `<div> / <li> / <label>` elements, wrapping checkbox.

## [6.37.0] - 2024-11-29

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.41.2 ~> 7.42.0], `@semcore/notice-bubble` [5.47.2 ~> 5.48.0], `@semcore/button` [5.39.4 ~> 5.40.0], `@semcore/flex-box` [5.38.2 ~> 5.39.0], `@semcore/utils` [4.43.3 ~> 4.44.0], `@semcore/core` [2.36.2 ~> 2.37.0]).

## [6.36.0] - 2024-11-19

### Added

- `modalWidth` property for the FeedbackRating component.

## [6.35.3] - 2024-11-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.39.2 ~> 5.39.3], `@semcore/tooltip` [6.46.1 ~> 6.46.2]).

## [6.35.2] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.41.0 ~> 7.41.1], `@semcore/button` [5.39.1 ~> 5.39.2], `@semcore/tooltip` [6.46.0 ~> 6.46.1], `@semcore/utils` [4.43.0 ~> 4.43.2], `@semcore/core` [2.36.0 ~> 2.36.1]).

## [6.35.1] - 2024-11-01

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.40.0 ~> 7.41.0], `@semcore/modal` [4.49.0 ~> 4.49.1], `@semcore/icon` [4.51.0 ~> 4.52.0], `@semcore/button` [5.39.0 ~> 5.39.1], `@semcore/utils` [4.42.0 ~> 4.43.0], `@semcore/core` [2.35.0 ~> 2.36.0]).

## [6.35.0] - 2024-10-28

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.39.0 ~> 7.40.0], `@semcore/button` [5.38.0 ~> 5.39.0], `@semcore/utils` [4.41.0 ~> 4.42.0], `@semcore/core` [2.34.0 ~> 2.35.0]).

## [6.34.4] - 2024-10-15

### Fixed

- Types for enhances.

## [6.34.3] - 2024-10-11

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.37.0 ~> 7.38.0], `@semcore/link` [5.38.2 ~> 5.38.3], `@semcore/icon` [4.47.0 ~> 4.48.0], `@semcore/button` [5.37.2 ~> 5.37.3], `@semcore/utils` [4.38.0 ~> 4.39.0], `@semcore/core` [2.32.0 ~> 2.33.0]).

## [6.34.2] - 2024-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.36.1 ~> 7.37.0], `@semcore/link` [5.38.1 ~> 5.38.2], `@semcore/button` [5.37.1 ~> 5.37.2], `@semcore/utils` [4.36.2 ~> 4.38.0], `@semcore/core` [2.31.1 ~> 2.32.0]).

## [6.34.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.36.0 ~> 7.36.1], `@semcore/icon` [4.45.0 ~> 4.46.0], `@semcore/button` [5.37.0 ~> 5.37.1], `@semcore/utils` [4.36.0 ~> 4.36.2], `@semcore/core` [2.31.0 ~> 2.31.1]).

## [6.34.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.35.0 ~> 7.36.0], `@semcore/button` [5.36.0 ~> 5.37.0], `@semcore/utils` [4.35.0 ~> 4.36.0], `@semcore/core` [2.30.0 ~> 2.31.0]).

## [6.33.7] - 2024-09-06

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.34.2 ~> 7.35.0], `@semcore/icon` [4.44.0 ~> 4.44.1], `@semcore/button` [5.35.2 ~> 5.36.0], `@semcore/tooltip` [6.40.4 ~> 6.41.0], `@semcore/utils` [4.32.2 ~> 4.35.0], `@semcore/core` [2.29.2 ~> 2.30.0]).

## [6.33.6] - 2024-08-23

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.43.2 ~> 4.44.0], `@semcore/button` [5.35.1 ~> 5.35.2], `@semcore/tooltip` [6.40.3 ~> 6.40.4]).

## [6.33.5] - 2024-08-16

### Changed

- Using `Notice.Close` instead of `Notice.CloseIcon`.

## [6.33.4] - 2024-08-16

### Fixed

- Using `theme` property for Notice.

## [6.33.3] - 2024-08-12

### Changed

- Version patch update due to children dependencies update (`@semcore/illustration` [2.31.2 ~> 2.32.0], `@semcore/button` [5.35.0 ~> 5.35.1], `@semcore/tooltip` [6.40.2 ~> 6.40.3]).

## [6.33.2] - 2024-08-02

### Fixed

- View for close icon as a `Button` component.
- React errors in console about `validationOnBlur` property.

## [6.33.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.34.0 ~> 7.34.1], `@semcore/notice-bubble` [5.40.0 ~> 5.40.1], `@semcore/button` [5.34.0 ~> 5.34.1], `@semcore/utils` [4.32.0 ~> 4.32.1], `@semcore/core` [2.29.0 ~> 2.29.1]).

## [6.33.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.33.0 ~> 7.34.0], `@semcore/notice-bubble` [5.39.0 ~> 5.40.0], `@semcore/modal` [4.41.0 ~> 4.42.0], `@semcore/button` [5.33.0 ~> 5.34.0], `@semcore/tooltip` [6.39.1 ~> 6.40.0], `@semcore/utils` [4.31.0 ~> 4.32.0], `@semcore/core` [2.28.0 ~> 2.29.0]).

## [6.32.0] - 2024-07-17

### Changed

- Version minor update due to children dependencies update (`@semcore/notice-bubble` [5.38.0 ~> 5.39.0], `@semcore/button` [5.32.0 ~> 5.33.0], `@semcore/tooltip` [6.37.0 ~> 6.39.0]).

## [6.31.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.32.0 ~> 7.33.0], `@semcore/illustration` [2.29.0 ~> 2.30.0], `@semcore/icon` [4.41.0 ~> 4.42.0], `@semcore/button` [5.31.1 ~> 5.32.0], `@semcore/utils` [4.30.0 ~> 4.31.0], `@semcore/core` [2.27.0 ~> 2.28.0]).

## [6.30.2] - 2024-07-09

### Changed

- Version patch update due to children dependencies update (`@semcore/notice` [5.36.0 ~> 5.36.1]).

## [6.30.1] - 2024-07-05

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [4.39.1 ~> 4.41.0], `@semcore/button` [5.31.0 ~> 5.31.1], `@semcore/tooltip` [6.36.0 ~> 6.36.1]).

## [6.30.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.31.0 ~> 7.32.0], `@semcore/notice-bubble` [5.35.0 ~> 5.36.0], `@semcore/icon` [4.38.0 ~> 4.39.1], `@semcore/button` [5.30.0 ~> 5.31.0], `@semcore/notice` [5.34.3 ~> 5.35.0], `@semcore/utils` [4.29.0 ~> 4.30.0], `@semcore/core` [2.26.0 ~> 2.27.0]).

## [6.29.5] - 2024-06-13

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.30.2 ~> 7.31.0], `@semcore/button` [5.29.1 ~> 5.30.0], `@semcore/notice` [5.34.2 ~> 5.34.3], `@semcore/utils` [4.28.2 ~> 4.29.0], `@semcore/core` [2.25.2 ~> 2.26.0]).

## [6.29.4] - 2024-06-10

### Fixed

- `aria-label` for the `Notice` in `FeedbackRating`.

## [6.29.3] - 2024-06-05

### Fixed

- Children type for `FeedbackForm.Item`.

## [6.29.2] - 2024-05-30

### Added

- Max width for feedback rating modal by default to `320px`.

## [6.29.1] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [7.30.0 ~> 7.30.1], `@semcore/button` [5.28.0 ~> 5.28.1], `@semcore/tooltip` [6.33.3 ~> 6.34.0], `@semcore/utils` [4.28.0 ~> 4.28.1], `@semcore/core` [2.25.0 ~> 2.25.1]).

## [6.29.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/checkbox` [7.29.0 ~> 7.30.0], `@semcore/button` [5.27.0 ~> 5.28.0], `@semcore/spin-container` [7.26.0 ~> 7.27.0], `@semcore/utils` [4.27.0 ~> 4.28.0], `@semcore/core` [2.24.0 ~> 2.25.0]).

## [6.28.0] - 2024-05-22

### Added

- New `FeedbackRating` component.

## [6.27.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.26.0 ~> 5.26.1], `@semcore/utils` [4.26.1 ~> 4.26.2], `@semcore/core` [2.23.0 ~> 2.23.1]).

## [6.27.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.25.0 ~> 5.26.0], `@semcore/utils` [4.25.0 ~> 4.26.1], `@semcore/core` [2.22.0 ~> 2.23.0]).

## [6.26.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.23.2 ~> 5.24.0], `@semcore/tooltip` [6.26.2 ~> 6.27.0], `@semcore/utils` [4.23.2 ~> 4.24.0], `@semcore/core` [2.20.2 ~> 2.21.0]).

## [6.24.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.23.1 ~> 5.23.2], `@semcore/utils` [4.23.1 ~> 4.23.2], `@semcore/core` [2.20.1 ~> 2.20.2]).

## [6.24.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.23.0 ~> 5.23.1], `@semcore/utils` [4.23.0 ~> 4.23.1], `@semcore/core` [2.20.0 ~> 2.20.1]).

## [6.24.0] - 2024-04-15

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.22.2 ~> 5.23.0], `@semcore/spin-container` [7.21.2 ~> 7.22.0], `@semcore/utils` [4.22.2 ~> 4.23.0], `@semcore/core` [2.19.2 ~> 2.20.0]).

## [6.23.4] - 2024-04-15

### Fixed

- Form footer display in dark mode.

## [6.23.3] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.22.1 ~> 5.22.2], `@semcore/utils` [4.22.1 ~> 4.22.2], `@semcore/core` [2.19.1 ~> 2.19.2]).

## [6.23.2] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.22.0 ~> 5.22.1], `@semcore/utils` [4.22.0 ~> 4.22.1], `@semcore/core` [2.19.0 ~> 2.19.1]).

## [6.23.1] - 2024-03-27

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.25.0 ~> 6.25.1]).

## [6.23.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.21.1 ~> 5.22.0], `@semcore/utils` [4.21.1 ~> 4.22.0], `@semcore/core` [2.18.1 ~> 2.19.0]).

## [6.22.2] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.21.0 ~> 5.21.1], `@semcore/notice` [5.27.0 ~> 5.27.1], `@semcore/utils` [4.21.0 ~> 4.21.1], `@semcore/core` [2.18.0 ~> 2.18.1]).

## [6.22.1] - 2024-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.24.0 ~> 6.24.1]).

## [6.22.0] - 2024-03-19

### Changed

- Version minor update due to children dependencies update (`@semcore/tooltip` [6.23.0 ~> 6.24.0]).

## [6.21.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.20.5 ~> 5.21.0], `@semcore/tooltip` [6.22.0 ~> 6.23.0], `@semcore/utils` [4.20.5 ~> 4.21.0], `@semcore/core` [2.17.5 ~> 2.18.0]).

## [6.20.3] - 2024-03-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.20.4 ~> 5.20.5], `@semcore/tooltip` [6.20.3 ~> 6.21.0], `@semcore/utils` [4.20.4 ~> 4.20.5], `@semcore/core` [2.17.4 ~> 2.17.5]).

## [6.20.2] - 2024-03-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.20.3 ~> 5.20.4], `@semcore/utils` [4.20.3 ~> 4.20.4], `@semcore/core` [2.17.3 ~> 2.17.4]).

## [6.20.1] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.20.2 ~> 5.20.3], `@semcore/utils` [4.20.2 ~> 4.20.3], `@semcore/core` [2.17.2 ~> 2.17.3]).

## [6.20.0] - 2024-02-14

### Changed

- Version preminor update due to children dependencies update (`@semcore/tooltip` [6.19.0 ~> 6.20.0]).

## [6.19.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.20.1 ~> 5.20.2], `@semcore/tooltip` [6.18.1 ~> 6.19.0], `@semcore/utils` [4.20.1 ~> 4.20.2], `@semcore/core` [2.17.1 ~> 2.17.2]).

## [6.19.1] - 2024-02-02

### Fixed

- `validateOnBlur=false` behavior.

## [6.19.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.19.1 ~> 5.20.0], `@semcore/utils` [4.19.1 ~> 4.20.0], `@semcore/core` [2.16.1 ~> 2.17.0]).

## [6.18.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.19.0 ~> 5.19.1], `@semcore/utils` [4.19.0 ~> 4.19.1], `@semcore/core` [2.16.0 ~> 2.16.1]).

## [6.18.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.18.0 ~> 5.19.0], `@semcore/utils` [4.18.0 ~> 4.19.0], `@semcore/core` [2.15.0 ~> 2.16.0]).

## [6.17.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.17.0 ~> 5.18.0], `@semcore/utils` [4.17.0 ~> 4.18.0], `@semcore/core` [2.14.0 ~> 2.15.0]).

## [6.16.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.16.0 ~> 5.17.0], `@semcore/core` [2.13.1 ~> 2.14.0]).

## [6.15.3] - 2024-01-15

### Changed

- Version prepatch update due to children dependencies update (`@semcore/notice` [5.20.2 ~> 5.20.3]).

## [6.15.2] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.15.0 ~> 5.16.0], `@semcore/utils` [4.16.0 ~> 4.16.2], `@semcore/core` [2.13.0 ~> 2.13.1]).

## [6.15.1] - 2024-01-04

### Changed

- Version prepatch update due to children dependencies update (`@semcore/tooltip` [6.13.0 ~> 6.13.1]).

## [6.15.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.14.1 ~> 5.15.0], `@semcore/utils` [4.15.1 ~> 4.16.0], `@semcore/core` [2.12.1 ~> 2.13.0]).

## [6.14.2] - 2023-12-19

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.14.0 ~> 5.14.1], `@semcore/utils` [4.15.0 ~> 4.15.1], `@semcore/core` [2.12.0 ~> 2.12.1]).

## [6.14.1] - 2023-12-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/tooltip` [6.12.0 ~> 6.12.1]).

## [6.14.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.13.0 ~> 5.14.0], `@semcore/tooltip` [6.11.0 ~> 6.12.0], `@semcore/core` [2.11.0 ~> 2.12.0]).

## [6.13.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.12.0 ~> 5.13.0], `@semcore/utils` [4.13.0 ~> 4.14.0], `@semcore/core` [2.10.0 ~> 2.11.0]).

## [6.12.4] - 2023-11-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.11.3 ~> 5.12.0], `@semcore/tooltip` [6.10.3 ~> 6.10.4], `@semcore/utils` [4.10.3 ~> 4.13.0], `@semcore/core` [2.9.2 ~> 2.10.0]).

## [6.12.3] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.11.2 ~> 5.11.3], `@semcore/utils` [4.10.2 ~> 4.10.3], `@semcore/core` [2.9.1 ~> 2.9.2]).

## [6.12.2] - 2023-11-14

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.11.1 ~> 5.11.2]).

## [6.12.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.11.0 ~> 5.11.1], `@semcore/utils` [4.10.1 ~> 4.10.2], `@semcore/core` [2.9.0 ~> 2.9.1]).

## [6.12.0] - 2023-11-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.10.0 ~> 5.11.0], `@semcore/utils` [4.9.0 ~> 4.10.1], `@semcore/core` [2.8.0 ~> 2.9.0]).

## [6.11.0] - 2023-10-27

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.9.3 ~> 5.10.0], `@semcore/notice` [5.12.0 ~> 5.13.0], `@semcore/spin-container` [7.9.2 ~> 7.10.0], `@semcore/tooltip` [6.8.8 ~> 6.9.0], `@semcore/utils` [4.8.4 ~> 4.9.0], `@semcore/core` [2.7.7 ~> 2.8.0]).

## [6.10.3] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.9.2 ~> 5.9.3], `@semcore/utils` [4.8.3 ~> 4.8.4], `@semcore/core` [2.7.6 ~> 2.7.7]).

## [6.10.2] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.9.1 ~> 5.9.2], `@semcore/utils` [4.8.2 ~> 4.8.3], `@semcore/core` [2.7.5 ~> 2.7.6]).

## [6.10.1] - 2023-10-13

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.9.0 ~> 5.9.1]).

## [6.10.0] - 2023-10-10

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.8.5 ~> 5.9.0], `@semcore/flex-box` [5.7.5 ~> 5.8.0]).

## [6.9.0] - 2023-10-09

### Changed

- Version preminor update due to children dependencies update (`@semcore/notice` [5.9.5 ~> 5.10.0]).

## [6.8.5] - 2023-10-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.8.4 ~> 5.8.5], `@semcore/utils` [4.8.1 ~> 4.8.2], `@semcore/core` [2.7.4 ~> 2.7.5]).

## [6.8.4] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.8.3 ~> 5.8.4], `@semcore/utils` [4.8.0 ~> 4.8.1], `@semcore/core` [2.7.3 ~> 2.7.4]).

## [6.8.3] - 2023-10-02

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.8.2 ~> 5.8.3], `@semcore/utils` [4.7.2 ~> 4.8.0], `@semcore/core` [2.7.2 ~> 2.7.3]).

## [6.8.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.8.1 ~> 5.8.2], `@semcore/core` [2.7.1 ~> 2.7.2]).

## [6.8.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.8.0 ~> 5.8.1], `@semcore/spin-container` [7.7.0 ~> 7.8.0], `@semcore/utils` [4.7.0 ~> 4.7.1], `@semcore/core` [2.7.0 ~> 2.7.1]).

## [6.8.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.7.3 ~> 5.8.0], `@semcore/utils` [4.6.3 ~> 4.7.0], `@semcore/core` [2.6.3 ~> 2.7.0]).

## [6.7.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.7.2 ~> 5.7.3], `@semcore/core` [2.6.2 ~> 2.6.3]).

## [6.7.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.7.1 ~> 5.7.2], `@semcore/utils` [4.6.1 ~> 4.6.2], `@semcore/core` [2.6.1 ~> 2.6.2]).

## [6.7.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.7.0 ~> 5.7.1], `@semcore/core` [2.6.0 ~> 2.6.1]).

## [6.7.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.6.0 ~> 5.7.0], `@semcore/core` [2.5.0 ~> 2.6.0]).

## [6.6.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.5.1 ~> 5.6.0], `@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [6.5.0] - 2023-08-24

### Changed

- Version preminor update due to children dependencies update (`@semcore/tooltip` [6.4.1 ~> 6.5.0]).

## [6.4.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.5.0 ~> 5.5.1], `@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [6.4.0] - 2023-08-23

### Changed

- Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.

## [6.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.3.0 ~> 5.3.1], `@semcore/core` [2.3.0 ~> 2.3.1]).

## [6.3.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/button` [5.2.2 ~> 5.3.0], `@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [6.2.2] - 2023-08-18

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.2.1 ~> 5.2.2]).

## [6.2.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/button` [5.2.0 ~> 5.2.1], `@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [6.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.1.0 ~> 5.2.0], `@semcore/utils` [4.0.0 ~> 4.1.0]).

## [6.1.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/button` [5.0.1 ~> 5.1.0], `@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [6.0.2] - 2023-07-24

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [5.0.0 ~> 5.0.1]).

## [6.0.1] - 2023-07-18

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [6.0.0 ~> 6.0.1]).

## [6.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [5.4.30] - 2023-06-30

## [5.4.29] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.7 ~> 4.4.8], `@semcore/utils` [3.53.4 ~> 3.54.0]).

## [5.4.28] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.6 ~> 4.4.7], `@semcore/utils` [3.53.3 ~> 3.53.4]).

## [5.4.27] - 2023-06-13

### Changed

- Version patch update due to children dependencies update (`@semcore/notice` [4.5.2 ~> 4.6.0]).

## [5.4.26] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.5 ~> 4.4.6], `@semcore/utils` [3.53.2 ~> 3.53.3]).

## [5.4.25] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.4 ~> 4.4.5], `@semcore/utils` [3.53.1 ~> 3.53.2]).

## [5.4.24] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/notice` [4.4.45 ~> 4.5.0]).

## [5.4.23] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.3 ~> 4.4.4], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [5.4.22] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.2 ~> 4.4.3], `@semcore/utils` [3.52.0 ~> 3.53.0]).

## [5.4.21] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.1 ~> 4.4.2], `@semcore/utils` [3.51.1 ~> 3.52.0]).

## [5.4.20] - 2023-05-25

### Fixed

- Fixed error tooltip sizing.

## [5.4.19] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.4.0 ~> 4.4.1], `@semcore/utils` [3.51.0 ~> 3.51.1]).

## [5.4.18] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.24 ~> 4.4.0], `@semcore/utils` [3.50.7 ~> 3.51.0]).

## [5.4.17] - 2023-05-12

### Fixed

- Fixed empty tooltip content while fading out.

## [5.4.16] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.23 ~> 4.3.24], `@semcore/utils` [3.50.6 ~> 3.50.7]).

## [5.4.15] - 2023-05-10

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.4.9 ~> 5.4.10]).

## [5.4.12] - 2023-04-24

## [5.4.11] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.19 ~> 4.3.20], `@semcore/utils` [3.50.0 ~> 3.50.3]).

## [5.4.9] - 2023-04-11

### Changed

- Updated `final-form` version to meet `react-final-form` peer dependency.

## [5.4.8] - 2023-04-11

### Changed

- Patched `react-final-form` to the latest version.

## [5.4.7] - 2023-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.3.24 ~> 5.4.0]).

## [5.4.4] - 2023-03-27

### Fixed

- Added A11Y error binding to field.

## [5.4.3] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.15 ~> 4.3.16], `@semcore/utils` [3.48.1 ~> 3.49.0]).

## [5.4.0] - 2023-03-22

### Added

- Added properties `backgrouund` and `theme` responsible for spinner theme.

## [5.3.15] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.12 ~> 4.3.13], `@semcore/utils` [3.47.3 ~> 3.47.4]).

## [5.3.13] - 2023-03-16

### Fixed

- Fixed padding for the success state of the feedback form.

## [5.3.12] - 2023-03-13

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.10 ~> 4.3.11], `@semcore/utils` [3.47.1 ~> 3.47.2]).

## [5.3.8] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).

## [5.3.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.6 ~> 4.3.7], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [5.3.5] - 2023-01-10

## [5.3.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.3 ~> 4.3.4], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [5.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [5.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [5.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [5.1.15] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.18 ~> 4.1.0]).

## [5.1.12] - 2022-08-30

### Added

- Added aria attributes for better A11Y.

## [5.1.11] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.15 ~> 4.0.16], `@semcore/utils` [3.37.0 ~> 3.37.1]).

## [5.1.1] - 2022-06-28

### Fixed

- Fixed feedback image.

## [5.1.0] - 2022-06-21

### Changed

- Updated `react-final-form` to `6.5.2` to support React 17.

## [5.0.8] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/button` [4.0.5 ~> 4.0.6]).

## [5.0.6] - 2022-05-30

### Fixed

- Fixed version `@babel/runtime` for dependency `react-final-form`.

## [5.0.5] - 2022-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.3 ~> 4.0.4]).

## [5.0.3] - 2022-05-19

### Fixed

- Fixed Item tag property setting

## [5.0.2] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [5.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.0 ~> 4.0.1]).

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [4.0.5] - 2022-04-25

### Changed

- Version patch update due to children dependencies update (`@semcore/spin-container` [5.0.5 ~> 5.1.0]).

## [3.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.5.1] - 2022-02-07

### Fixed

- fixed styles for secondary Notice.

## [3.5.0] - 2022-01-25

### Added

- Added support Tooltip props for `FeedbackForm.Item`.

## [3.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.3.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.2] - 2021-08-17

### Fixed

- Fixed placement warning tooltip for small screens.

## [3.3.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [3.3.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [TS] Rewrite code from TS to JS.

## [3.2.0] - 2021-04-05

### Changed

- Up version `@semcore/notice` in dependence for package.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-06-10

### BREAK

- Обновились компоненты `Box, SpinContainer, Tooltip, Button, Notice`

## [2.3.0] - 2020-05-19

### Added

- Добавлена es6 сборка

## [2.2.5] - 2020-05-19

### Added

- [theme] Обновили стили `<FeedbackSuccess>` для `sellerly`

## [2.2.4] - 2020-03-25

### Fixed

- Добавлена пропущенная зависимость `@semcore/flex-box`

## [2.2.1] - 2019-12-25

### Fixed

- `FeedbackForm.validate.description` теперь корректно работает с переносами строк

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через CSS переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.0.0] - 2019-09-30

### BREAK

- Обвнавлен `react-final-form (^4.1 -> ^6.3)`

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.3.0] - 2019-06-18

### Changed

- Обновлены зависимости `spin-container` и `tooltip`

### Removed

- Зависимость `@semcore/spin`

## [1.2.0] - 2019-04-11

### Changed

- Обновлены зависимости `final-form`/`react-final-form`

### Fixed

- Исправленно отображение `theme="danger"` в `FeedbackForm.Notice`

## [1.1.0] - 2018-11-07

### Added

- Компонент нотис `FeedbackForm.Notice`

### Removed

- Отступы для `FeedbackForm.Item`

## [1.0.0] - 2018-11-07

### Added

- Initial release
