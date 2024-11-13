import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Test',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: { value: number; label: string; children: string }[] = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

export const BasicSelectFocusIteracrion: Story = {
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
            interaction='focus'
          />
        </Flex>
      </>
    );
  },
};
