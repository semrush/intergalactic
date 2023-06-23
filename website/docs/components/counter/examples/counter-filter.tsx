import React from 'react';
import Counter, { AnimatedNumber } from '@semcore/ui/counter';
import { FilterTrigger } from '@semcore/ui/base-trigger';

export default () => (
  <FilterTrigger>
    <FilterTrigger.Text>Link to website</FilterTrigger.Text>
    <FilterTrigger.Addon>
      <Counter theme='light-blue'>
        <AnimatedNumber value={500} delay={1000} formatValue={Math.round} />
      </Counter>
    </FilterTrigger.Addon>
  </FilterTrigger>
);
