import React, { useState } from 'react';
import Select, { InputSearch } from '@semcore/ui/select';

const data = Array(26)
  .fill(0)
  .map((_, index) => ({
    label: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
    value: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
  }));

export default () => {
  const [filter, setFilter] = useState('');
  const options = React.useMemo(
    () => data.filter((option) => option.value.toString().includes(filter)),
    [filter],
  );

  return (
    <Select placeholder="Select value">
      <Select.Trigger />
      <Select.Popper>
        {({ highlightedIndex }) => (
          <>
            <InputSearch
              value={filter}
              onChange={setFilter}
              placeholder="Search"
              role="combobox"
              aria-autocomplete="list"
              aria-controls="search-list"
              aria-owns="search-list"
              aria-expanded="true"
              aria-activedescendant={`option-${highlightedIndex}`}
            />
            <Select.List hMax={'224px'} id="search-list">
              {options.map(({ value, label }, index) => (
                <Select.Option
                  value={value}
                  key={value}
                  id={`option-${index}`}
                  aria-selected={index === highlightedIndex}
                >
                  {label}
                </Select.Option>
              ))}
              {!options.length && (
                <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
              )}
            </Select.List>
          </>
        )}
      </Select.Popper>
    </Select>
  );
};
