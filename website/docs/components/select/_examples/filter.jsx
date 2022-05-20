import React, { useState } from 'react';
import Select from '@semcore/select';

const defaultOptions = Array(20)
  .fill()
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

function Demo() {
  const [filterValue, setFilterValue] = useState('');
  const options = defaultOptions.filter(({ value }) => value.includes(filterValue));
  return (
    <Select size={'l'} placeholder="Select value">
      <Select.Trigger />
      <Select.Popper>
        <Select.InputSearch value={filterValue} onChange={setFilterValue} />
        <Select.List hMax={'224px'}>
          {!options.length && <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>}
          {options.map((i, idx) => (
            <Select.Option key={idx} value={i.value}>
              {i.value}
            </Select.Option>
          ))}
        </Select.List>
      </Select.Popper>
    </Select>
  );
}

export default Demo;
