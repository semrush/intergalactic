import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Flex } from '@semcore/flex-box';
import { ButtonTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';

const meta: Meta<typeof ButtonTrigger> = {
  title: 'Components/BaseTrigger',
  component: ButtonTrigger,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonTrigger>;

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export const ButtonTrigger1: Story = {
  render: (props) => {
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='button-trigger-select'>
          Button trigger
        </Text>
        <Select
          id='button-trigger-select'
          tag={ButtonTrigger}
          options={options}
          placeholder='Select an option'
          mt={2}
          mr='auto'
        />
      </Flex>
    );
  },
};

export const LinkTrigger1: Story = {
  render: (props) => {
    return (
      <Select
        tag={LinkTrigger}
        options={options}
        id='link-trigger-select'
        placeholder='Select an option'
        mt={2}
        mr='auto'
      />
    );
  },
};
