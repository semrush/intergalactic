import React from 'react';
import Input from 'intergalactic/input';
import CloseM from 'intergalactic/icon/Close/m';
import Search from 'intergalactic/icon/Search/m';
import { Hint } from 'intergalactic/tooltip';
import { ButtonLink } from 'intergalactic/button';
import NeighborLocation from 'intergalactic/neighbor-location';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [scope, setScope] = React.useState('Everywhere');

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
      <Text tag='label' size={200} htmlFor='search-with-select-backlinks'>
        Filter backlinks
      </Text>
      <Box mt={2}>
        <NeighborLocation>
          <Select aria-label='Search scope' options={options} value={scope} onChange={setScope} />
          <Input w={200}>
            <Input.Addon>
              <Search />
            </Input.Addon>
            <Input.Value
              value={value}
              onChange={handleChange}
              id='search-with-select-backlinks'
              placeholder='Search'
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
        </NeighborLocation>
      </Box>
    </Flex>
  );
};

const options = ['Everywhere', 'URL', 'Target URL'].map((option) => ({
  value: option,
  children: option,
}));

export default Demo;
