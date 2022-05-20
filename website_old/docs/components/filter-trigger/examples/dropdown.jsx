import React, { useState } from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Dropdown from '@semcore/dropdown';
import Button from '@semcore/button';

export default () => {
  const [filters, setFilters] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
      <Dropdown.Trigger
        placeholder="Advanced filters"
        active={visible}
        empty={!filters}
        onClear={() => {
          setFilters(0);
          setVisible(false);
        }}
        tag={FilterTrigger}
      >
        <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
        {!!filters && <FilterTrigger.Counter>{filters}</FilterTrigger.Counter>}
      </Dropdown.Trigger>
      <Dropdown.Popper p={5}>
        <Button
          onClick={() => {
            setFilters(filters + 1);
          }}
        >
          Set filters
        </Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};
