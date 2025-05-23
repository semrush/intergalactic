---
title: Radio
fileSource: radio
a11y: AA
tabs: Design('radio'), A11y('radio-a11y'), API('radio-api'), Example('radio-code'), Changelog('radio-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                                   | Function                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                                                 | Moves focus to the checked `radio` button in the `radiogroup`. If a `radio` button isn’t checked, focus moves to the first `radio` button in the group. In case the focus is already on a `radio` button, the next `Tab` press will move the focus to the next focusable element on the page outside the `radiogroup`. |
| `Shift + Tab`                                         | Moves focus to the previous focusable element.                                                                                                                                                                                                                                                                         |
| `Up Arrow`, `Down Arrow`, `Left Arrow`, `Right Arrow` | Moves focus to and checks the next/previous `radio` button in the group. If focus is on the last/first `radio` button, moves focus to the first/last `radio` button respectively. The state of the previously checked `radio` button is changed to unchecked.                                                          |

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component     | Role                                       | Attribute       | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RadioGroup`  | `group`                                    |                 | Identifies the `div` element as a container for a group of native `radio` inputs. Isn’t focusable because focus is managed using a roving tabindex strategy as described below.                                                                                                                                                                                                                                                                                                 |
| `Radio.Value` | `radio` implicit on `<input type="radio">` |                 | Identifies the input as an ARIA `radio` button. The accessible name is computed from the child text content of the `Radio.Text`.                                                                                                                                                                                                                                                                                                                                                |
| `Radio.Value` |                                            | `tabIndex="0"`  | Makes the radio button focusable and includes it in the page `Tab` sequence. Set on only one radio in the radio group. On page load, is set on the first radio button in the radio group. Moves with focus inside the radio group so the most recently focused radio button is included in the page `Tab` sequence. This approach to managing focus is described in the [W3C roving tabindex documentation](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd-roving-tabindex). |
| `Radio.Value` |                                            | `tabIndex="-1"` | Makes the element focusable but not part of the page `Tab` sequence. Applied to all radio buttons contained in the radio group except for one that is included in the page `Tab` sequence.                                                                                                                                                                                                                                                                                      |

## Considerations for developers

If you use `RadioGroup` component to group radio buttons, add a common label and connect it through `aria-labelledby`. Refer to the [RadioGroup example](/components/radio/radio-code#radiogroup).

Table: Attributes

| Component    | Attribute                 | Usage                                                             |
| ------------ | ------------------------- | ----------------------------------------------------------------- |
| `RadioGroup` | `aria-labelledby="IDREF"` | Refers to the element that contains the label of the radio group. |

### Grouping with fieldset

You can also group `Radio` controls using the `<fieldset>` tag. The `<legend>` tag describes the grouping. Some assistive technologies read the `<legend>` text, so it should be brief and descriptive. This helps users understand the question they are answering with the group of radio buttons.

<!-- ### Roles & attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in your interfaces.

Table: Roles and attributes

| Component | Attribute                   |  Usage             |
| --------- | --------------------------- | ---------------------------------------------------- |
| `RadioGroup` | `aria-labelledby="IDREF"` | Refers to the element that contains the label of the radio group.  | -->

## Resources

- [W3 radio group examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html) has detailed information about the radio group accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-radio-buttons) gives core recommendations for the accessible radio buttons.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
