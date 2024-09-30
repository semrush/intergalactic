import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import Search from 'intergalactic/icon/Search/m';
import Button from 'intergalactic/button';
import { Hint } from 'intergalactic/tooltip';
import { ButtonLink } from 'intergalactic/button';
import NeighborLocation from 'intergalactic/neighbor-location';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';

const selectOptions = ['Option 1', 'Option 2'];

const Demo = () => {
  const [value, setValue] = React.useState('');

  const options = selectOptions.map((option) => ({
    value: option,
    children: option,
  }));

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
      <Text tag='label' size={200} htmlFor='search-with-select-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Box mt={2}>
        <NeighborLocation>
          <Select placeholder='Everywhere' options={options} />
          <Input w={200}>
            <Input.Value
              value={value}
              onChange={handleChange}
              id='search-with-select-filter-by-keyword'
              placeholder='Enter keyword here'
            />
            {value && (
              <Input.Addon>
                <Hint
                  tag={ButtonLink}
                  use='secondary'
                  addonLeft={CloseM}
                  title='Clear'
                  onClick={handleClick}
                />
              </Input.Addon>
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
