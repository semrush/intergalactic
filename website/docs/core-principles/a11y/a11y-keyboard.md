---
title: Keyboard support
---

@## Points to check

Make sure that it's possible to interact with your interface using a keyboard only.

- Check the focus on the site using the `Tab` key to make sure that it correctly navigates between the interface elements.
- Focus order between the interface elements should switch in a logical order, usually from left to right and from top to bottom. This is true for interfaces with LTR layout.
- Check if there is a visible focus indicator in your interface for all elements user can interact with.
- Check if the interaction with forms and links using the `Enter` and `Space` keys works correctly.
- Check that it's possible to cancel actions and close modal windows with the `Esc` key
- Use hotkeys on the website. Avoid overriding hotkeys. For example, don't override `Control+C` (or `Command+C` on Mac).
- When opening a modal window, focus should move to the window, and then return back to the control that activated the modal.

> Note that the components of the design system already can be operated with the keyboard, and all the sections below about working with the keyboard for specific components and interface elements describes how it already works in design system components. **But everything related to the focus order and using hotkeys, you should always verify in your own interface.**

@## Basic rules

> **Brief guide to keyboard control**
>
> - **Tab** moves `focus` between the interactive elements on the page / in the dropdown / modal window, etc.
> - **Shift** + **Tab** returns `focus` to the previous interactive element. If dropdown is open, it closes.
> - **Enter**, **Space** or **↓** **(for the select/menu trigger)** opens a dropdown. And if it has interactive elements inside, `focus` moves to the first one.
> - `Down Arrow` inside the dropdown moves `focus` to the next `menuItem`. From the last `menuItem`, the `focus` moves to the first `menuItem`. The same logic applies to the `Top Arrow`, but backwards 🙃
> - **Esc** discardes choice or closes the dropdown. If the `focus` was on the control inside the dropdown, `Esc` removes the `focus` from the interactive element and closes the dropdown.

Keyboard control should be performed sequentially across all interactive elements (which have focus) on the page.

