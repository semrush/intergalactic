import React, { useCallback, useState } from 'react';
import Input from '@semcore/input';
import CloseXS from '@semcore/icon/Close/m';
import Search from '@semcore/icon/Search/m';
import Button from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';

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
    <NeighborLocation>
      <Input w={200}>
        <Input.Value placeholder="Filter by keyword" value={value} onChange={handleChange} />
        {value && (
          <Input.Addon tag={CloseXS} interactive onClick={handleClick} aria-label="Clear filter" />
        )}
      </Input>
      <Button aria-label="Search">
        <Button.Addon>
          <Search />
        </Button.Addon>
      </Button>
    </NeighborLocation>
  );
};

export default Demo;
