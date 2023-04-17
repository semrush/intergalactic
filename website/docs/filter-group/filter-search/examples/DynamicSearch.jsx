import React, { useCallback, useState } from 'react';
import Input from '@semcore/ui/input';
import CloseXS from '@semcore/ui/icon/Close/m';
import Search from '@semcore/ui/icon/Search/m';

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
    <Input w={200} aria-live="polite">
      <Input.Addon>
        <Search />
      </Input.Addon>
      <Input.Value placeholder="Filter by keyword" value={value} onChange={handleChange} />
      {value && (
        <Input.Addon tag={CloseXS} interactive onClick={handleClick} aria-label="Clear filters" />
      )}
    </Input>
  );
};

export default Demo;
