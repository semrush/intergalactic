import type { Meta, StoryObj } from '@storybook/react';

import { BasicUsageTest } from './__tests__/add_filter_basic.test';
import { playWrapper } from '../../../../utils/playWrapper';
import AddFilterBasicPatternExample from '../docs/examples/add-filter-basic';

const meta: Meta = {
  title: 'Patterns/Filters/AddFilter/Documentation',
};

export default meta;

export const AddFilterBasicPattern: StoryObj = {
  render: AddFilterBasicPatternExample,
  play: playWrapper(BasicUsageTest),
};
