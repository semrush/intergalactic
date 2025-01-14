---
title: FeedbackRating
tabs: Design('feedback-rating'), A11y('feedback-rating-a11y'), Example('feedback-rating-code')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Element         | Attribute                                                          | Usage                                                               |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `Notice`        | `aria-label="Leave feedback"`                                      | Defines an accessible name for the notice. |
|                 |  | Other attributes in [Notice A11y](/components/notice/notice-a11y). |
| `SliderRating`  | `aria-label={notificationText}`                                    | Defines an accessible name for the slider. |
|                 |  | Other attributes in [Slider A11y](/components/slider/slider-a11y).   |
| `Modal`         | `aria-labelledby="IDREF"`                                          | Defines an accessible name for the modal by referring to its title. |
|                 |  | Other attributes in [Modal A11y](/components/notice/modal-a11y).     |
| `Modal` > `div` | `role="group"`                                                     | Groups the checkboxes together. |
|                 | `aria-labelledby="IDREF"`                                          | Defines an accessible name for the checkbox group by referring to the dialog title. |

FeedbackRating form pattern consists of several components that have their own accessibility requirements. You can find more about each of them in their guides:

- [Notice](/components/notice/notice-a11y)
- [NoticeBubble](/components/notice-bubble/notice-bubble-a11y)
- [Button](/components/button/button-a11y)
- [Typography](/style/typography/typography-a11y)
- [Dropdown](/components/dropdown/dropdown-a11y)
- [Textarea](/components/textarea/textarea-a11y)
- [Input](/components/input/input-a11y)
- [Link component](/components/link/link-a11y)
- [Feedback form](/components/feedback/feedback-form-a11y)
- [Form](/patterns/form/form-a11y)

## Keyboard support

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

## Considerations for designers & developers

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
