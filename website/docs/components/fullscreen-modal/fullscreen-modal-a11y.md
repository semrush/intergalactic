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

| Component    | Attribute | Usage                                                                                                                                                   |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FullscreenModal`         | `role="dialog"`            | Identifies the element that serves as the dialog container. Gets this role from [Modal](/components/modal/modal). |
| `FullscreenModal`         | `aria-modal="true"`        | Tells assistive technologies that the content underneath the current dialog isn't available for interaction (inert). Gets this attribute from [Modal](/components/modal/modal). |
| `FullscreenModal`         | `aria-labelledby="IDREF"`  | Gives the dialog an accessible name by referring to the content of `FullscreenModal.Title`. |
| `FullscreenModal`         | `aria-describedby="IDREF"` | Gives the dialog an accessible description by referring to the content of `FullscreenModal.Description`. |
| `FullscreenModal.Close`   | `aria-label="Close"`       | Sets an accessible name for the button that closes the dialog. |
| `FullscreenModal.Section` |  | Implemented using HTML `<section>` to serve as a `region` landmark. Note that you should add an `aria-label` to provide access to the landmark. |

## Considerations for designers & developers

### Attributes

The list below will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Component                   | Attribute         | Usage                                                                                                                                                                 |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FullscreenModal.Section`   | `aria-label`                  | Set an accessible name for the section so that it can be used as a landmark. |

### Main heading

By default, `FullscreenModal.Title` in our Modal component is marked as `h2`. Since there is no strict WCAG recommendation on this, we've made this decision for the following reason: Modal windows are usually part of the page and don't have a separate URL, so to keep consistency within the page, it's recommended to have only one `h1` tag on the page. Having more than one `h1` tag per page can confuse users of assistive technology.

However, if your modal window has a separate URL, you can mark `FullscreenModal.Title` as `h1`.

### Nested headings

Make sure that headings inside the `FullscreenModal` follow the overall heading hierarchy. For example, if the `FullscreenModal.Title` is marked as `h2`, then the following heading inside the modal should be marked as `h3`, and so on.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
