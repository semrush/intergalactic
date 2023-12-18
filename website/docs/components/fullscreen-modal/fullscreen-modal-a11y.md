---
title: FullscreenModal
a11y: AA
tabs: Design('fullscreen-modal'), A11y('fullscreen-modal-a11y'), API('fullscreen-modal-api'), Example('fullscreen-modal-code'), Changelog('fullscreen-modal-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc`         | Closes the modal window.                       |

- See detailed information about the keyboard support for the all buttons, input, etc., in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).
- Don't forget to check recommendations on accessibility for [Form](/patterns/form/form-a11y).

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Role | Attribute    | Element | Usage                                                                                                                                                   |
| ---- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dialog` |        | `div` | Identifies the element that serves as the dialog container. Gets this role from [Modal](/components/modal). |
|          | `aria-labelledby="IDREF"` | Gives the dialog an accessible name by referring to the element that provides the dialog title. |
|      | `aria-modal="true"` | `div` | Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert). Gets this attribute from [Modal](/components/modal). |

## Considerations for developers

### Attributes

The list below will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-describedby="IDREF"`      | `div`   | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |

## Considerations for developers

- If the fullscreen modal blocks control of the parent page, update the page title.
- Properly structure the headers and titles of all full screen modals with appropriate heading markup and hierarchy.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
