import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
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
      <Text tag='label' size='200' htmlFor='search-by-button-filter-by-keyword'>
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
                tag={CloseXS}
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

export default Demo;
