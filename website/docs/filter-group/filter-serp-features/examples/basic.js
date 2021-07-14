import React, { useState } from 'react';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import Select, { InputSearch } from '@semcore/select';
import Link from '@semcore/link';

export default () => {
  const [filters, setFilters] = useState(false);
  const [filter, setFilter] = useState('');
  const [visible, updateVisible] = useState(false);
  const [displayValue, changeDisplayValue] = useState('');
  const [selectValues, changeSelectValues] = useState([]);
  const options = ['Instant answer', 'Knowledge panel', 'Carousel '];
  const clearAll = () => {
    setFilters(false);
    changeSelectValues([]);
  };

  const applyFilters = () => {
    setFilters(true);
    let displayValue = `SERP Features: ${selectValues.length} selected`;
    if (options.length === selectValues.length) {
      changeDisplayValue('SERP Features: All selected');
    }
    changeDisplayValue(displayValue);
    updateVisible(false);
  };

  const handleClick = () => {
    const newValue = selectValues.length ? [] : options;
    changeSelectValues(newValue);
    return false;
  };
  const optionClick = (value) => () => {
    const newSelectValue = [];
    let cheked = false;

    selectValues.forEach((selectValue) => {
      if (selectValue === value) {
        cheked = true;
      } else {
        newSelectValue.push(selectValue);
      }
    });
    changeSelectValues(cheked ? newSelectValue : [...selectValues, value]);
    return false;
  };
  const filteredOptions = options.filter((value) => value.includes(filter));
  return (
    <Select multiselect visible={visible} onVisibleChange={updateVisible} value={selectValues}>
      <Select.Trigger
        placeholder="SERP Features"
        active={visible}
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {displayValue}
      </Select.Trigger>
      <Select.Popper w="224px">
        <Select.List>
          <InputSearch
            value={filter}
            onChange={setFilter}
            onKeyDown={(e) => {
              e.key === ' ' && e.stopPropagation();
            }}
          />
          {filteredOptions.length ? (
            <Link tag="button" onClick={handleClick} size={100} m="8px 8px 4px">
              {selectValues.length ? 'Deselect all' : 'Select all'}
            </Link>
          ) : null}
          {filteredOptions.length ? (
            filteredOptions.map((value) => (
              <Select.OptionCheckbox key={value} value={value} onClick={optionClick(value)}>
                {value}
              </Select.OptionCheckbox>
            ))
          ) : (
            <Select.OptionHint mt={1}>Nothing found</Select.OptionHint>
          )}
        </Select.List>
        <Select.Divider />
        <Select.OptionCheckbox value="None" onClick={optionClick('None')}>
          None
        </Select.OptionCheckbox>
        <Button use="primary" w="calc(100% - 16px)" onClick={applyFilters} m="8px 8px 16px">
          Apply
        </Button>
      </Select.Popper>
    </Select>
  );
};
