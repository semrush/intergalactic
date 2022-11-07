---
title: ConfirmDialog
fileSource: confirm-dialog
tabName: Design
---

@## Description

A **confirmation dialog** asks users whether they are sure that they want to proceed with a command that they have just issued to a system. It that consists of [Modal] (components/modal/).

Basically it’s a second chanse for user to predict issues, but it wouldnt be one if users automate their response to the conformation and simply click Yes without thinking further.

Having a clear and descriptive message will explain the window’s usage. Users should be able to read the text and understand the message you’re trying to tell them and possible actions.

[Article](https://uxdesign.cc/delete-models-in-products-because-sometimes-cats-walk-on-keyboards-6f886b767f6d) how to predict such unthinkable mistackes.

@## Component appearing

> Description of the component for modal windows can be found in the [Modal] (components/modal/).

When users are about to take an irreversible action, like permanently deleting an item or they can lost unsaved data, we should ask them in advance if they understand what’s about to happen.

<!-- pic 1
     pic 2  -->

When users are about to take an action that will result in complex consequences, for example, affecting the configuration of the data:

- It must be explained exactly what will change
- The user has to confirm the action by entering a name

<!-- pic 3 -->

Try to avoid situations when the content in a modal window requires a scrollbar.

@page confirm-dialog-code
