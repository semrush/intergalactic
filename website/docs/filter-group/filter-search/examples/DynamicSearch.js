import React, { useCallback, useState } from 'react';
import Input from '@semcore/input';
import CloseXS from '@semcore/icon/lib/Close/xs';
import Search from '@semcore/icon/lib/Search/xs';

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
    <Input w={200}>
      <Input.Addon tag={Search} />
      <Input.Value placeholder="Filter by keyword" value={value} onChange={handleChange} />
      {value && <Input.Addon tag={CloseXS} interactive onClick={handleClick} />}
    </Input>
  );
};

export default Demo;
