---
title: Modal
a11y: AA
tabs: Design('modal'), A11y('modal-a11y'), API('modal-api'), Example('modal-code'), Changelog('modal-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab` | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc` | Closes the modal window.                       |

See more about the focus behavior in the modal window in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#keyboard_support_for_modal_window).

### Closing modal window

You can close the modal window by clicking on the following controls:

* `Close` icon; 
* CTA or "Cancel" button; 
* `ESC` key; 
* "Back" in the browser (nothing changes on the parent page); 
* outside the container area.

::: tip
When the modal window is closed, the focus should always return to the trigger.
:::

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Role | Attribute    | Element | Usage                                                                                                                                                   |
| ---- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dialog` |        | `div` | Identifies the element that serves as the dialog container. |
|          | `aria-labelledby="IDREF"` | Gives the dialog an accessible name by referring to the element that provides the dialog title. |
|      | `aria-modal="true"` | `div` | Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert). |

## Considerations for developers

### Attributes

The list below will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-describedby="IDREF"`      | `div`   | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./modal-a11y-report.md-->
