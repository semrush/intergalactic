---
title: Accessibility
tabs: Main terms('a11y'), Development requirements('a11y-general'), Keyboard support('a11y-keyboard'), Design requirements('a11y-design')
---

## Points to check

Make sure that it's possible to interact with your interface using a keyboard only.

- Check the focus on the site using the `Tab` key to make sure that it correctly navigates between the interface elements.
- Focus order between the interface elements should switch in a logical order, usually from left to right and from top to bottom. This is true for interfaces with LTR layout.
- Check if there is a visible focus indicator in your interface for all elements user can interact with.
- Check if the interaction with forms and links using the `Enter` and `Space` keys works correctly.
- Check that it's possible to cancel actions and close modal windows with the `Esc` key
- Use hotkeys on the website. Avoid overriding hotkeys. For example, don't override `Control+C` (or `Command+C` on Mac).
- When opening a modal window, focus should move to the window, and then return back to the control that activated the modal.

::: tip
Note that the components of the design system already can be operated with the keyboard, and all the sections below about working with the keyboard for specific components and interface elements describes how it already works in design system components. **But everything related to the focus order and using hotkeys, you should always verify in your own interface.**
:::

## Basic rules

::: tip
**Brief guide to keyboard control**

- **Tab** moves `focus` between the interactive elements on the page / in the dropdown / modal window, etc.
- **Shift** + **Tab** returns `focus` to the previous interactive element.
- **Enter**, **Space** or **↓** **(for the select/menu trigger)** opens a dropdown.
- `Down Arrow` inside the dropdown moves `focus` to the next `menuItem`. From the last `menuItem`, `focus` moves to the first `menuItem`. The same logic applies to the `Top Arrow`, but backwards 🙃
- **Esc** discards choice or closes the dropdown / modal. If the `focus` was inside the dropdown, `Esc` returns `focus` to the dropdown's trigger and closes the dropdown.
:::

Keyboard control should be performed sequentially across all interactive elements (which have focus) on the page.

- The focus state for all controls appears by pressing the `Tab` key.
- For inputs and text fields, focus also appears by `onClick`.
- When navigating the keyboard all controls are highlighted with a blue border (see keyboard-focus tokens in [Design tokens](/style/design-tokens/design-tokens#semantic-tokens)). Exceptions are inputs and text fields when validating, that on focus have same border color (orange or green).
- The focus inside groups of controls is consistent. After the last control in the group, the focus should move to the next control in the interface.
- If the control has a tooltip in the `hover` state, it should appear on focus with `Tab`.

## Keyboard support for controls

### Link

- Links get focus by pressing the `Tab` key.
- Links are highlighted with a blue border (see keyboard-focus tokens [Design tokens](/style/design-tokens/design-tokens#semantic-tokens)).
- When you press `Enter`, the link is activated.

::: tip
Note that links (anchor elements) are only keyboard operable by default if they have a valid href attribute.
:::

### Button

- Buttons are highlighted with a blue border (see keyboard-focus tokens [Design tokens](/style/design-tokens/design-tokens#semantic-tokens)), regardless of the button theme.
- When you press `Enter` or `Space`, the button is activated.

### Input and textarea

- Input fields get focus by pressing the `Tab` key.
- When focused, the fields are highlighted with a blue outline. For fields that have been validated, the outline corresponds to the border color (for example, orange).
- The target action is performed by pressing `Enter` (saving, applying a filter, etc.).

### Checkbox, radio and switch

- Selection controls get focus when you press `Tab`.
- When focused, the controls are highlighted with a blue outline. For controls that have been validated, the outline corresponds to the border color (for example, orange).
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
- Both rows and single elements in a row get `focus`. Besides, the rows are presented as a list and you can move through them with arrows. And inside rows – using `Tab`.
- When you press `Enter`, an event occurs, as if you press the mouse button. If the entire row have `focus`, you follow the link, and if only the icon has `focus`, then the action is performed, etc.

<!-- ## Keyboard support for popper

Common cases about focus behavior when working with all kind of poppers (dropdown, select, tooltip, etc.) are described below.

::: tip
The trigger always has a `tabIndex=0` (even when disabled) or is an input/textarea. The popper always has a `tabIndex=0`.
:::

## Focus, OnClick and popper

1. By pressing `Tab`, the trigger gets focus.
2. When the trigger is focused, pressing `Enter`/`Space` opens a popper.
3. If the trigger opens the select, you can also use the `Down Arrow` to move to the select's options.
4. Pressing `Esc` key closes the popper, and focus remains on the trigger.

`Shift + Tab` moves focus to the previous control, and popper closes.

![](/core-principles/a11y/static/keyboard-nav1.png)

## Focus, OnMouseEnter and popper

1. By hovering over / pressing `Tab`, the trigger gets the focus, and popper opens.
2. The popper closes by pressing `Esc`, and **focus remains on the trigger**.
3. `Shift + Tab` moves focus to the previous control, and popper closes.

![](/core-principles/a11y/static/keyboard-nav2.png)

## Focus, OnClick and popper with a single interactive element

1. By pressing `Tab`, the trigger gets focus.
2. When you focus on trigger, `Enter`/`Space` opens a popper. If the trigger opens a select/menu, you can also open the popper by using the `Down Arrow`.
3. `Tab` key moves focus inside the popper to the interactive element.
4. Pressing `Esc` closes the popper, even if the focus was on the control inside it. After closing the popper, focus returns to the trigger.
5. Pressing the "Submit" control inside the popper closes it and returns focus to the trigger.

![](/core-principles/a11y/static/keyboard-nav3.png)

## Focus, OnClick and popper with multiple interactive elements

1. By pressing `Tab`, the trigger gets focus.
2. When you focus on trigger, `Enter`/`Space` opens a popper. If the trigger opens a select/menu, then you can also open the popper using the `Down Arrow`.
3. `Down Arrow` in the menu shifts the focus to the next `menuItem`. From the last `menuItem`, the focus moves to the first `menuItem`. The same logic applies to the `Top Arrow` key, but backwards 🙃
4. `Tab` key moves focus inside the popper between the interactive elements. It cycles in a circle until the popper is closed.
5. Pressing `Esc` closes the popper, even if the focus was on the control inside it. After closing the popper, focus remains on the trigger.
6. Pressing the "Submit" control in the popper closes it and leaves the focus on the trigger.

![](/core-principles/a11y/static/keyboard-nav4.png)

## Focus, onClick and popper in the popper

A popper inside another popper has the same situation as in the above case. -->

## Keyboard support for modal window

Common cases about focus behavior when working with dropdown are described below.

1. By pressing `Tab`, the trigger gets focus.
2. When the trigger is focused, pressing `Enter`/`Space` opens a modal window.
3. You can use `Tab` and `Shift + Tab` to move between all the interactive elements inside the window.
4. Pressing `Esc` key (or `Close` icon, "Submit", or "Cancel" buttons) closes the modal window, and focus remains on the trigger.

## Resources

- [Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)
- [Keyboard Accessible](https://www.w3.org/TR/WCAG21/#keyboard-accessible)
- [Keyboard](https://www.w3.org/TR/WCAG21/#keyboard)
- [No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap)
- [Focus Order](https://www.w3.org/TR/WCAG21/#focus-order)
- [Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible)
- [On Focus](https://www.w3.org/TR/WCAG21/#on-focus)
