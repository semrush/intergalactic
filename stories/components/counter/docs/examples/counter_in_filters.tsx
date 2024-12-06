import React from 'react';
import Counter, { AnimatedNumber } from '@semcore/counter';
import { FilterTrigger } from '@semcore/base-trigger';
import { ScreenReaderOnly } from '@semcore/flex-box';
import Dropdown from '@semcore/dropdown';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger aria-label='Link to website' tag={FilterTrigger}>
      <FilterTrigger.Text aria-hidden>Link to website</FilterTrigger.Text>
      <FilterTrigger.Addon>
        <Counter theme='info'>
          <AnimatedNumber value={500} delay={1000} formatValue={(x) => Math.round(x).toString()} />
          <ScreenReaderOnly>selected</ScreenReaderOnly>
        </Counter>
      </FilterTrigger.Addon>
    </Dropdown.Trigger>
    <Dropdown.Popper aria-label='Link to website' p={4}>
      Filter content
    </Dropdown.Popper>
  </Dropdown>
);

export default Demo;
