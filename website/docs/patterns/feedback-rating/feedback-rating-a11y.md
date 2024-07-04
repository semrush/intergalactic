---
title: FeedbackRating
tabs: Design('feedback-rating'), A11y('feedback-rating-a11y'), Example('feedback-rating-code')
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Component          | Role     | Attribute                                                                                   |
| ------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `Notice`           | `region` | `aria-label="Leave feedback"`                                                               |
| `Notice.Label`     |          | `aria-hidden={true}`                                                                        |
| `Notice.CloseIcon` | `button` | `aria-label` comes from [Notice](/components/notice/notice-a11y).                           |
| `SliderRating`     | `slider` | `aria-label={notificationText}`                                                             |
| `SliderRating`     | `slider` | All aria attributes are the same as those the [Slider](/components/slider/slider-a11y) has. |

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

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
