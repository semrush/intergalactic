---
title: Confirmation modal dialog
fileSource: confirm-dialog
tabName: Design
---

@## Description

A **confirmation modal dialog** asks users whether they are sure that they want to proceed with a command that they have just issued to a system. It is built with [Modal](components/modal/) component.

It’s a second chance for the user to predict problems or losing of data.

Having a clear and descriptive message will explain the window’s usage. Users should be able to understand the message and have controls to act.

@## Component appearing

> Description of the component for modal windows can be found in the [Modal](components/modal/). For cancel actions see [NoticeBubble](/components/notice-bubble/).

When users are about to take an irreversible action, like permanently deleting an item or they can lose unsaved data, you should ask them in advance if they understand what’s about to happen.

![confirm dialog save appearance](static/confirm-dialog-save.png)

![confirm dialog delete appearance](static/confirm-dialog-delete.png)

When users are about to take an action that will result in complex consequences, for example, affecting the configuration of the data:

- it must be explained exactly what will change;
- the user has to confirm the action by entering a requested value for the confirmation.

![confirm dialog large appearance](static/confirm-dialog-large.png)

Try to avoid situations when the content in a modal window requires a scrollbar.

@## Paddings

![confirm dialog paddings](static/confirm-dialog-paddings.png)

@## Other recommendations

See more recommendations in the [article from Nielsen Norman Group](https://www.nngroup.com/articles/confirmation-dialog/).

@page confirm-dialog-code
