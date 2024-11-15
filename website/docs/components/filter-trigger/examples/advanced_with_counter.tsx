import React from 'react';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Dropdown from 'intergalactic/dropdown';
import Button from 'intergalactic/button';

const Demo = () => {
  const [filters, setFilters] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  return (
    <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
      <Dropdown.Trigger
        placeholder='Advanced filters'
        aria-label='Advanced filters'
        active={visible}
        empty={!filters}
        onClear={() => {
          setFilters(0);
          setVisible(false);
        }}
        tag={FilterTrigger}
      >
        <FilterTrigger.Text aria-hidden>Advanced filters</FilterTrigger.Text>
        {!!filters && <FilterTrigger.Counter>{filters}</FilterTrigger.Counter>}
      </Dropdown.Trigger>
      <Dropdown.Popper aria-label='Advanced filters' p={5}>
        <Button onClick={() => setFilters(filters + 1)}>Add a filter</Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
