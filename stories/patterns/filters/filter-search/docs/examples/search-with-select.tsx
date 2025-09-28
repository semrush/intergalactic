import CloseM from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import { Flex, Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
        <Select aria-label='Search scope' options={options} value={scope} onChange={setScope} neighborLocation='right' />
        <Input w={200} neighborLocation='left'>
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
              <ButtonLink
                use='secondary'
                addonLeft={CloseM}
                title='Clear'
                onClick={handleClick}
              />
            </Input.Addon>
          )}
        </Input>
      </Box>
    </Flex>
  );
};

const options = ['Everywhere', 'URL', 'Target URL'].map((option) => ({
  value: option,
  children: option,
}));

export default Demo;
