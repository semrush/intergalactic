import React, { useState } from 'react';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

export default () => {
  const [filters, setFilters] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Text tag="label" htmlFor="advance-trigger" size="300">
        Filter trigger with counter
      </Text>
      <Box mt={2}>
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
            id="advance-trigger"
          >
            <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
            {!!filters && (
              <FilterTrigger.Counter aria-label="Applied filters count">
                {filters}
              </FilterTrigger.Counter>
            )}
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
      </Box>
    </>
  );
};
