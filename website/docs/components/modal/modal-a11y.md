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

| Attribute                  | Usage                                                                         |
| -------------------------- | ----------------------------------------------------------------------------- |
| `role="dialog"`            | Identifies the element as a dialog, indicating to assistive technology that its content is grouped and separated from the rest of the page content. |
| `aria-labelledby="IDREF"`  | Gives the dialog an accessible name by referring to the element that provides the dialog title. |
| `aria-modal="true"`        | Tells assistive technologies that the content underneath the current dialog isn't available for interaction. |

## Considerations for designers & developers

### Attributes

The list below will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-describedby="IDREF"`      | `div`   | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. |

### Headings

By default, `Modal.Title` in our Modal component is marked as `h2`. Since there is no strict WCAG recommendation on this, we've made this decision for the following reason: Modal windows are usually part of the page and don't have a separate URL, so to keep consistency within the page, it's recommended to have only one `h1` tag on the page. Having more than one `h1` tag per page can confuse users of assistive technology.

However, if your modal window has a separate URL, you can mark `Modal.Title` as `h1`.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./modal-a11y-report.md-->
