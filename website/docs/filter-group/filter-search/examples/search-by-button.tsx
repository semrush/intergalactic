import React from 'react';
import Input from 'intergalactic/input';
import { Hint } from 'intergalactic/tooltip';
import { ButtonLink } from 'intergalactic/button';
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
          <Hint tag={Button} addonLeft={Search} title='Search' />
        </NeighborLocation>
      </Box>
    </Flex>
  );
};

export default Demo;
