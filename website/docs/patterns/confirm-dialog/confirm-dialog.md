---
title: Confirmation modal window
fileSource: modal
tabs: Design('confirm-dialog'), Example('confirm-dialog-code')
---

## Description

**Confirmation modal dialog** asks the user if they're sure that they want to proceed with the command that they've just issued to the system. It informs the user about potential problems or data loss and gives them a chance to reconsider the decision.

The dialog must have a clear descriptive message that explains what's happening. The user should be able to understand the message and have controls to act.

The dialog is built using the [Modal](/components/modal/modal) component.

## When to use

Before an irreversible action, such as permanently deleting an item or losing unsaved data, you need to make sure that the user understands the consequences.

![](static/confirm-dialog-save.png)

![](static/confirm-dialog-delete.png)

When the user is about to take an action that leads to serious consequences, for example changing network configuration, ensure the following:

- The dialog must explain what exactly will change.
- The user has to confirm the action by entering the requested value.

Try to avoid situations when the content in a modal dialog requires a scrollbar.

![](static/confirm-dialog-large.png)

## Other recommendations

For more recommendations, refer to the [article from Nielsen Norman Group](https://www.nngroup.com/articles/confirmation-dialog/).

