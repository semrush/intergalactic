---
title: ColorPicker
a11y: AA
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Example('color-picker-code'), Changelog('color-picker-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key               | Function                                       |
| ----------------- | ---------------------------------------------- |
| `Tab`             | Moves focus to the next focusable element.     |
| `Shift + Tab`     | Moves focus to the previous focusable element. |
| `Space` , `Enter` | Activates the selected color.                  |
| `Esc`             | Closes the dropdown.                           |

<!-- * User can navigate inside the color palettes with the keyboard arrows. The color transition occurs sequentially – from top to bottom and from left to right. If the component has two palettes, when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
* When dropdown is closed, the focus returns to the trigger. -->

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Component / element                           | Roles & attributes                                               | Usage                                                                                                                                                                                                                                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ColorPicker.Trigger`                         | `combobox`, `aria-haspopup="dialog"`, `aria-label="Color field"` | `combobox` identifies an element as an input that controls another element, such as a `listbox` or `grid` , that can dynamically pop up to help the user set the value of that input. `aria-haspopup="dialog"` indicates that a dialog popup can be triggered by the element with this attribute. |
| `ColorPicker.Popper`                          | `dialog`, `aria-label="Colors palette"`                          | `dialog` identifies the element as a dialog.                                                                                                                                                                                                                                                      |
| `ColorPicker.Colors`, `PaletteManager.Colors` | `listbox`, `aria-orientation="horizontal"`                       | `listbox` identifies the focusable element that has listbox behaviors and contains the listbox options. `aria-orientation` indicates thet the element's orientation is horizontal.                                                                                                                |
| `ColorPicker.Colors`                          | `aria-label="Preset colors"`                                     | Adds label to the group of options.                                                                                                                                                                                                                                                               |
| `PaletteManager.Colors`                       | `aria-label="Custom preset colors"`                              | Adds label to the group of customazible options.                                                                                                                                                                                                                                                  |
| `ColorPicker.Item`, `PaletteManager.Item`     | `option`, `aria-selected="true/false"`                           | `option` identifies each selectable element containing the name of an option. `aria-selected="true/false"` indicates that the option is selected or not.                                                                                                                                          |
| `ColorPicker.Item`                            | `aria-label="Clear color"`                                       | Adds label to color items that can be deleted.                                                                                                                                                                                                                                                    |
| `PaletteManager.Item`                         | `aria-label={value}`                                             | Adds label to the option.                                                                                                                                                                                                                                                                         |
| Button for adding color                       | `aria-label="Add color"`                                         | Adds label to the button without visible label.                                                                                                                                                                                                                                                   |
| `ColorPicker.InputColor`                      | `aria-label="Custom color, HEX format"`                          | Provides more details on the data format that can be submitted to the input.                                                                                                                                                                                                                      |

<!-- ## Resources

[Type attribute in the Color state](https://w3c.github.io/html-aam/#el-input-color) has accessibility spec for input type color. -->

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