- The focus state for all controls appears by pressing the `Tab` key.
- For inputs and text fields, focus also appears by `onClick`.
- When navigating the keyboard all controls are highlighted with a blue border (see keyboard-focus tokens in [Design tokens](/style/design-tokens/#semantic_tokens)). Exceptions are inputs and text fields when validating, that on focus have same border color (orange or green).
- The focus inside groups of controls is consistent. After the last control in the group, the focus should move to the next control in the interface.
- If the control has a tooltip in the `hover` state, it should appear on focus with `Tab`.

@## Keyboard support for button, link, input, etc.

### Link и hint link

- Links get focus by pressing the `Tab` key.
- Links are highlighted with a blue border (see keyboard-focus tokens [Design tokens](/style/design-tokens/#semantic_tokens)).
- When you press `Enter`, the link is clicked or an action is performed.

> Note that links (anchor elements) are only keyboard operable by default if they have a valid href attribute.

### Button

- Buttons are highlighted with a blue outline when focused on, regardless of the button color.
- When you press `Enter`, the link is clicked or an action is performed.

### Input и textarea

- Input fields get focus by pressing the `Tab` key.
- When focused, the fields are highlighted with a blue outline. For fields that have been validated, the outline corresponds to the border color (e.g., orange).
- The target action is performed by pressing `Enter` (saving, applying a filter, etc.).

### Checkbox, radio и switch

- Selection controls get focus when you press `Tab`.
- When focused, the controls are highlighted with a blue outline. For controls that have been validated, the outline corresponds to the border color (e.g., orange).
- When you press `Enter`, an element is checked/unchecked, depending on the initial state.

### Any other controls (FilterTrigger, Pills, TabLine, etc.)

- The control gets focus when you press `Tab`.
- When focused, controls are highlighted with a blue outline, regardless of the color of the control.
- When you press `Enter`, an event occurs. _For example, a dropdown opens._
- If a tooltip should appear on hovering over the control, then when pressing `Tab`, it will appear when focused.

### Images as links or clickable groups

- These elements get focus by pressing the `Tab`.
- If all elements of a group perform the same action when clicked, the entire group is highlighted as a single element when focused.
- When you press `Enter`, the link is clicked or an action is performed.

### Table

- Table cells should only receive keyboard focus if they are interactive. In these cases, using the `grid` role on the entire table would be more appropriate.
- Controls inside the table cells get focus using `Tab` only.
- Both rows and single elements in a row get `focus`. Besides, the rows are presented as a list and you can move through them with arrows. And inside rows — using `Tab`.
- When you press `Enter`, an event occurs, as if you press the mouse button. If the entire row have `focus`, you follow the link, and if only the icon has `focus`, then the action is performed, etc.

@## Keyboard support for dropdown

Common cases about focus behavior when working with dropdown are described below.

@## Focus, OnClick and dropdown

1. By pressing `Tab`, the trigger gets focus.
2. When the trigger is focused, pressing `Enter`/`Space` opens a dropdown.
3. If the trigger opens the select, you can also use the `Down Arrow` to move to dropdown.
4. Pressing `Esc` key closes the dropdown, and focus remains on the trigger.

`Shift + Tab` moves focus to the previous control, and popper closes.

![keyboard control example](/core-principles/a11y/static/keyboard-nav1.png)

@## Focus, OnMouseEnter and dropdown

1. By hovering over / pressing `Tab`, the focus falls on the trigger — popper opens immediately.
2. The dropdown closes by pressing `Esc`, and **focus remains on the trigger**.
3. `Shift + Tab` moves focus to the previous control, and popper closes.

![keyboard control example](/core-principles/a11y/static/keyboard-nav2.png)

@## Focus, OnClick and dropdown with a single interactive element

1. By pressing `Tab`, the trigger gets focus.
2. When you focus on trigger, `Enter`/`Space` opens a dropdown. If the trigger opens a select/menu, you can also switch to popper by using the `Down Arrow`.
3. Pressing `Shift + Tab` closes the popper and returns focus to the trigger.
4. Pressing `Esc` closes the dropdown, even if the focus was on the control inside the dropdown. After closing the dropdown, focus remains on the trigger.
5. Pressing the `Submit` control inside the dropdown closes it and returns focus to the trigger.
6. If you focus on the control inside the dropdown, the `Tab` click will move focus back to the trigger. And so it cycles in a circle until the dropdown is closed with `Esc`.

![keyboard control example](/core-principles/a11y/static/keyboard-nav3.png)

@## Focus, OnClick and dropdown with multiple interactive elements

1. By pressing `Tab`, the trigger gets focus.
2. When you focus on trigger, `Enter`/`Space` opens a dropdown. If the trigger opens a select/menu, then you can also shift to the dropdown using the `Down Arrow`.
3. `Down Arrow` in the menu shifts the focus to the next `menuItem`. From the last `menuItem`, the focus moves to the first `menuItem`. The same logic applies to the `Top Arrow` key, but backwards 🙃
4. You can use `Shift + Tab` to return to the previous control inside the dropdown.
5. Pressing `Esc` closes the dropdown, even if the focus was on the control inside the dropdown. After closing the dropdown, focus remains on the trigger.
6. `Shift + Tab` returns to the control that opened the dropdown.
7. Pressing the `Submit` control in the dropdown closes it and leaves the focus on the trigger.
8. If focus is on controls inside the dropdown, clicking on `Tab` will move the focus back to the trigger. And so forth and so on until the dropdown is closed using `Esc`.

![keyboard control example](/core-principles/a11y/static/keyboard-nav4.png)

@## Focus, onClick and dropdown in the dropdown

A dropdown inside another dropdown has the same situation as in the above case.

@## Resources

- [Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)
- [Keyboard Accessible](https://www.w3.org/TR/WCAG21/#keyboard-accessible)
- [Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap)
- [Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)
- [Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [On Focus](https://www.w3.org/TR/WCAG21/#on-focus)
