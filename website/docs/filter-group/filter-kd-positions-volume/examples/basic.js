import React, { useState } from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import Divider from '@semcore/divider';
import NeighborLocation from '@semcore/neighbor-location';
import InputNumber from '@semcore/input-number';

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
  const clearAll = () => {
    setFilters(false);
  };
  const applyFilters = () => {
    const { from, to } = value;
    updateVisible(false);
    setFilters(from || to ? true : false);
    changeDisplayValue(setTriggerText(value));
  };
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      applyFilters();
    }
  };
  const handleSelect = (value) => {
    updateVisible(false);
    setFilters(true);
    changeDisplayValue(value);
  };

  return (
    <Select visible={visible} onVisibleChange={updateVisible} onChange={handleSelect}>
      <Select.Trigger
        placeholder="KD %"
        active={visible}
        empty={!filters || displayValue === null}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`KD ${displayValue} %`}
      </Select.Trigger>
      <Select.Popper w="224px">
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
          <Text size={200} bold>
            Custom range
          </Text>
          <InputRange value={value} changeValue={changeValue} my={2} onKeyDown={handleKeyDown} />
          <Button use="primary" theme="info" w="100%" onClick={applyFilters}>
            Apply
          </Button>
        </Flex>
      </Select.Popper>
    </Select>
  );
};
