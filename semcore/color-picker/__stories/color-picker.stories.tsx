import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const PaletteManager1: Story = {
  render: (props) => {
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='main-theme-color'>
          Main theme color
        </Text>
        <ColorPicker>
          <ColorPicker.Trigger mt={2} id='main-theme-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    );
  },
};

export const InputValidation: Story = {
  render: (props) => {
    const [state, setState] = React.useState<'normal' | 'invalid'>('normal');

    const onChange = (value) => {
      if (value.toLowerCase() === 'ffffff') {
        setState('invalid');
      }

      return false;
    };
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='t-shirt-color'>
          T-shirt color
        </Text>
        <ColorPicker>
          <ColorPicker.Trigger mt={2} id='t-shirt-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors />
            <PaletteManager>
              <PaletteManager.Colors />
              <PaletteManager.InputColor state={state} onChange={onChange} />
            </PaletteManager>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    );
  },
};

export const CustomTrigger: Story = {
  render: (props) => {
    const [value, setValue] = React.useState('#C695FF');
    return (
      <Flex gap={5} direction='column'>
        <Flex direction='column'>
          <Text tag='label' size={200} htmlFor='new-tag'>
            New tag
          </Text>
          <ColorPicker value={value} onChange={setValue}>
            <Input ml={1} w={300} mt={2}>
              <ColorPicker.Trigger tag={Input.Addon} interactive aria-label='New tag color'>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1px solid var(--intergalactic-border-secondary)',
                    backgroundColor: value,
                  }}
                />
              </ColorPicker.Trigger>
              <Input.Value placeholder='Tag name' id='new-tag' />
            </Input>
            <ColorPicker.Popper>
              <ColorPicker.Colors />
            </ColorPicker.Popper>
          </ColorPicker>
        </Flex>
        <Flex direction='column'>
          <Text tag='label' size={300} htmlFor='new-tag'>
            New tag
          </Text>
          <ColorPicker value={value} onChange={setValue}>
            <Input ml={1} w={300} mt={2} size='l'>
              <ColorPicker.Trigger tag={Input.Addon} interactive aria-label='New tag color'>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1px solid var(--intergalactic-border-secondary)',
                    backgroundColor: value,
                  }}
                />
              </ColorPicker.Trigger>
              <Input.Value placeholder='Tag name' id='new-tag' />
            </Input>
            <ColorPicker.Popper>
              <ColorPicker.Colors />
            </ColorPicker.Popper>
          </ColorPicker>
        </Flex>
      </Flex>
    );
  },
};

export const SeveralWaysToUseComponent: Story = {
  render: (props) => {
    const [value, setValue] = React.useState('#98848D');
    const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

    return (
      <Flex gap={5} flexWrap>
        <Flex direction='column'>
          <Text tag='label' size={200} htmlFor='player-1-color'>
            Color 1
          </Text>
          <ColorPicker value={value} onChange={setValue}>
            <ColorPicker.Trigger mt={2} id='player-1-color' />
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
        </Flex>
        <Flex direction='column'>
          <Text tag='label' size={200} htmlFor='player-2-color'>
            Color 2
          </Text>
          <ColorPicker value={value} onChange={setValue}>
            <ColorPicker.Trigger mt={2} id='player-2-color' />
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
        </Flex>
      </Flex>
    );
  },
};

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
export const ItemsWithTooltips: Story = {
  render: (props) => {
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='cake-color'>
          Cake color
        </Text>
        <ColorPicker>
          <ColorPicker.Trigger mt={2} id='main-theme-color' />
          <ColorPicker.Popper>
            <ColorPicker.Colors>
              {colors.map((color) => (
                <Hint title={color} key={color} tag={ColorPicker.Item} value={color} />
              ))}
            </ColorPicker.Colors>
          </ColorPicker.Popper>
        </ColorPicker>
      </Flex>
    );
  },
};
