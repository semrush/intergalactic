---
title: ColorPicker
fileSource: color-picker
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Example('color-picker-code'), Changelog('color-picker-changelog')
---

## ColorPicker

Widget for selecting the color.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker />;
```

<TypesView type="NSColorPicker.Props" :types={...types} />

## ColorPicker.Trigger

The wrap over the `<Dropdown.Trigger/>` component.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker.Trigger />;
```

## ColorPicker.Popper

The wrap over the `<Dropdown.Popper/>` component.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker.Popper />;
```

## ColorPicker.Colors

List of colors in `ColorPicker`.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker.Colors />;
```

<TypesView type="NSColorPicker.Colors.Props" :types={...types} />

## ColorPicker.Item

::: warning
`ColorPicker.Item` is deprecated. Use `ColorPicker.Colors`.
:::

One unit of `<ColorPicker.Colors />`. ColorPicker.Item is a swatch preview that allows a user to see what color is currently selected.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker.Item />;
```

<TypesView type="ItemProps" :types={...types} />

## PaletteManager

Part of ColorPicker that provides the ability to add and remove custom colors to the palette.

```jsx
import { PaletteManager } from '@semcore/ui/color-picker';
<PaletteManager />;
```

<TypesView type="NSPaletteManager.Props" :types={...types} />

## PaletteManager.Colors

List of colors in `PaletteManager`.

```jsx
import { PaletteManager } from '@semcore/ui/color-picker';
<PaletteManager.Colors />;
```

<TypesView type="NSPaletteManager.Colors.Props" :types={...types} />

## PaletteManager.Item

::: warning
`PaletteManager.Item` is deprecated. Use `PaletteManager.Colors`.
:::

One unit of `<PaletteManager.Colors />`. PaletteManager.Item is a swatch preview that allows a user to see what color is currently selected.

```jsx
import { PaletteManager } from '@semcore/ui/color-picker';
<PaletteManager.Item />;
```

<TypesView type="ItemProps" :types={...types} />

## ColorPicker.InputColor

Input for adding colors in hexadecimal format.

```jsx
import { PaletteManager } from '@semcore/ui/color-picker';
<PaletteManager.InputColor />;
```

<TypesView type="NSPaletteManager.InputColor.Props" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
