import React, { useState } from 'react';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';

const InputRange = ({ value: valueState, changeValue, ariaLabelledby, ...other }) => {
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
            aria-labelledby={ariaLabelledby}
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
            aria-labelledby={ariaLabelledby}
            placeholder="To"
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
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({ from: '', to: '' });
  const [displayValue, setDisplayValue] = useState('');
  const clearAll = () => setFilters(0);
  const applyFilters = () => {
    const { from, to } = value;
    setVisible(false);
    setFilters(!!(from || to));
    setDisplayValue(setTriggerText(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger
        placeholder="Competitive Density"
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`Com.: ${displayValue}`}
      </Dropdown.Trigger>
      <Dropdown.Popper
        w="224px"
        p="8px 8px 16px"
        role="dialog"
        aria-labelledby="title-CD"
        aria-modal="false"
      >
        <Text id="title-CD" size={200} bold>
          Custom range
        </Text>
        <InputRange
          ariaLabelledby="title-CD"
          value={value}
          changeValue={setValue}
          my={2}
          onKeyDown={handleKeyDown}
        />
        <Button use="primary" theme="info" w="100%" onClick={applyFilters}>
          Apply
        </Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};
