import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (v) => {
      setValue(v);
    },
    [value],
  );

  const handleClick = useCallback(() => {
    setValue('');
  }, ['']);

  return (
    <Flex direction="column">
      <Text tag="label" size="200" htmlFor="dynamic-search-filter-by-keyword">
        Filter by keyword
      </Text>
      <Input w={200} mt={2} aria-live="polite">
        <Input.Addon>
          <Search />
        </Input.Addon>
        <Input.Value
          value={value}
          onChange={handleChange}
          id="dynamic-search-filter-by-keyword"
          placeholder="Enter keyword here"
        />
        {value && (
          <Input.Addon tag={CloseXS} interactive onClick={handleClick} aria-label="Clear filters" />
        )}
      </Input>
    </Flex>
  );
};

export default Demo;
