import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import Search from 'intergalactic/icon/Search/m';
import Button from 'intergalactic/button';
import NeighborLocation from 'intergalactic/neighbor-location';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (v) => {
      setValue(v);
    },
    [value],
  );

  const handleClick = React.useCallback(() => {
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

export default Demo;
