---
title: Keyboard navigation
tabName: Guide
---

@## Basic rules

> 💡 **Brief guide to keyboard navigation**
>
> - **Tab** — moves the `focus` between interactive elements on the page / in the dropdown / modal window, etc.
> - **Shift** + **Tab** — returns `focus` to the previous interactive element. If a dropdown is open, it closes.
> - **Enter**, **Space**, and **↓** **(for the select/menu trigger)** — open a dropdown. And if it has interactive elements inside, `focus` moves to the first one.
> - **↓** inside the dropdown this key moves `focus` to the next `menuItem`. From the last `menuItem`, the `focus` moves to the first `menuItem`. The same logic applies to the ↑ key, but backwards 🙃
> - **Esc** — closes the dropdown. If the `focus` was on the control inside the dropdown, `Esc` removes the `focus` from the interactive element and closes the dropdown.

Keyboard navigation should be performed sequentially across all interactive elements (which have focus) on the page.

- The focus state for all controls appears by pressing the `Tab` key.
- For inputs and text fields, focus also appears by `onClick`.
- When navigating the keyboard all controls are highlighted with a blue border (see [Variables](/style/variables/#ab8464)). Exceptions are inputs and text fields when validating, that on focus have same border color (orange or green).
- The focus inside groups of controls is consistent. After the last control in the group, the focus should move to the next control in the interface.
- If the control has a tooltip in the `hover` state, it also appears on focus using `Tab`.

@## Navigating different controls using the keyboard

### Link и hint link

- Links only get focus by clicking on `Tab`.
- Links are highlighted with a blue border.
- When you press `Enter`, the link is clicked or an action is performed.

### Button

- Buttons get focus only by pressing the `Tab` key.
- Buttons are highlighted with a blue outline when focused on, regardless of the color of the button.
- When you press `Enter`, the link is clicked or an action is performed.

### Input и textarea

- Input fields get the focus only by pressing the `Tab` key.
- When focused, the fields are highlighted with a blue outline. For fields that have been validated, the outline corresponds to the border color (orange or green).
- The target action is performed by pressing `Enter` (saving, applying a filter, etc.).

### Checkbox, radio и switch

- Selection controls get the focus only when you press `Tab`.
- When focused, the controls are highlighted with a blue outline. For controls that have been validated, the outline corresponds to the orange border color.
- When you press `Enter`, an element is enabled/disabled, depending on the initial state.

### Any other controls (FilterTrigger, Pills, TabLine и пр.)

- The control only gets focus when you press `Tab`.
- When focused, controls are highlighted with a blue outline, regardless of the color of the control.
- When you press `Enter`, an event occurs. For example, a dropdown opening .
- If a tooltip should appear on hovering over the control, then when pressing `Tab`, it will appear when focused.

### Images as links or clickable groups

- These elements get the focus only by pressing the `Tab`.
- If all elements of a group perform the same action when clicked, the entire group is highlighted as a single element when focused.
- When you press `Enter`, the link is clicked or an action is performed.

### Table

- Cells and controls inside get focus using `Tab` only.
- Both rows and single elements in a row get `focus`. Besides, in this case, the rows are presented as a list and you can move through them with arrows. And inside rows — using `Tab`.
- When a cell/control gets `focus`, it is highlighted with a blue outline.
- When you press `Enter`, an event occurs, as if you press the mouse button. If the entire row have `focus`, you follow the link, and if only the icon has `focus`, then the action is performed, etc.

@## Navigating the dropdown using the keyboard

Particular cases about focus behavior when working with dropdown are described below. _If you see that some of them are missing, please contact us._

@## Focus OnClick when there are no controls in the dropdown

1. By clicking/pressing `Tab`, the trigger gains focus.
2. When the trigger is focused, pressing `Enter`/`Space` opens a dropdown.
3. If the trigger opens the select, you can also use the arrow down `↓` to move to dropdown.
4. Pressing `Esc` key closes the dropdown, and focus remains on the trigger.

`Shift + Tab` moves focus to the previous control, and popper` closes.

![keyboard navigation example](static/keyboard-nav1.png)

@## Focus OnMouseEnter on dropdown control

1. By hovering over / pressing `Tab`, the focus falls on the trigger — popper opens immediately.
2. The dropdown closes by pressing `Esc`, and **focus remains on the trigger**.
3. `Shift + Tab` moves focus to the previous control, and popper` closes.

![keyboard navigation example](static/keyboard-nav2.png)

@## Focus OnClickwhen when there is a single control in the dropdown

1. By clicking/pressing `Tab`, the trigger gains focus.
2. When you focus on trigger, `Enter`/`Space` opens a dropdown. If the trigger opens a select/menu, you can also switch to popper by using the `↓` arrow.
3. Pressing `Shift + Tab` closes the popper and returns focus to the trigger.
4. Pressing `Esc` closes the dropdown, even if the focus was on the control inside the dropdown. After closing the dropdown, focus remains on the trigger.
5. Clicking on the `Submit` control inside the dropdown closes it and returns focus to the trigger.
6. If you focus on the control inside the dropdown, the `Tab` click will move focus back to the trigger. And so it cycles in a circle until the dropdown is closed with `Esc`.

![keyboard navigation example](static/keyboard-nav3.png)

@## Focus OnClick when there are multiple controls in the dropdown

1. By clicking/pressing `Tab`, the trigger gains focus.
2. When you focus on trigger, `Enter`/`Space` opens a dropdown. If the trigger opens a select/menu, then you can also shift to the dropdown using the `↓` arrow.
3. `↓` in the menu shifts the focus to the next `menuItem`. From the last `menuItem`, the focus moves to the first `menuItem`. The same logic applies to the `↑` key, but backwards 🙃
4. You can use `Shift + Tab` to return to the previous control inside the dropdown.
5. Pressing `Esc` closes the dropdown, even if the focus was on the control inside the dropdown. After closing the dropdown, focus remains on the trigger.
6. `Shift + Tab` returns to the control that opened the dropdown.
7. Clicking the `Submit` control in the dropdown closes it and leaves the focus on the trigger.
8. If focus is on controls inside the dropdown, clicking on `Tab` will move the focus back to the trigger. And so forth and so on until the dropdown is closed using `Esc`.

![keyboard navigation example](static/keyboard-nav4.png)

@## Focus on onClick when there is another dropdown in the dropdown

A dropdown inside another dropdown has the same situation as in the above case.
