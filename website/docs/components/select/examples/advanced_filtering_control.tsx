import React from 'react';
import Select, { InputSearch } from 'intergalactic/select';

const data = Array(26)
  .fill(0)
  .map((_, index) => ({
    label: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
    value: `Option ${String.fromCharCode('a'.charCodeAt(0) + index)}`,
  }));

const Demo = () => {
  const [filter, setFilter] = React.useState('');
  const options = React.useMemo(
    () => data.filter((option) => option.value.toString().includes(filter)),
    [filter],
  );

  return (
    <Select placeholder='Select value'>
      <Select.Trigger />
      <Select.Popper>
        {({ highlightedIndex }) => (
          <>
            <InputSearch value={filter} onChange={setFilter}>
              <InputSearch.SearchIcon />
              <InputSearch.Value
                placeholder='Search'
                role='combobox'
                aria-autocomplete='list'
                aria-controls='search-list'
                aria-owns='search-list'
                aria-expanded='true'
                aria-activedescendant={`option-${highlightedIndex}`}
              />
              <InputSearch.Clear
                onClick={() => {
                  return false;
                }}
              />
            </InputSearch>
            <Select.List hMax={'224px'} id='search-list'>
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
                <Select.OptionHint key='Nothing'>Nothing found</Select.OptionHint>
              )}
            </Select.List>
          </>
        )}
      </Select.Popper>
    </Select>
  );
};

export default Demo;
