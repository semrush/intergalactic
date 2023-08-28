---
title: Example
fileSource: base-trigger
tabs: FilterTrigger('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

The component is used as an active state of a trigger in filters.

## Usage with Select

Replace the `tag` for the `Select.Trigger`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const options = Array(6)
  .fill(0)
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export default () => {
  return (
    <>
      <Text tag='label' htmlFor='filter-trigger' size={300}>
        Filter trigger with options
      </Text>
      <Box mt={2}>
        <Select>
          <Select.Trigger tag={FilterTrigger} id='filter-trigger' />
          <Select.Menu>
            {options.map((option, idx) => {
              const { title } = option;
              return (
                <Select.Option value={title} key={idx}>
                  {title}
                </Select.Option>
              );
            })}
          </Select.Menu>
        </Select>
      </Box>
    </>
  );
};
</script>

:::

## Usage with Dropdown

It is more complex example with [Dropdown](/components/dropdown/) and [Counter](/components/counter/). It is recommended to use it for **advanced filters** where it is important to show that there are several additional filters inside.

::: sandbox

<script lang="tsx">
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
            <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
            {!!filters && (
              <FilterTrigger.Counter aria-label='Applied filters count'>
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
</script>

:::
