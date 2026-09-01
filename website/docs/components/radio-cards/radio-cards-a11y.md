---
title: RadioCards
fileSource: radio-cards
tabs: Design('radio-cards'), A11y('radio-cards-a11y'), API('radio-cards-api'), Examples('radio-cards-code'), Changelog('radio-cards-changelog')
---

## What component has

Component `RadioCards` functions as a group of radio buttons.

### Keyboard support

Table: Keyboard support

| Key                          | Function                                                                                                                                               |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Tab`                        | When focus moves to the `RadioCards`, it moves to the active `RadioCards.Item`.                                                                                    |
| `Left Arrow` , `Right Arrow` | Set `checked` value to the next/previous button in the group. If focus is on the last/first button, moves focus to the first/last button respectively. |

See detailed information about the keyboard support for clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#any-other-controls-filtertrigger-pills-tabline-etc).

### Roles & attributes

The following list describes roles and attributes that the component with already has.

Table: Roles & attributes

| Component / Element | Roles & attributes          | Usage                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RadioCards`             | `radiogroup`                | Identifies the `div` element as a container for a group of radio buttons. Isn’t focusable because focus is managed using a roving tabindex strategy as described below.                                                                                                                                                                                        |
| `RadioCards.Item`        | `radio`                     | Identifies the `div` element as an ARIA radio button. The accessible name is computed from the child text content of the `div` element.                                                                                                                                                                                                                        |
|                     | `tabIndex="0"`              | Makes the radio button focusable and includes it in the page `Tab` sequence. Set on only one radio in the radio group. Moves with focus inside the radio group so the most recently focused radio button is included in the page `Tab` sequence. This approach to managing focus is described in the section on [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |
|                     | `tabindex="-1"`             | Makes the element focusable but not part of the page `Tab` sequence. Applied to all radio buttons contained in the radio group except for one that's included in the page `Tab` sequence. This approach to managing focus is described in the section on [Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents).                        |
|                     | `aria-checked="true/false"` | Identifies whether radio buttons are checked or unchecked.                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                      |

## Considerations for developers

Since `RadioCards` behaves as a radio group, do not forget to add the `aria-labelledby` or `aria-label` attribute to the root element.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons) gives core recommendations for the accessible radio buttons.

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
