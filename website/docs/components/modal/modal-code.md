---
title: Example
fileSource: modal
---

@## Basic modal window usage

@example modal

@## Height of the modal window is bigger the browser page

Sometimes the amount of content overfills the window's visibility, but you don't need to worry about it, because the component will be adjusted and the scroll will appear.

@example scroll

@## Changing the alignment

By default, the modal window is displayed in the center, sometimes we need to change the window when the content height inside the window is resized and the modal window begins to "jump". This can be done by making the desired indent on the respective side.

@example position

@## Modal window inside a modal window

We do not recommend this, but sometimes it is necessary to open a model window in another modal window. You should put modal windows in each other, so that the background and keyboard control would be correct.

@example modal-inside-modal

@## Modal window with customization

Example of a wizard 🧙🏻 requiring a custom header.

@example wizard

@## Access to internal HTML nodes

To access the background or the closing cross, you need to expand the modal window and recreate the same sequence of components.

We hope that in most cases you won't need it. **No custom cross is needed:**

- send Analytics by click (**solution**: apply [`onClose`](/components/modal/modal-api/#aa518f) in Modal)
- the spinner needs to overlap the cross (solution: take a look at the [example](/components/modal/modal-code/#adf9fc) above)

@example modal-advanced

@## Modal window inside the iframe

Whenever it’s possible, use pages instead of modal windows. Modal windows in the iframe will not overlay the entire viewport — just an area of an iframe, and will not appear at the center of viewport — only at the center of an iframe, looking very awkward.

One of the alternative solutions — fullscreen modal. It will cover the entire iframe and will look like a page, not a dialog.

> Avoid using fullscreen modals for simple confirmation dialogs or warnings.

When using simple modal dialog, you can apply a quick fix for better looking modal window - just set `margin-top: 0` or `<Modal mt={0}/>`.
