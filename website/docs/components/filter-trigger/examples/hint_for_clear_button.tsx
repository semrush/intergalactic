import React from 'react';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Dropdown from 'intergalactic/dropdown';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';

const Demo = () => {
  const [filters, setFilters] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Text tag='label' htmlFor='advance-trigger' size={300}>
        Filter trigger for several filters inside
      </Text>
      <Box mt={2}>
        <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
          <Dropdown.Trigger
            placeholder='Advanced filters'
            active={visible}
            empty={!filters}
            onClear={() => {
              setFilters(0);
              setVisible(false);
            }}
            tag={FilterTrigger}
            id='advance-trigger'
          >
            <FilterTrigger.TriggerButton>
              <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
              {!!filters && (
                <FilterTrigger.Counter aria-label='Applied filters count'>
                  {filters}
                </FilterTrigger.Counter>
              )}
            </FilterTrigger.TriggerButton>
            {Boolean(filters) && (
              <Tooltip title={'Clear value'}>
                <FilterTrigger.ClearButton />
              </Tooltip>
            )}
          </Dropdown.Trigger>
          <Dropdown.Popper p={5} aria-label='Dropdown popper description'>
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

export default Demo;
