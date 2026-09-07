---
title: ColorPicker
fileSource: color-picker
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Examples('color-picker-code'), Changelog('color-picker-changelog')
---

<Playground for="ColorPicker" />

## Description

**ColorPicker** is a component that allows the user selecting a color from a predefined list or input a custom color using its HEX code.

## Component composition

![](static/color-picker-composition.png)

`ColorPicker` consists of the following:

- `ColorPicker.Trigger`
- `ColorPicker.Popper`
- `ColorPicker.Colors`: list of predefined colors
- `PaletteManager` (optional): container for user's custom colors, which includes:
  - `PaletteManager.Colors`: list of added colors
  - `PaletteManager.InputColor`: set of controls for adding new colors

## Appearance

### Trigger

ColorPicker's trigger is a Dropdown.Trigger with a circle showing the current selected color.

![](static/trigger-size.png)

### List of colors

The list of colors consists of preview swatches that display all available color values.

![](static/colorpicker-margins.png)

## Color swatch types

Color swatches can have one of the two types of appearance:

Table: Color types

| Type       | Appearance example                            | Usage                                                                                                              |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Fill       | ![](static/colorpicker-item-bg-default.png)   | Use for setting colors for markers, lines, and other non-text elements. For example, a user can pick colors to visually separate their competitors. |
| Text color | ![](static/colorpicker-item-text-default.png) | Use for changing the Tag color, for example                                                                        |

## Dropdown

### Height

The height of the dropdown depends on its content.

Showing all available colors in the dropdown is crucial. However, if there's more than 5 rows of colors, you should limit the height and display a scrollbar.

Table: DropdownMenu appearance

| Default dropdown              | Dropdown with more than 5 rows of colors |
| ----------------------------- | ---------------------------------------- |
| ![](static/dropdown-menu.png) | ![](static/scroll.png)                   |

## Interaction

### Background color

Table: Background color item states

| Item type       | Normal                                           | Hover                                          | Active                                          |
| --------------- | ------------------------------------------------ | ---------------------------------------------- | ----------------------------------------------- |
| Predefined fill | ![](static/colorpicker-item-bg-default.png)      | ![](static/colorpicker-item-bg-hover.png)      | ![](static/colorpicker-item-bg-active.png)      |
| Custom fill     | ![](static/colorpicker-item-custom-default.png)  | ![](static/colorpicker-item-custom-hover.png)  | ![](static/colorpicker-item-custom-active.png)  |
| No fill         | ![](static/colorpicker-item-nocolor-default.png) | ![](static/colorpicker-item-nocolor-hover.png) | ![](static/colorpicker-item-nocolor-active.png) |

### Text color

Table: Text color item states

| Item type        | Normal                                                | Hover                                               | Active                                               |
| ---------------- | ----------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| Predefined text color | ![](static/colorpicker-item-text-default.png)         | ![](static/colorpicker-item-text-hover.png)         | ![](static/colorpicker-item-text-active.png)         |
| Custom text color     | ![](static/colorpicker-item-custom-text-default.png)  | ![](static/colorpicker-item-custom-text-hover.png)  | ![](static/colorpicker-item-custom-text-active.png)  |
| No text color    | ![](static/colorpicker-item-text-nocolor-default.png) | ![](static/colorpicker-item-text-nocolor-hover.png) | ![](static/colorpicker-item-text-nocolor-active.png) |

### Adding colors

Table: States of item for adding colors

| Item type            | Normal                          | Hover                         | Active                         |
| -------------------- | ------------------------------- | ----------------------------- | ------------------------------ |
| **Add color** button | ![](static/btn-add-default.png) | ![](static/btn-add-hover.png) | ![](static/btn-add-active.png) |

## Custom colors (optional)

Users have the ability to add or remove custom colors, but they can't modify predefined colors.

::: tip
We recommend that your product sync and save the user's custom palette in different parts of the interface.
:::

### Adding custom color

Users can add a color to the custom palette by entering the value into the input field and saving it by pressing `Enter` or clicking the `Check` button.

![](static/add-custom-color.png)

The input field only allows six characters, including numbers and letters from A to F. If the user enters fewer or more characters, or characters that can't be converted to a 6-character HEX value, the input gets the `invalid` state.

<!-- vale DevDocs.Please = NO -->
To help users fix the invalid input, add the following message to the tooltip: "Please enter 6 latin letters and/or digits."
<!-- vale DevDocs.Please = YES -->

![](static/validation.png)

::: tip
User can enter both upper-case and lower-case characters, but the input will save them as upper-case.
:::

### Removing custom color

![](static/remove-custom-color.png)

## Usage in UX/UI

Components that you can use as a trigger for the ColorPicker:

- [Input](/components/input/input)
- [Link component](/components/link/link)
- [Select](/components/select/select)

![](static/color-picker-triggers.png)

<!-- ColorPicker.Item is now deprecated -->

<!-- `ColorPicker.Item` can be placed inside other components, such as:

- [Button](/components/button/button)
- [FilterTrigger](/components/filter-trigger/filter-trigger)
- [Pills](/components/pills/pills)
- [Select/Multiselect](/components/select/select)
- [TabLine](/components/tab-line/tab-line)
- [TabPanel](/components/tab-panel/tab-panel)
- [Tag](/components/tag/tag)

![](static/color-picker-places.png) -->

