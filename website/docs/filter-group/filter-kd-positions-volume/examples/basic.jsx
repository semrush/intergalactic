import React, { useState } from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import Divider from '@semcore/ui/divider';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';

const InputRange = ({ value: valueState, changeValue, ariaLabelledby, ...other }) => {
  const minRange = 0;
  const maxRange = 100;
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
    if (from > to && to !== '') {
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
  if (from === '' && to !== '') {
    return `0 - ${to}`;
  }
  if (from !== '') {
    return `${from}`;
  }
  return null;
};

export default () => {
  const [filters, setFilters] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({ from: '', to: '' });
  const [displayValue, setDisplayValue] = useState('');
  const clearAll = () => {
    setFilters(false);
  };
  const applyFilters = () => {
    const { from, to } = value;
    setVisible(false);
    setFilters(from || to ? true : false);
    setDisplayValue(setTriggerText(value));
  };
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      applyFilters();
    }
  };
  const handleSelect = (value) => {
    setVisible(false);
    setFilters(true);
    setDisplayValue(value);
  };

  return (
    <Select visible={visible} onVisibleChange={setVisible} onChange={handleSelect}>
      <Select.Trigger
        placeholder="KD %"
        active={visible}
        empty={!filters || displayValue === null}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`KD ${displayValue} %`}
      </Select.Trigger>
      <Select.Popper
        w="224px"
        role="dialog"
        aria-label="Filters for page sorting"
        aria-modal="false"
      >
        <Select.List>
          {[
            ['80-100', 'Very hard'],
            ['60-79', 'Hard'],
            ['40-59', 'Possible'],
            ['0-39', 'Easy'],
          ].map((item) => (
            <Select.Option key={item[0]} value={item[0]}>{`${item[0]}% ${item[1]}`}</Select.Option>
          ))}
        </Select.List>
        <Divider my={1} />
        <Flex p="4px 8px 16px" direction="column">
          <Text id="custom-range" size={200} bold>
            Custom range
          </Text>
          <InputRange
            ariaLabelledby="custom-range"
            value={value}
            changeValue={setValue}
            my={2}
            onKeyDown={handleKeyDown}
          />
          <Button use="primary" theme="info" w="100%" onClick={applyFilters}>
            Apply
          </Button>
        </Flex>
      </Select.Popper>
    </Select>
  );
};
