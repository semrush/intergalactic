import React from 'react';
import Counter, { AnimatedNumber } from 'intergalactic/counter';
import { FilterTrigger } from 'intergalactic/base-trigger';

const Demo = () => (
  <FilterTrigger>
    <FilterTrigger.Text>Link to website</FilterTrigger.Text>
    <FilterTrigger.Addon>
      <Counter theme='info'>
        <AnimatedNumber value={500} delay={1000} formatValue={(x) => Math.round(x).toString()} />
      </Counter>
    </FilterTrigger.Addon>
  </FilterTrigger>
);

export default Demo;
