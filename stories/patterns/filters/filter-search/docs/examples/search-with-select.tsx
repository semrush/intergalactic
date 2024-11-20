import React from 'react';
import Input from '@semcore/input';
import CloseM from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import { Hint } from '@semcore/tooltip';
import { ButtonLink } from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [scope, setScope] = React.useState('Everywhere');

  const handleChange = React.useCallback((v: string) => {
    setValue(v);
  }, []);

  const handleClick = React.useCallback(() => {
    setValue('');
  }, []);

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
