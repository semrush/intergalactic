---
title: FeedbackRating
tabs: Design('feedback-rating'), A11y('feedback-rating-a11y'), Example('feedback-rating-code')
---

## What component has

### Keyboard support

Find detailed information about the keyboard support for all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Element                  | Attribute                                                              | Usage                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Notice`                 | `aria-label="Leave feedback"`                                          | Defines an accessible name for the notice.                                                                                                                 |
|                          | `role="region"`                                                        | Defines an ARIA landmark, allowing quick navigation to the element. Inherited from [Notice](/components/notice/notice-a11y).                               |
| `SliderRating`           | `aria-labelledby="IDREF"`                                              | Defines an accessible name for the slider by referring to the `notificationText` content.                                                                  |
|                          | `aria-valuetext="Not set"`                                             | **When `value = 0`.** Converts the current slider value to human readable format.                                                                          |
|                          | `aria-valuetext="{value} out of 5. Press Enter to select the rating."` | **When `value > 0`.** Converts the current slider value to human readable format and adds an instruction for the user.                                     |
|                          |                                                                        | Other attributes in [Slider A11y](/components/slider/slider-a11y).                                                                                         |
| `Modal`                  | `aria-labelledby="IDREF"`                                              | Defines an accessible name for the modal by referring to its title.                                                                                        |
|                          |                                                                        | Other attributes in [Modal A11y](/components/modal/modal-a11y).                                                                                     |
| `Modal` > `SliderRating` | `role="img"`                                                           | Presents the noninteractive slider as an image.                                                                                                            |
|                          | `aria-label="Your rating: {value} out of 5"`                           | Defines an accessible name for the noninteractive slider.                                                                                                  |
| `Modal` > `div`          | `role="group"`                                                         | Groups the checkboxes together.                                                                                                                            |
|                          | `aria-labelledby="IDREF"`                                              | Defines an accessible name for the checkbox group by referring to the dialog title.                                                                        |
| `Modal` > `input#email`  | `aria-describedby="IDREF"`                                             | Provides an accessible description for the email input.<br/>In valid state, refers to the privacy text.<br/>In invalid state, refers to the error message. |

FeedbackRating form pattern consists of several components that have their own accessibility requirements. You can find more about each of them in their guides:

- [Notice](/components/notice/notice-a11y)
- [NoticeBubble](/components/notice-bubble/notice-bubble-a11y)
- [Button](/components/button/button-a11y)
- [Typography](/style/typography/typography-a11y)
- [Dropdown](/components/dropdown/dropdown-a11y)
- [Textarea](/components/textarea/textarea-a11y)
- [Input](/components/input/input-a11y)
- [Link component](/components/link/link-a11y)
- [Feedback form](/components/feedback-form/feedback-form-a11y)
- [Form](/patterns/form/form-a11y)

## Considerations for developers

Use `type: 'email'` for the email input to ensure correct functioning of the browser's autofill feature, [as in the example](./feedback-rating-code.md).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
