import React from 'react';
import Counter, { AnimatedNumber } from '@semcore/ui/counter';
import { FilterTrigger } from '@semcore/ui/base-trigger';

const Demo = () => (
  <FilterTrigger>
    <FilterTrigger.Text>Link to website</FilterTrigger.Text>
    <FilterTrigger.Addon>
      <Counter theme='bg-primary-info'>
        <AnimatedNumber value={500} delay={1000} formatValue={(x) => Math.round(x).toString()} />
      </Counter>
    </FilterTrigger.Addon>
  </FilterTrigger>
);
