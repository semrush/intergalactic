---
title: ColorPicker
tabs: Design('color-picker'), A11y('color-picker-a11y'), API('color-picker-api'), Example('color-picker-code'), Changelog('color-picker-changelog')
---

## PaletteManager

PaletteManager lets you add your own colors by typing in the hexadecimal code and clicking the check icon or pressing Enter. To remove custom colors, simply click the `Close` icon on each item.

::: sandbox

<script lang="tsx">
import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';

const Demo = () => {
  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager>
          <PaletteManager.Colors />
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};


</script>

:::

## Input validation

To prevent users from entering white as a color option, replace the default validation function in `PaletteManager.InputColor` with your own custom validation function using the `onChange` prop. Here is an example:

::: sandbox

<script lang="tsx">
import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';

const Demo = () => {
  const [state, setState] = React.useState('normal');

  const onChange = (value) => {
    if (value.toLowerCase() === 'ffffff') {
      setState('invalid');
    }

    return false;
  };

  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager>
          <PaletteManager.Colors />
          <PaletteManager.InputColor state={state} onChange={onChange} />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};


</script>

:::

## Custom trigger

You have complete control over the appearance of ColorPicker, including the trigger.

::: sandbox

<script lang="tsx">
import React from 'react';
import ColorPicker from '@semcore/ui/color-picker';
import Input from '@semcore/ui/input';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('#C695FF');

  return (
    <ColorPicker value={value} onChange={setValue}>
      <Input ml={1} w={200}>
        <Input.Addon role='button' interactive>
          <ColorPicker.Trigger tag={Box}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '1px solid #C4C7CF',
                backgroundColor: value,
              }}
            />
          </ColorPicker.Trigger>
        </Input.Addon>
        <Input.Value placeholder='Placeholder' />
      </Input>
      <ColorPicker.Popper>
        <ColorPicker.Colors />
      </ColorPicker.Popper>
    </ColorPicker>
  );
};


</script>

:::

## Several ways to use component

There are multiple ways to add colors in ColorPicker;

- The first method is to use the `colors` prop in `ColorPicker.Colors` for default colors, and in `PaletteManager` for customizable colors that can be added or removed.
- The second method is to use `ColorPicker.Item` and `PaletteManager.Item`, which allows for the use of custom components instead of default items. The next two examples are identical.

::: sandbox

<script lang="tsx">
import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';

const Demo = () => {
  const [value, setValue] = React.useState('#98848D');
  const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

  return (
    <>
      <ColorPicker value={value} onChange={setValue}>
        <ColorPicker.Trigger />
        <ColorPicker.Popper>
          <ColorPicker.Colors
            colors={[
              null,
              '#8649E1',
              '#FF5733',
              '#98848D',
              '#8E3B29',
              '#B0E727',
              '#27D3E7',
              '#2D747C',
              '#6ad0de',
              '#6E2D7C',
            ]}
          />
          <PaletteManager colors={customColors} onColorsChange={setCustomColors}>
            <PaletteManager.Colors />
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>

      <ColorPicker value={value} onChange={setValue}>
        <ColorPicker.Trigger />
        <ColorPicker.Popper>
          <ColorPicker.Colors>
            <ColorPicker.Item value={null} />
            <ColorPicker.Item value='#8649E1' />
            <ColorPicker.Item value='#FF5733' />
            <ColorPicker.Item value='#98848D' />
            <ColorPicker.Item value='#8E3B29' />
            <ColorPicker.Item value='#B0E727' />
            <ColorPicker.Item value='#27D3E7' />
            <ColorPicker.Item value='#2D747C' />
            <ColorPicker.Item value='#6ad0de' />
            <ColorPicker.Item value='#6E2D7C' />
          </ColorPicker.Colors>
          <PaletteManager onColorsChange={setCustomColors}>
            <PaletteManager.Colors>
              {customColors.map((color) => (
                <PaletteManager.Item value={color} key={color} />
              ))}
            </PaletteManager.Colors>
            <PaletteManager.InputColor />
          </PaletteManager>
        </ColorPicker.Popper>
      </ColorPicker>
    </>
  );
};


</script>

:::

## Items with tooltips

You can use default items with other components. For example, with [Tooltip](/components/tooltip/tooltip).

::: sandbox

<script lang="tsx">
import React from 'react';
import ColorPicker from '@semcore/ui/color-picker';
import Tooltip from '@semcore/ui/tooltip';

const colors = [
  '#A7AB38',
  '#229229',
  '#36E341',
  '#369AE3',
  '#66A9DA',
  '#9DEBE9',
  '#8F331C',
  '#7441B0',
  '#B9A0D6',
  '#C43DD2',
];

const Demo = () => {
  return (
    <ColorPicker>
      <ColorPicker.Trigger />
      <ColorPicker.Popper>
        <ColorPicker.Colors>
          {colors.map((color) => (
            <Tooltip title={color} key={color}>
              <ColorPicker.Item value={color} />
            </Tooltip>
          ))}
        </ColorPicker.Colors>
      </ColorPicker.Popper>
    </ColorPicker>
  );
};


</script>

:::
