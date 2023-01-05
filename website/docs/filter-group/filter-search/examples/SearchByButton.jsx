import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';
import Button from '@semcore/ui/button';
import NeighborLocation from '@semcore/ui/neighbor-location';

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
