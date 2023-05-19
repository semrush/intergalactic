---
title: Example
---

## PaletteManager

PaletteManager lets you add your own colors by typing in the hexadecimal code and clicking the check icon or pressing Enter. To remove custom colors, simply click the `Close` icon on each item.

@example defaultExtended

## Input validation

To prevent users from entering white as a color option, replace the default validation function in `PaletteManager.InputColor` with your own custom validation function using the `onChange` prop. Here is an example:

@example inputValidation

## Custom trigger

You have complete control over the appearance of ColorPicker, including the trigger.

@example customTrigger

## Several ways to use component

There are multiple ways to add colors in ColorPicker;

- The first method is to use the `colors` prop in `ColorPicker.Colors` for default colors, and in `PaletteManager` for customizable colors that can be added or removed.
- The second method is to use `ColorPicker.Item` and `PaletteManager.Item`, which allows for the use of custom components instead of default items. The next two examples are identical.

@example howToUse

## Items with tooltips

You can use default items with other components. For example, with [Tooltip](/components/tooltip).

@example withTooltips
