---
title: Example
---

@## ColorPicker

Widget allows the user to select the color of another component from the pre-defined palette or specify a custom color via its hexadecimal value.

@example defaultExtended

@## PaletteManager

Using PaletteManager you can add custom colors by entering color in HEX format in input and after this clicking on check icon inside input or pressing Enter on keyboard. In addition, you can remove custom colors by clicking on close icon on each item.

@example defaultExtended

@## Validation input

You can use your own validation function for entered value in input instead of default validation function. For this purpose please use `onChange` prop from `PaletteManager.InputColor` like in the next example.

@example inputValidation

@## Custom trigger

You can customize all parts of ColorPicker by yourself including trigger.

@example customTrigger

@## Ways how to use

There are several ways how you can add colors. First one is using prop `colors` on `ColorPicker.Colors` for default colors and on `PaletteManager` for custom colors which you can edit (add and remove). The second way is using `ColorPicker.Item` and `PalatteManagerItem`. By the second way you can use your own components instead of default items. Next two examples are the same.

@example howToUse

@## Items with tooltips

You can use default items with other components. For example, with `Tooltip`.

@example withTooltips
