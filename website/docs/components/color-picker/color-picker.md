---
title: ColorPicker
tabName: Design
---

@## Description

**ColorPicker** is a component that allows the user to select the color of another component from the pre-defined palette or specify a custom color via its hexadecimal value.

**ColorPicker consists of:**

- **trigger;**
- **list of ColorPicker.Items;**
- **input (optional).**

@## Trigger

Select with a circle shape as leading addon is used as the trigger for ColorPicker.  
![Color picker trigger](static/trigger.png)

### Sizes

![Color picker trigger size](static/trigger-size.png)

@## ColorPicker.Item
**Trigger can be displayed as one ColorPicker.Item, or a list of them.**

ColorPicker.Item is a swatch preview allows a user to visualize what color is currently inputted.

| ColorPicker.Item                                             | List of ColorPicker.Items                             |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Color picker item](static/colorpicker-item-bg-default.png) | ![Color picker inline](static/colorpicker-inline.png) |

@## Size

We use only one size of ColorPicker.Item 28\*28px  
![Color picker item size](static/colorpicker-item-size.png)

@## Margins

Make margins multiples of 4. Default recommended margins are shown below.
![ColorPicker margins](static/colorpicker-margins.png)

@## Types

A trigger can have two different content types:  
| Type | Appearance example | Description |
| --------------- | ------------------------------------------------------------ | --------------------------- |
| Bakground color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | Use for changing background color. For example, user could visually separate his competitors according to their colors. |
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | Use for changing Tag color. |

@## Interaction

Trigger in hover state has border: 1px solid `var (--gray-200);`  
Trigger in active state changes border color to `var (--blue-300)`

**ColorPicker.Item**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | ![Color picker item bakground hover](static/colorpicker-item-bg-hover.png) | ![Color picker item bakground active](static/colorpicker-item-bg-active.png)| Use for changing background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing text and background colors of other components.|
| No background color | ![Color picker item  no color bakground default](static/colorpicker-item-nocolor-default.png) | ![Color picker item no color bakground hover](static/colorpicker-item-nocolor-hover.png) | ![Color picker item no color bakground active](static/colorpicker-item-nocolor-active.png)| Use when no color is selected.|
| No text color | ![Color picker item bakground default](static/colorpicker-item-text-nocolor-default.png) | ![Color picker item bakground hover](static/colorpicker-item-text-nocolor-hover.png) | ![Color picker item bakground active](static/colorpicker-item-text-nocolor-active.png)| Use when no color is selected.|

**ColorPicker.Item for custom colors**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Background color | ![Color picker item bakground default](static/colorpicker-item-bg-default.png) | ![Color picker item bakground hover](static/colorpicker-item-custom-hover.png) | ![Color picker item bakground active](static/colorpicker-item-bg-active.png)| Use for changing background color of other components.|
| Text color | ![Color picker item text default](static/colorpicker-item-text-default.png) | ![Color picker item text hover](static/colorpicker-item-custom-text-hover.png) | ![Color picker item text active](static/colorpicker-item-text-active.png)| Use for changing text and background colors of other components.|

**ColorPicker.Item for adding colors**  
| | Normal | Hover | Active | Description |
| ------------------- | ------------------------------- | -------------------------- | ----------------------- | -------------------- |
| Add color button | ![Button add default](static/btn-add-default.png) | ![Button add hover](static/btn-add-hover.png) | ![Button add active](static/btn-add-active.png)| Use Button with icon and increased border-radius to 14px.|

@## Dropdown

### Width and height

**The recommended width of the dropdown is 188px.**  
The height of the dropdown list depends on the content.

It is important for the user to see all available colors in the dropdown menu but if user added more than 20 custom colors, show scroll.
| Dropdown menu | Dropdown menu with scroll |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| ![Dropdown menu](static/dropdown-menu.png) | ![Dropdown menu with scroll](static/scroll.png) |

### Margins and paddings

![Dropdown menu margins and paddings](static/colorpicker-margins-paddings.png)

@## Input (optional)

For ColorPicker with functionality of adding custom colors, add input.  
The input accepts only HEX values. [See Validation section below](/components/color-picker/#validation).

### Size, margins and paddings

**Use input with M size.**  
![Color picker input and margins](static/colorpicker-input-margins.png)

@## Value

The color value is always a 6-character string specifying color in hexadecimal HEX format.

> 💡 User can input characters in either upper or lower-case, input will save them in upper-case form.

@## Interaction

User can add and remove custom colors but can't change both default and custom colors.

**Adding custom color**

> 💡 We recommend you to sync and save users custom palette in different places of interface in product.

Color might be added as with click on button with icon `MathPlus`, as click on input.  
User can add color value to custom palette with click on icon `Check`, and remove with icon `Close`.
![Add custom color](static/add-custom-color.png)

**Removing custom color**  
![Remove custom color](static/remove-custom-color.png)

@## Validation

The input accepts only 6 characters, including numbers and letters.  
Otherwise it gets invalid state if user inputs symbols which unable to be converted into 6-character hexadecimal.

**To help user correct the invalid input add the message in the tooltip: "Please enter 6 latin letters and/or digits."**
![Validation](static/validation.png)

@## Keyboard support

- Component is focused via `Tab`.
- Inside the color palettes, user navigates using the keyboard arrows. The color transition occurs sequentially — from top to bottom and from left to right. If component has 2 palettes, then when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
- The color is selected by pressing `Enter`, `Space`.
- User can close the dropdown using `Esc`.
- When the dropdown is closed, the focus returns to the trigger.

@## Use in UX/UI

Components that can be a trigger for the color picker:

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
