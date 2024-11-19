import React from 'react';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import Button from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (v: string) => {
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
