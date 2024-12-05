import type { Meta, StoryObj } from '@storybook/react';

import FiltersIncludeExcludeExample from './examples/basic-example';

const meta: Meta = {
  title: 'Patterns/Filters/FiltersIncludeExclude',
};

export default meta;

export const FiltersIncludeExclude: StoryObj = {
  render: FiltersIncludeExcludeExample,
};
