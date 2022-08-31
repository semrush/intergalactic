---
title: ColorPicker
tabName: Design
fileSource: color-picker
beta: true
---

@import playground

@## Description

**ColorPicker** allows a user to select the color of another component from a predefined palette or specify a custom color using its hexadecimal (HEX) value.

**ColorPicker consists of the following elements:**

- **Trigger;**
- **List of ColorPicker.Items;**
- **Input (optional).**

@## Trigger

The trigger for a ColorPicker is a Select with a circle as the leading add-on.
![Color picker trigger](static/trigger.png)

### Sizes

![Color picker trigger size](static/trigger-size.png)

@## ColorPicker.Item
**The item can be one ColorPicker.Item or a list of them.**

ColorPicker.Item is a swatch preview that allows a user to see what color is currently selected.

| ColorPicker.Item                                             | List of ColorPicker.Items                             |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Color picker item](static/colorpicker-item-bg-default.png) | ![Color picker inline](static/colorpicker-inline.png) |

@## Size

We use only one size of ColorPicker.Item which is 28\*28px.
![Color picker item size](static/colorpicker-item-size.png)

@## Margins

All margins must be multiples of 4. The default recommended margins are 4px:
![ColorPicker margins](static/colorpicker-margins.png)

@## Types

An item can have two different content types:  
| Type | Appearance example | Description |
| --------------- | ------------------------------------------------------------ | --------------------------- |
| Bakground color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | Use for changing the background color. For example, a user can pick distinct colors to visually separate their competitors. |
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | Use for changing the Tag color. |

@## Interaction

In the hover state, a trigger has a border: 1px solid `var (--gray-200);`  
In the active state, a trigger changes its border color to `var (--blue-300)`

**ColorPicker.Item**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | ![Color picker item bakground hover](static/colorpicker-item-bg-hover.png) | ![Color picker item bakground active](static/colorpicker-item-bg-active.png)| Use for changing the background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing text and background colors of other components.|
| No background color | ![Color picker item  no color bakground default](static/colorpicker-item-nocolor-default.png) | ![Color picker item no color bakground hover](static/colorpicker-item-nocolor-hover.png) | ![Color picker item no color bakground active](static/colorpicker-item-nocolor-active.png)| Use when no color is selected.|
| No text color | ![Color picker item bakground default](static/colorpicker-item-text-nocolor-default.png) | ![Color picker item bakground hover](static/colorpicker-item-text-nocolor-hover.png) | ![Color picker item bakground active](static/colorpicker-item-text-nocolor-active.png)| Use when no color is selected.|

**ColorPicker.Item for custom colors**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | ![Color picker item bakground hover](static/colorpicker-item-custom-hover.png) | ![Color picker item bakground active](static/colorpicker-item-bg-active.png)| Use for changing the background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-custom-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing the text and background colors of other components.|

**ColorPicker.Item for adding colors**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Add color button | ![Button add default](static/btn-add-default.png) | ![Button add hover](static/btn-add-hover.png) | ![Button add active](static/btn-add-active.png)| Use Button with icon and increase border-radius to 14px.|

@## Dropdown

### Width and height

**The recommended width of a dropdown is 188px.**  
The height of a dropdown list depends on its content.

It is important for the user to see all available colors in the dropdown menu, but if a user added more than 20 custom colors, show a scrollbar.
| Dropdown menu | Dropdown menu with scroll |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Dropdown menu](static/dropdown-menu.png) | ![Dropdown menu with scroll](static/scroll.png) |

### Margins and paddings

![Dropdown menu margins and paddings](static/colorpicker-margins-paddings.png)

@## Input (optional)

If a ColorPicker allows adding custom colors, add an input to it.
The input accepts only HEX values. For details, refer to the [Validation section](/components/color-picker/#validation).

### Size, margins and paddings

**Use a size M input.**  
![Color picker input and margins](static/colorpicker-input-margins.png)

@## Value

The color value is always a 6-character string that specifies the color in the HEX format.

> A user can enter both upper-case and lower-case characters, but the input will save them as upper-case.

@## Interaction

A user can add or remove custom colors, but they can't change default and custom colors.

**Adding a custom color**

> We recommend that you sync and save the user's custom palette in different parts of the product's interface.

Colors are added by either clicking on the button with `MathPlus`, or through the input field.  
A user can add a color value to the custom palette by clicking `Check`, and remove a color by clicking `Close`.
![Add custom color](static/add-custom-color.png)

**Removing custom color**  
![Remove custom color](static/remove-custom-color.png)

@## Validation

The input field accepts only six characters, including numbers and letters.  
If a user enters fewer or more characters, or characters which can't be converted to a 6-character HEX value, the input state changes to invalid.

**To help users fix the invalid input, add the following message to the tooltip: "Please enter 6 latin letters and/or digits."**
![Validation](static/validation.png)

@## Keyboard support

- The component is focused using `Tab`.
- A user can navigate inside the color palettes with the keyboard arrows. The color transition occurs sequentially—from top to bottom and from left to right. If a component has two palettes, when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
- The color is selected by pressing `Enter` or `Space`.
- A user can close the dropdown using `Esc`.
- When the dropdown is closed, the focus returns to the trigger.

@## Use in UX/UI

Components that can be a trigger for a ColorPicker:

- [Input](/components/input/)
- [Link](/components/link/)
- [Select](/components/select/)

![Color picker triggers](static/color-picker-triggers.png)

You can place the color marker in the following components:

- [Button](/components/button/)
- [FilterTrigger](/components/filter-trigger/)
- [Pills](/components/pills/)
- [Select/Multiselect](/components/select/)
- [Tabine](/components/tab-line/)
- [TabPanel](/components/tab-panel/)
- [Tag](/components/tag/)
- [Option](/components/dropdown-menu/#a66af9)

![Color picker places](static/color-picker-places.png)

@page color-picker-api
@page color-picker-code
@page color-picker-changelog
