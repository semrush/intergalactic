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

<TypesView type="ColorPickerProps" :types={...types} />

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

Group of ColorPicker.Items.

```jsx
import ColorPicker from '@semcore/ui/color-picker';
<ColorPicker.Colors />;
```

<TypesView type="ColorsProps" :types={...types} />

## ColorPicker.Item

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

<TypesView type="PaletteManagerProps" :types={...types} />

## PaletteManager.Colors

Group of PaletteManager.Items.

```jsx
import { PaletteManager } from '@semcore/ui/color-picker';
<PaletteManager.Colors />;
```

<TypesView type="ColorsCustomProps" :types={...types} />

## PaletteManager.Item

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

<TypesView type="InputColorProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
