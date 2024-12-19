import type { Meta, StoryObj } from '@storybook/react';

import FiltersIncludeExcludeExample from './examples/basic-example';

import { FiltersIncludeExcludeTest } from './__tests__/filter-include-exclude.test';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Patterns/Filters/FiltersIncludeExclude',
};

export default meta;

export const FiltersIncludeExclude: StoryObj = {
  render: FiltersIncludeExcludeExample,
  play: playWrapper(FiltersIncludeExcludeTest),
};
