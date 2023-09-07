---
title: Example
tabs: Filter Search('filter-search'), Example('filter-search-code')
---

## Dynamic search

Dynamic search searches as soon as at least one character is entered into the input.

::: sandbox

<script lang="tsx">
import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseM from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (v) => {
      setValue(v);
    },
    [value],
  );

  const handleClick = useCallback(() => {
    setValue('');
  }, ['']);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dynamic-search-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Input w={200} mt={2} aria-live='polite'>
        <Input.Addon>
          <Search />
        </Input.Addon>
        <Input.Value
          value={value}
          onChange={handleChange}
          id='dynamic-search-filter-by-keyword'
          placeholder='Enter keyword here'
        />
        {value && (
          <Input.Addon tag={CloseM} interactive onClick={handleClick} aria-label='Clear filters' />
        )}
      </Input>
    </Flex>
  );
};


</script>

:::

## Search by button

Slow but accurate user assistant, searches by button or by pressing `Enter`.

::: sandbox

<script lang="tsx">
import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseM from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';
import Button from '@semcore/ui/button';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (v) => {
      setValue(v);
    },
    [value],
  );

  const handleClick = useCallback(() => {
    setValue('');
  }, ['']);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='search-by-button-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Box mt={2}>
        <NeighborLocation>
          <Input w={200}>
            <Input.Value
              value={value}
              onChange={handleChange}
              id='search-by-button-filter-by-keyword'
              placeholder='Enter keyword here'
            />
            {value && (
              <Input.Addon
                tag={CloseM}
                interactive
                onClick={handleClick}
                aria-label='Clear filter'
              />
            )}
          </Input>
          <Button aria-label='Search'>
            <Button.Addon>
              <Search />
            </Button.Addon>
          </Button>
        </NeighborLocation>
      </Box>
    </Flex>
  );
};


</script>

:::

## Search with select

An extremely rare dynamic search, we use it when fine-tuning of this filter is needed, since there is a lot of different kinds of data.

::: sandbox

<script lang="tsx">
import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseM from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';
import Button from '@semcore/ui/button';
import NeighborLocation from '@semcore/ui/neighbor-location';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const selectOptions = ['Option 1', 'Option 2'];

const Demo = () => {
  const [value, setValue] = useState('');

  const options = selectOptions.map((option) => ({
    value: option,
    children: option,
  }));

  const handleChange = useCallback(
    (v) => {
      setValue(v);
    },
    [value],
  );

  const handleClick = useCallback(() => {
    setValue('');
  }, ['']);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='search-with-select-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Box mt={2}>
        <NeighborLocation>
          <Select placeholder='Everywhere' options={options} />
          <Input w={200}>
            <Input.Value
              ml={2}
              value={value}
              onChange={handleChange}
              id='search-with-select-filter-by-keyword'
              placeholder='Enter keyword here'
            />
            {value && (
              <Input.Addon
                tag={CloseM}
                interactive
                onClick={handleClick}
                aria-label='Clear filter'
              />
            )}
          </Input>
          <Button aria-label='Search'>
            <Button.Addon>
              <Search />
            </Button.Addon>
          </Button>
        </NeighborLocation>
      </Box>
    </Flex>
  );
};


</script>

:::
