---
title: Success state
---

@## Description

**Success state** is the response from the system that an action has been completed. When user interact with a product, they have a goal that they want to achieve. State of success inform the user that they have reached a state.

@## Styles

Composition, styles, and margins of the message:

- All content is always positioned centrally.
- For an image in svg format use `width: 80px;`and `height: 80px;`.
- For title use text with 20px size (`--fs-400; --lh-400;`), `--text-primary color` and `margin-bottom: 8px`.
- For message text use text with 14px size (`--fs-200,--lh-200`), `--text-primary` color.
- For CTA use buttons with L size (optional).

![success state appearance](static/success-window.png)

@## Appearing

A success state can appear in these scenarios:

- User's manual input (e.g. submitting a form).
- An action that is triggered automatically (e.g. auto-saving).
- A process that the user initiated (e.g. data export).

The positioning of a success state depends on the context of use. Here are some general recommendations that can help:

- Position the success state in the component that the user is currently using, so that it is easy to notice and understand what it is referring to.
- Present it at the appropriate time to ensure that the user understands what action led to the success state.
- Ensure that the success message or feedback is clear and understandable so that users can easily catch the respond.
- Users should be able to close the window or notice at any time, for example, with the "Close" button or pressing the Escape key on the keyboard.

For example, if the [Feedback form](/components/feedback/) is sent successfully, show the success message in the same place next to the trigger.

![example success response](static/success-response.png)

Success state can be closed by clicking on:

- button "OK, got it";
- close icon;
- or by clicking outside the window.

Optionally use automatic closing after 3-5 seconds.

@## Additional methods

Use [NoticeBubble](/components/notice-bubble/) to show the user the results on completed action, for smaller contextual messages about a specific part.

![success notice bubble](static/notice-bubble.png)

Or use [Notice](/components/notice/) for the same purpose, to give the user feedback.

![success notice](static/notice.png)