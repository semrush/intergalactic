import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const SimpleUsage: Story = {
  args: {
    size: 'm',
    onClick: fn(),
    use: 'primary',
  },
};

export const Trigger: Story = {
  render: () => {
    return (
      <>
        <Select>
          <Select.Trigger />
        </Select>
      </>
    );
  },
};

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Option ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

export const Basicusage: Story = {
  render: () => {
    return (
      <>
        <Flex direction='column'>
          <Text tag='label' size={200} htmlFor='basic-select'>
            Basic select
          </Text>
          <Select
            mt={2}
            mr='auto'
            options={options}
            placeholder='Select option'
            id='basic-select'
          />
        </Flex>
      </>
    );
  },
};

const options2 = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Label ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

export const CustomSelectedLabel: Story = {
  render: () => {
    return (
      <>
        <Flex direction='column'>
          <Text tag='label' size={200} htmlFor='select-custom-label'>
            Select with custom selected label
          </Text>
          <Select
            mt={2}
            mr='auto'
            options={options2}
            placeholder='Select option'
            id='select-custom-label'
          />
        </Flex>
      </>
    );
  },
};

const options3 = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const { value: initialValue } = options3[0];

export const ControlledAndUncontrolledModes: Story = {
  render: () => {
    const [value, setValue] = React.useState(initialValue);
    return (
      <>
        <Flex gap={2} flexWrap>
          <Flex direction='column'>
            <Text tag='label' size={200} htmlFor='controlled-mode-select'>
              Controlled mode
            </Text>
            <Select
              id='controlled-mode-select'
              mt={2}
              value={value}
              onChange={setValue}
              options={options}
              placeholder='Select option'
              m='auto'
              w='100%'
            />
          </Flex>

          <Flex direction='column'>
            <Text tag='label' size={200} htmlFor='uncontrolled-mode-select'>
              Uncontrolled mode
            </Text>
            <Select
              id='uncontrolled-mode-select'
              mt={2}
              defaultValue={initialValue}
              onChange={setValue}
              options={options}
              placeholder='Select option'
              m='auto'
              w='100%'
            />
          </Flex>
        </Flex>
      </>
    );
  },
};
