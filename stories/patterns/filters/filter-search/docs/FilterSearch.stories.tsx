import type { Meta, StoryObj } from '@storybook/react';

import DynamicSearchExample from './examples/dynamic_search';
import SearchByButtonExample from './examples/search-by-button';
import SearchWithSelectExample from './examples/search-with-select';

const meta: Meta = {
  title: 'Patterns/Filters/FilterSearch',
};

export default meta;

export const DynamicSearch: StoryObj = {
  render: DynamicSearchExample,
};

export const SearchByButton: StoryObj = {
    render: SearchByButtonExample,
};

export const SearchWithSelect: StoryObj = {
    render: SearchWithSelectExample,
};