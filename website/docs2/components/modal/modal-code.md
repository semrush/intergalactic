---
title: Example
fileSource: modal
---

## Basic modal window usage

@example modal

## Modal window height is bigger than the browser page

Sometimes the amount of content overfills the window's visibility, but you don't need to worry about it, because the component will be adjusted and the scroll will appear.

@example scroll

## Changing the alignment

By default, the modal window is centered. However, in some cases, when the content height inside the window changes dynamically and causes the modal window to "jump," it may be necessary to adjust the window alignment. This can be achieved by applying the desired margin on the respective side.

@example position

## Modal window inside a modal window

While it is generally not recommended, there are instances where it may be necessary to open a modal window within another modal window. In such cases, it is important to nest the modal windows properly to ensure correct background visibility and keyboard control.

@example modal-inside-modal

## Modal window with customization

Example of a modal window with a custom header.

@example wizard

## Access to internal HTML nodes

To access the background or the close `Close` icon, you will need to expand the modal window and recreate the same component sequence.

In most cases, it is expected that you will not require this functionality. **There is no need for a custom `Close` icon.** Instead, consider the following solutions:

- If you need to send analytics upon clicking the close icon, you can use the [`onClose` prop](/components/modal/modal-api/#IModalProps.onClose) in the Modal component.
- To ensure the spinner overlaps the close icon, refer to the example provided above.

@example modal-advanced

## Modal window inside the iframe

Whenever possible, opt for using pages instead of modal windows. Modal windows within an iframe will not overlay the entire viewport; instead, they will only cover a portion of the iframe area. Additionally, they will not appear at the center of the viewport but rather at the center of the iframe, resulting in an awkward visual experience.

One alternative solution is to use a [FullscreenModal](/components/fullscreen-modal). This type of modal will cover the entire iframe and resemble a page rather than a dialog.

> It is advised to avoid using fullscreen modals for simple confirmation dialogs or warnings.

When using a simple modal dialog, you can apply a quick fix to improve its appearance by setting `margin-top: 0` or `<Modal mt={0}/>`.
