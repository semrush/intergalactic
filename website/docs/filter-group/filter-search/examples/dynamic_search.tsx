import React from 'react';
import Input from 'intergalactic/input';
import { Hint } from 'intergalactic/tooltip';
import { ButtonLink } from 'intergalactic/button';
import CloseM from 'intergalactic/icon/Close/m';
import Search from 'intergalactic/icon/Search/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

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
      <Text tag='label' size={200} htmlFor='dynamic-search-filter-by-keyword'>
        Filter by keyword
      </Text>
      <Input w={200} mt={2} aria-live='polite'>
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
    </Flex>
  );
};

export default Demo;
