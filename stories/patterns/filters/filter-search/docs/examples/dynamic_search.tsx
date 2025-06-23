import { Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import Input from '@semcore/input';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
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
      <Text tag='label' size={200} htmlFor='dynamic-search-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Input w={200} mt={2}>
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
          <Input.Addon>
            <ButtonLink use='secondary' addonLeft={CloseM} title='Clear' onClick={handleClick} />
          </Input.Addon>
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
