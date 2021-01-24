import React, { useCallback, useState } from 'react';
import Input from '@semcore/input';
import CloseXS from '@semcore/icon/lib/Close/xs';
import Search from '@semcore/icon/lib/Search/xs';
import Button from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';
import Select from '@semcore/select';

const selectOptions = ['Option 1', 'Option 2'];

const Demo = () => {
  const [value, setValue] = useState('');

  const options = selectOptions.map((option) => ({
    value: option,
    children: option,
  }));

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
      <Select placeholder="Everywhere" options={options} />
      <Input w={200}>
        <Input.Value ml={2} placeholder="Filter by keyword" value={value} onChange={handleChange} />
        {value && <Input.Addon tag={CloseXS} interactive onClick={handleClick} />}
      </Input>
      <Button>
        <Button.Addon tag={Search} />
      </Button>
    </NeighborLocation>
  );
};

export default Demo;
