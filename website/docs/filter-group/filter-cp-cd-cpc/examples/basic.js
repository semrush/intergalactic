import React, { useState } from 'react';
import Dropdown from '@semcore/dropdown';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import NeighborLocation from '@semcore/neighbor-location';
import InputNumber from '@semcore/input-number';
import { Text } from '@semcore/typography';

const InputRange = ({ value: valueState, changeValue, ...other }) => {
  const minRange = 1;
  const maxRange = 8;
  let revertValues = false;

  const handleChange = (key) => (value) => {
    if (revertValues) {
      revertValues = false;
    } else {
      valueState[key] = value;
      changeValue({ ...valueState });
    }
  };

  const handleBlur = () => {
    const { from, to } = valueState;
    if (from > to) {
      revertValues = true;
      changeValue({
        from: Math.max(to, minRange),
        to: Math.min(from, maxRange),
      });
    }
  };
  const { from, to } = valueState;

  return (
    <Flex {...other}>
      <NeighborLocation>
        <InputNumber>
          <InputNumber.Value
            min={minRange}
            max={maxRange}
            placeholder="From"
            value={from}
            onChange={handleChange('from')}
            onBlur={handleBlur}
          />
          <InputNumber.Controls />
        </InputNumber>
        <InputNumber>
          <InputNumber.Value
            min={minRange}
            max={maxRange}
            placeholder="to"
            value={to}
            onChange={handleChange('to')}
            onBlur={handleBlur}
          />
          <InputNumber.Controls />
        </InputNumber>
      </NeighborLocation>
    </Flex>
  );
};

const setTriggerText = ({ from, to }) => {
  if (from && to) {
    return `${from} - ${to}`;
  }
  if (from !== '' || to !== '') {
    return `${from !== '' ? from : to}`;
  }
  return null;
};

export default () => {
  const [filters, setFilters] = useState(false);
  const [visible, updateVisible] = useState(false);
  const [value, changeValue] = useState({
    from: '',
    to: '',
  });
  const [displayValue, changeDisplayValue] = useState('');
  const clearAll = () => setFilters(0);
  const applyFilters = () => {
    const { from, to } = value;
    updateVisible(false);
    setFilters(from || to ? true : false);
    changeDisplayValue(setTriggerText(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <Dropdown visible={visible} onVisibleChange={updateVisible}>
      <Dropdown.Trigger
        placeholder="Competitive Density"
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`Com.: ${displayValue}`}
      </Dropdown.Trigger>
      <Dropdown.Popper w="224px" p="8px 8px 16px">
        <Text size={200} bold>
          Custom range
        </Text>
        <InputRange value={value} changeValue={changeValue} my={2} onKeyDown={handleKeyDown} />
        <Button use="primary" theme="info" w="100%" onClick={applyFilters}>
          Apply
        </Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};
