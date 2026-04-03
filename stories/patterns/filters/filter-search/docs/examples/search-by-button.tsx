import CloseM from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import { Flex, Box } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback((v: string) => {
    setValue(v);
  }, []);

  const handleClick = React.useCallback(() => {
    setValue('');
  }, []);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='search-by-button-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Box mt={2}>
        <Input w={200} neighborLocation='right'>
          <Input.Value
            value={value}
            onChange={handleChange}
            id='search-by-button-filter-by-keyword'
            placeholder='Enter keyword here'
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
        <Button addonLeft={Search} title='Search' neighborLocation='left' />
      </Box>
    </Flex>
  );
};

export default Demo;
