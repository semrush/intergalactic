---
title: ColorPicker
fileSource: color-picker
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Example('color-picker-code'), Changelog('color-picker-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import ColorPicker from 'intergalactic/color-picker';

const Preview = (preview) => {
  const { bool } = preview('ColorPicker');

  const displayLabel = bool({
    key: 'displayLabel',
    defaultValue: false,
    label: 'Show label',
  });

  return (
    <React.Fragment>
      <ColorPicker displayLabel={displayLabel} />
    </React.Fragment>
  );
};

const App = PlaygroundGeneration(Preview);
</script>

:::

## Description

**ColorPicker** is a component that allows the user selecting a color from a given list or input a custom color using its HEX code.

**ColorPicker contains:**

- Trigger
- List of ColorPicker.Items
- Input (optional)

## Trigger

The trigger for a ColorPicker is a Select with a circle as the leading addon.

![](static/trigger.png)

### Sizes

![](static/trigger-size.png)

## List of colors

A list of colors can include either a single ColorPicker.Item or multiple ones, which are preview swatches that display all available color values.

Table: List of colors and its items

| ColorPicker.Item     | List of ColorPicker.Items                             |
| -------------------- | ----------------------------------------------------- |
| ![](static/colorpicker-item-bg-default.png) | ![](static/colorpicker-inline.png) |

## Size

ColorPicker.Item has 28px * 28px size.

![](static/colorpicker-item-size.png)

## Margins

All margins must be [multiples of 4](/layout/box-system/box-system#spacing_system). The default recommended margins are 4px:

![](static/colorpicker-margins.png)

## Item types

An item can have two different types:

Table: Color items

| Type            | Appearance example                                                             | Usage                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Item for background color | ![](static/colorpicker-item-bg-default.png) | Use for changing the background color. For example, a user can pick colors to visually separate their competitors. |
| Item for text color      | ![](static/colorpicker-item-text-default.png)    | Use for changing the Tag color, for example                                                                                             |

## Interaction

- In the hover state, trigger has a `border: 1px solid var(--border-secondary)`.
- In the active state, trigger changes its border color to `var(--border-info-active)`.

### Default item

Table: Color item states

| | Normal | Hover | Active | Usage |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![](static/colorpicker-item-bg-default.png) | ![](static/colorpicker-item-bg-hover.png) | ![](static/colorpicker-item-bg-active.png)| Use for changing the background color of other components.|
| Text color | ![](static/colorpicker-item-text-default.png) | ![](static/colorpicker-item-text-hover.png) | ![](static/colorpicker-item-text-active.png)| Use for changing text and background colors of other components.|
| No background color | ![](static/colorpicker-item-nocolor-default.png) | ![](static/colorpicker-item-nocolor-hover.png) | ![](static/colorpicker-item-nocolor-active.png)| Use when no color is selected.|
| No text color | ![](static/colorpicker-item-text-nocolor-default.png) | ![](static/colorpicker-item-text-nocolor-hover.png) | ![](static/colorpicker-item-text-nocolor-active.png)| Use when no color is selected.|

### Item for custom colors

Table: Custom color item states

| | Normal | Hover | Active                                              | Usage |
| ------------------- | ------------------------------- | -------------------------- |-----------------------------------------------------| -------------------- |
| Background color | ![](static/colorpicker-item-custom-default.png) | ![](static/colorpicker-item-custom-hover.png) | ![](static/colorpicker-item-custom-active.png)      | Use for changing the background color of other components.|
| Text color | ![](static/colorpicker-item-custom-text-default.png) | ![](static/colorpicker-item-custom-text-hover.png) | ![](static/colorpicker-item-custom-text-active.png) | Use for changing the text and background colors of other components.|

### Item for adding colors

Table: States of item for adding colors

| | Normal | Hover | Active | Usage |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Add color button | ![](static/btn-add-default.png) | ![](static/btn-add-hover.png) | ![](static/btn-add-active.png)| Use Button with icon and change border-radius to 50%.|

## Dropdown

### Width and height

**The recommended width of a dropdown is 188px.** The height of a dropdown list depends on its content.

Showing all available colors in the DropdownMenu is crucial, however, if a user has added more than 20 custom colors, a scrollbar should be displayed.

Table: DropdownMenu appearance

| DropdownMenu                  | DropdownMenu with more than 20 colors |
| ----------------------------- | ------------------------------------- |
| ![](static/dropdown-menu.png) | ![](static/scroll.png)                |

### Margins and paddings

![](static/colorpicker-margins-paddings.png)

## Input (optional)

In case when a ColorPicker allows users to add custom colors, include an input that only accepts HEX values. For more information, refer to the [Validation section](/components/color-picker/color-picker#validation).

### Size, margins and paddings

Use input with M size.

![](static/colorpicker-input-margins.png)

### Value

The color value is always a 6-character string that specifies the color in the HEX format.

::: tip
User can enter both upper-case and lower-case characters, but the input will save them as upper-case.
:::

## Interaction

Users have the ability to add or remove custom colors, but they cannot modify default or existing custom colors.

### Adding custom color

::: tip
We recommend that your product sync and save the user's custom palette in different parts of the interface.
:::

Users can add a color to the custom palette by clicking either the button with the `MathPlus` icon or the input field. They can add a color value by clicking the `Check` icon and remove a color by clicking the `Close` icon.

![](static/add-custom-color.png)

### Removing custom color

![](static/remove-custom-color.png)

## Validation

The input field only allows six characters, which can include numbers and letters. If the user enters fewer or more characters or characters that cannot be converted to a 6-character HEX value, the input gets the `invalid` state.

To help users fix the invalid input, add the following message to the tooltip: "Please enter 6 latin letters and/or digits."

![](static/validation.png)

## Usage in UX/UI

Components that you can use as a trigger for the ColorPicker:

- [Input](/components/input/input)
- [Link](/components/link/link)
- [Select](/components/select/select)

![](static/color-picker-triggers.png)

ColorPicker.Item can be placed inside the following components:

- [Button](/components/button/button)
- [FilterTrigger](/components/filter-trigger/filter-trigger)
- [Pills](/components/pills/pills)
- [Select/Multiselect](/components/select/select)
- [TabLine](/components/tab-line/tab-line)
- [TabPanel](/components/tab-panel/tab-panel)
- [Tag](/components/tag/tag)
- [Option](/components/dropdown-menu/dropdown-menu#a66af9)

![](static/color-picker-places.png)

