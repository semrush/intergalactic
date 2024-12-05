import React from 'react';
import Counter, { AnimatedNumber } from '@semcore/counter';
import { FilterTrigger } from '@semcore/base-trigger';
import Dropdown from '@semcore/dropdown';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger tag={FilterTrigger}>
      <FilterTrigger.Text>Link to website</FilterTrigger.Text>
      <FilterTrigger.Addon>
        <Counter theme='info'>
          <AnimatedNumber value={500} delay={1000} formatValue={(x) => Math.round(x).toString()} />
        </Counter>
      </FilterTrigger.Addon>
    </Dropdown.Trigger>
    <Dropdown.Popper aria-label='Filter content'>Filter content</Dropdown.Popper>
  </Dropdown>
);

export default Demo;
