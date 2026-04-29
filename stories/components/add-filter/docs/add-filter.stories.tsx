import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicUsageTest } from './__tests__/add_filter_basic.test';
import AddFilterBasicPatternExample from './examples/add-filter-basic';
import { playWrapper } from '../../../utils/playWrapper';
const meta: Meta = {
  title: 'Components/AddFilter/Documentation',
};
export default meta;
export const AddFilterBasicPattern: StoryObj = {
  render: AddFilterBasicPatternExample,
  play: playWrapper(BasicUsageTest),

};
