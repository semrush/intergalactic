import React, { useState } from 'react';
import Select from '@semcore/select';
import { InputSearch } from '@semcore/select';

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

export default () => {
  const [filter, setFilter] = useState('');
  const filteredOptions = options.filter((option) => option.value.toString().includes(filter));

  return (
    <Select placeholder="Select value">
      <Select.Trigger />
      <Select.Popper>
        <InputSearch value={filter} onChange={setFilter} placeholder="Search" />
        <Select.List hMax={'224px'}>
          {filteredOptions.length ? (
            filteredOptions.map(({ value }) => (
              <Select.Option value={value} key={value}>
                {value}
              </Select.Option>
            ))
          ) : (
            <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
          )}
        </Select.List>
      </Select.Popper>
    </Select>
  );
};
