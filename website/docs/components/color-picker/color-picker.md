---
title: ColorPicker
tabName: Design
fileSource: color-picker
---

@import playground

@## Description

**ColorPicker** is a component that allows the user selecting a color from a given list or input a custom color using its HEX code.

**ColorPicker contains:**

- Trigger
- List of ColorPicker.Items
- Input (optional)

@## Trigger

The trigger for a ColorPicker is a Select with a circle as the leading addon.

![Color picker trigger](static/trigger.png)

### Sizes

![Color picker trigger size](static/trigger-size.png)

@## List of colors

A list of colors can include either a single ColorPicker.Item or multiple ones, which are preview swatches that display all available color values.

| ColorPicker.Item                                             | List of ColorPicker.Items                             |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Color picker item](static/colorpicker-item-bg-default.png) | ![Color picker inline](static/colorpicker-inline.png) |

@## Size

ColorPicker.Item has 28px * 28px size.

![Color picker item size](static/colorpicker-item-size.png)

@## Margins

All margins must be [multiples of 4](/layout/box-system/#spacing_system). The default recommended margins are 4px:

![ColorPicker margins](static/colorpicker-margins.png)

@## Item types

An item can have two different types:

| Type            | Appearance example                                                             | Usage                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Item for background color | ![Color picker item background default](static/colorpicker-item-bg-default.png) | Use for changing the background color. For example, a user can pick colors to visually separate their competitors. |
| Item for text color      | ![Color picker item text default](static/colorpicker-item-text-default.png)    | Use for changing the Tag color, e.g.                                                                                             |

@## Interaction

- In the hover state, trigger has a `border: 1px solid var(--border-secondary);`.
- In the active state, trigger changes its border color to `var(--border-info-active);`.

### Default item

| | Normal | Hover | Active | Usage |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item background default](static/colorpicker-item-bg-default.png) | ![Color picker item background hover](static/colorpicker-item-bg-hover.png) | ![Color picker item background active](static/colorpicker-item-bg-active.png)| Use for changing the background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing text and background colors of other components.|
| No background color | ![Color picker item  no color background default](static/colorpicker-item-nocolor-default.png) | ![Color picker item no color background hover](static/colorpicker-item-nocolor-hover.png) | ![Color picker item no color background active](static/colorpicker-item-nocolor-active.png)| Use when no color is selected.|
| No text color | ![Color picker item background default](static/colorpicker-item-text-nocolor-default.png) | ![Color picker item background hover](static/colorpicker-item-text-nocolor-hover.png) | ![Color picker item background active](static/colorpicker-item-text-nocolor-active.png)| Use when no color is selected.|

### Item for custom colors

| | Normal | Hover | Active | Usage |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item background default](static/colorpicker-item-custom-default.png) | ![Color picker item background hover](static/colorpicker-item-custom-hover.png) | ![Color picker item background active](static/colorpicker-item-bg-active.png)| Use for changing the background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-custom-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing the text and background colors of other components.|

### Item for adding colors

| | Normal | Hover | Active | Usage |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Add color button | ![Button add default](static/btn-add-default.png) | ![Button add hover](static/btn-add-hover.png) | ![Button add active](static/btn-add-active.png)| Use Button with icon and change border-radius to 50%.|

@## Dropdown

### Width and height

**The recommended width of a dropdown is 188px.** The height of a dropdown list depends on its content.

Showing all available colors in the dropdown menu is crucial, however, if a user has added more than 20 custom colors, a scrollbar should be displayed.

| Dropdown menu | Dropdown menu with more than 20 colors |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Dropdown menu](static/dropdown-menu.png) | ![Dropdown menu with scroll](static/scroll.png) |

### Margins and paddings

![Dropdown menu margins and paddings](static/colorpicker-margins-paddings.png)

@## Input (optional)

In case when a ColorPicker allows users to add custom colors, include an input that only accepts HEX values. For more information, refer to the [Validation section](/components/color-picker/#validation).

### Size, margins and paddings

Use input with M size.

![Color picker input and margins](static/colorpicker-input-margins.png)

### Value

The color value is always a 6-character string that specifies the color in the HEX format.

> User can enter both upper-case and lower-case characters, but the input will save them as upper-case.

@## Interaction

Users have the ability to add or remove custom colors, but they cannot modify default or existing custom colors.

### Adding custom color

> We recommend that your product sync and save the user's custom palette in different parts of the interface.

Users can add a color to the custom palette by clicking either the button with the `MathPlus` icon or the input field. They can add a color value by clicking the `Check` icon and remove a color by clicking the `Close` icon.

![Add custom color](static/add-custom-color.png)

### Removing custom color

![Remove custom color](static/remove-custom-color.png)

@## Validation

The input field only allows six characters, which can include numbers and letters. If the user enters fewer or more characters or characters that cannot be converted to a 6-character HEX value, the input gets the `invalid` state.

To help users fix the invalid input, add the following message to the tooltip: "Please enter 6 latin letters and/or digits."

![Validation](static/validation.png)

@## Use in UX/UI

Components that you can use as a trigger for the ColorPicker:

- [Input](/components/input/)
- [Link](/components/link/)
- [Select](/components/select/)

![Color picker triggers](static/color-picker-triggers.png)

ColorPicker.Item can be placed inside the following components:

- [Button](/components/button/)
- [FilterTrigger](/components/filter-trigger/)
- [Pills](/components/pills/)
- [Select/Multiselect](/components/select/)
- [TabLine](/components/tab-line/)
- [TabPanel](/components/tab-panel/)
- [Tag](/components/tag/)
- [Option](/components/dropdown-menu/#a66af9)

![Color picker places](static/color-picker-places.png)

@page color-picker-a11y
@page color-picker-api
@page color-picker-code
@page color-picker-changelog
