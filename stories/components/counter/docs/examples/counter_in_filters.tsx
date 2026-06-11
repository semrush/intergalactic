import { ScreenReaderOnly } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Counter, { AnimatedNumber } from '@semcore/ui/counter';
import Dropdown from '@semcore/ui/dropdown';
import React from 'react';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger aria-label='Link to website' tag={FilterTrigger}>
      <FilterTrigger.Text aria-hidden>Link to website</FilterTrigger.Text>
      <FilterTrigger.Addon>
        <Counter theme='info'>
          <AnimatedNumber value={12} delay={400} formatValue={(x) => Math.round(x).toString()} />
          <ScreenReaderOnly>selected</ScreenReaderOnly>
        </Counter>
      </FilterTrigger.Addon>
    </Dropdown.Trigger>
    <Dropdown.Popper aria-label='Advanced filters' p={4}>
      Filter content
    </Dropdown.Popper>
  </Dropdown>
);

export default Demo;
