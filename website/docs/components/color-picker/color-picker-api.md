---
title: API
fileSource: color-picker
---

@## ColorPicker

Widget for selecting the color.

```jsx
import ColorPicker from '@semcore/color-picker';
<ColorPicker />;
```

@typescript IColorPickerProps

@## ColorPicker.Trigger

This is the element, to which <ColorPicker.Popper/> will be attached. It is fully inherited from <Dropdown.Trigger/>.

```jsx
import ColorPicker from '@semcore/color-picker';
<ColorPicker.Trigger />;
```

@## ColorPicker.Popper

This is the element, to which <ColorPicker.Trigger/> will be attached. It is fully inherited from <Dropdown.Popper/>.

```jsx
import ColorPicker from '@semcore/color-picker';
<ColorPicker.Popper />;
```

@## ColorPicker.Colors

```jsx
import ColorPicker from '@semcore/color-picker';
<ColorPicker.Colors />;
```

@typescript IColorsProps

@## ColorPicker.Item

```jsx
import ColorPicker from '@semcore/color-picker';
<ColorPicker.Item />;
```

@typescript IItemProps

@## PaletteManager

Part of ColorPicker that provides the ability to add and remove custom colors to the palette.

```jsx
import { PaletteManager } from '@semcore/color-picker';
<PaletteManager />;
```

@typescript IPaletteManagerProps

@## PaletteManager.Colors

```jsx
import { PaletteManager } from '@semcore/color-picker';
<PaletteManager.Colors />;
```

@typescript IColorsCustomProps

@## PaletteManager.Item

```jsx
import { PaletteManager } from '@semcore/color-picker';
<PaletteManager.Item />;
```

@typescript IItemProps

@## ColorPicker.InputColor

Input for adding colors in hexadecimal format.

```jsx
import { PaletteManager } from '@semcore/color-picker';
<PaletteManager.InputColor />;
```

@typescript IInputColorProps
