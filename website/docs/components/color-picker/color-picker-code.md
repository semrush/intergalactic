---
title: ColorPicker
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Example('color-picker-code'), Changelog('color-picker-changelog')
---

## PaletteManager

PaletteManager lets you add your own colors by typing in the hexadecimal code and clicking the check icon or pressing Enter. To remove custom colors, simply click the `Close` icon on each item.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/color-picker/docs/examples/palettemanager.tsx';
</script>

:::

## Input validation

To prevent users from entering white as a color option, replace the default validation function in `PaletteManager.InputColor` with your own custom validation function using the `onChange` prop. Here is an example:

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/color-picker/docs/examples/input_validation.tsx';
</script>

:::

## Custom trigger

You have complete control over the appearance of ColorPicker, including the trigger.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/color-picker/docs/examples/custom_trigger.tsx';
</script>

:::

## Predefined palette

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/color-picker/docs/examples/predefined_palette.tsx';
</script>

:::

