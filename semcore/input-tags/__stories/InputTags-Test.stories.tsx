import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import InputTags from '@semcore/input-tags';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';

import { SelectTagForFiltering } from './InputTags.stories';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags/Test',
  component: InputTags
};

export default meta;
type Story = StoryObj<typeof InputTags>;

const tagsSelect = ['LinkedIn', 'Facebook', 'TikTok', 'Instagram'];

export const SelectTagForFilteringTest: Story = {
  render: () => {

    return (
      <>
        <Button addonLeft={CloseM} aria-label='Prev focusable element' />
          <SelectTagForFiltering.render />
        <Button addonLeft={CloseM} aria-label='Next focusable element' />
      </>
    );
  },
};
