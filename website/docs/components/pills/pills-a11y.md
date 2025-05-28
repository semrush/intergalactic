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
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Tab`                        | When focus moves to the Pills, it moves to the active `Pills.Item`.                                                                                    |
| `Left Arrow` , `Right Arrow` | Set `checked` value to the next/previous button in the group. If focus is on the last/first button, moves focus to the first/last button respectively. |

With `behavior='manual'` :

Table: Keyboard support

| Key                          | Function                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                        | When focus moves to the Pills, the active `Pills.Item` gets it.                                                                                |
| `Left Arrow` , `Right Arrow` | Moves focus to the next/previous button in the group. If focus is on the last/first button, moves focus to the first/last button respectively. |
| `Space`/`Enter`              | Change `Pills.Item` state to `active`.                                                                                                         |

See detailed information about the keyboard support for clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#any-other-controls-filtertrigger-pills-tabline-etc).

### Roles and attributes

Table: Roles and attributes

| Role         | Attribute              | Element  | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `radiogroup` |                        | `div`    | Used for Pills with `behavior='auto'`. Identifies the `div` element as a container for a group of `radio` buttons. Isn’t focusable because focus is managed using a roving tabindex strategy as described below.                                                                                                                                                                                                                                                         |
| `radio`      |                        | `div`    | `div`                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Used for Pills with `behavior='auto'`. Identifies the `div` element as an ARIA `radio` button. The accessible name is computed from the child text content of the `div` element. |
| `tablist`    |                        | `div`    | Used for Pills with `behavior='manual'`. Indicates that the element serves as a container for a set of tabs.                                                                                                                                                                                                                                                                                                                                                             |
| `tab`        |                        | `button` | Used for Pills with `behavior='manual'`. Indicates the element serves as a `tab` control.                                                                                                                                                                                                                                                                                                                                                                                |
|              | `tabIndex="0"`         | `div`    | Makes the radio button focusable and includes it in the page `Tab` sequence. Set on only one radio in the radio group. On page load, is set on the first radio button in the radio group. Moves with focus inside the radio group so the most recently focused radio button is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |
|              | `tabindex="-1"`        | `div`    | Makes the element focusable but not part of the page `Tab` sequence. Applied to all radio buttons contained in the radio group except for one that is included in the page `Tab` sequence. This approach to managing focus is described in the section on [Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents).                                                                                           |
|              | `aria-checked="true"`  | `div`    | Identifies `radio` buttons which is checked. CSS attribute selectors (for example `[aria-checked="true"]` ) are used to synchronize the visual states with the value of the `aria-checked` attribute.                                                                                                                                                                                                                                                                    |
|              | `aria-checked="false"` | `div`    | Identifies `radio` buttons which are not checked. CSS attribute selectors (for example `[aria-checked="false"]` ) are used to synchronize the visual states with the value of the `aria-checked` attribute.                                                                                                                                                                                                                                                              |

## Considerations for developers

Ensure that `behavior` prop value is suitable for the use case. If you need to use Pills as a group of radio buttons, set `behavior='auto'`. If you need to use Pills as a group of tabs, set `behavior='manual'`.

When using Pills as tabs, ensure the following:

1. Apply the `tabpanel` role to the content that corresponds to each tab.
2. Add the `aria-labelledby` attribute to the content that corresponds to each tab.
3. Include the `aria-controls` attribute for each pill, linking it to the corresponding content.

Refer [Using as tabs example](/components/pills/pills-code#using-as-tabs).

### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Attributes

| Attribute                 | Element | Usage                                                             |
| ------------------------- | ------- | ----------------------------------------------------------------- |
| `aria-labelledby="IDREF"` | `div`   | Refers to the element that contains the label of the radio group. |

## Resources

- [W3 radio group examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html) has detailed information about the radio group accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons) gives core recommendations for the accessible radio buttons.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
