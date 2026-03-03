---
title: Pills
a11y: AA
tabs: Design('pills'), A11y('pills-a11y'), API('pills-api'), Example('pills-code'), Changelog('pills-changelog')
---

## What component has

Note that the Pills component can function as either a group of radio buttons or a group of tabs, depending on the use case. To select the desired behavior, use the `behavior` property ([refer to the example](/components/pills/pills-code#using-as-tabs)).

### Keyboard support

With `behavior='auto'` (default):

Table: Keyboard support

| Key                          | Function                                                                                                                                               |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Tab`                        | When focus moves to the Pills, it moves to the active `Pills.Item`.                                                                                    |
| `Left Arrow` , `Right Arrow` | Set `checked` value to the next/previous button in the group. If focus is on the last/first button, moves focus to the first/last button respectively. |

With `behavior='manual'`:

Table: Keyboard support

| Key                          | Function                                                                                                                                       |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `Tab`                        | When focus moves to the Pills, the active `Pills.Item` gets it.                                                                                |
| `Left Arrow` , `Right Arrow` | Moves focus to the next/previous button in the group. If focus is on the last/first button, moves focus to the first/last button respectively. |
| `Space`/`Enter`              | Change `Pills.Item` state to `active`.                                                                                                         |

See detailed information about the keyboard support for clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#any-other-controls-filtertrigger-pills-tabline-etc).

### Roles & attributes

The following list describes roles and attributes that the component with already has.

For `behavior='auto'` (default):

Table: Roles & attributes

| Component / Element | Roles & attributes          | Usage                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Pills`             | `radiogroup`                | Used for Pills with `behavior='auto'`. Identifies the `div` element as a container for a group of radio buttons. Isn’t focusable because focus is managed using a roving tabindex strategy as described below.                                                                                                                                                                                        |
| `Pills.Item`        | `radio`                     | Used for Pills with `behavior='auto'`. Identifies the `div` element as an ARIA radio button. The accessible name is computed from the child text content of the `div` element.                                                                                                                                                                                                                        |
|                     | `tabIndex="0"`              | Makes the radio button focusable and includes it in the page `Tab` sequence. Set on only one radio in the radio group. Moves with focus inside the radio group so the most recently focused radio button is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |
|                     | `tabindex="-1"`             | Makes the element focusable but not part of the page `Tab` sequence. Applied to all radio buttons contained in the radio group except for one that's included in the page `Tab` sequence. This approach to managing focus is described in the section on [Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents).                        |
|                     | `aria-checked="true/false"` | Identifies whether radio buttons are checked or unchecked.                                                                                                                                                                                                                                                                                                                                            |

For `behavior='manual'` :

Table: Roles & attributes

| Component / Element | Roles & attributes           | Usage                                                                                                                                                                                                                                                                                                                                                                                     |
|---------------------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Pills`             | `tablist`                    | Used for Pills with `behavior='manual'`. Indicates that the element serves as a container for a set of tabs.                                                                                                                                                                                                                                                                              |
| `Pills.Item`        | `tab`                        | Used for Pills with `behavior='manual'`. Indicates the element serves as a tab control.                                                                                                                                                                                                                                                                                                   |
|                     | `tabIndex="0"`               | Makes the tab control focusable and includes it in the page `Tab` sequence. Set on only one tab in the tablist. Moves with focus inside the tablist so the most recently focused tab control is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |
|                     | `tabindex="-1"`              | Makes the element focusable but not part of the page `Tab` sequence. Applied to all tab controls contained in the tablist except for one that's included in the page `Tab` sequence. This approach to managing focus is described in the section on [Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents).                 |
|                     | `aria-selected="true/false"` | Indicates whether the tab is active and its panel is displayed. `true` for the active tab (when a user activates it), `false` for all other tabs in the set. Doesn't change when focus moves within the tablist.                                                                                                                                                                         |

## Considerations for developers

Ensure that `behavior` prop value is suitable for the use case. If you need to use Pills as a group of radio buttons, set `behavior='auto'`. If you need to use Pills as a group of tabs, set `behavior='manual'`.

The following recommendations will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

**When using Pills as tabs (`behavior='manual'`), ensure the following:**

1. Apply the `tabpanel` role to the content that corresponds to each tab.
2. Add the `aria-labelledby` attribute to the content that corresponds to each tab.
3. Include the `aria-controls` attribute for each pill, linking it to the corresponding content.

Refer to the [Using as tabs example](/components/pills/pills-code#using-as-tabs).

**When using Pills as radio buttons (`behavior='auto'`),** add the `aria-labelledby` attribute to the radio group to reference the element that contains its label.

## Resources

- [Examples from W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) have detailed information about the tabs behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons) gives core recommendations for the accessible radio buttons.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
