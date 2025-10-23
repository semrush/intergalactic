import { FilterTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import React from 'react';

const Demo = () => {
  const [filters, setFilters] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  return (
    <Dropdown visible={visible} onVisibleChange={(v: any) => setVisible(v)}>
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
