import React from 'react';
import Counter from '@semcore/ui/counter';
import { FilterTrigger } from '@semcore/ui/base-trigger';

export default () => (
  <FilterTrigger>
    <FilterTrigger.Text>Link to website</FilterTrigger.Text>
    <FilterTrigger.Addon>
      <Counter theme="light-blue">1</Counter>
    </FilterTrigger.Addon>
  </FilterTrigger>
);
