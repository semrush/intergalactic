import React from 'react';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import { FilterTrigger } from 'intergalactic/base-trigger';
import NeighborLocation from 'intergalactic/neighbor-location';
import InputNumber from 'intergalactic/input-number';
import { Text } from 'intergalactic/typography';

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
            placeholder='From'
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
            placeholder='To'
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

const Demo = () => {
  const [filters, setFilters] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState({ from: '', to: '' });
  const [displayValue, setDisplayValue] = React.useState('');
  const clearAll = () => setFilters(false);
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
        placeholder='Competitive Density'
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        {`Com.: ${displayValue}`}
      </Dropdown.Trigger>
      <Dropdown.Popper
        w='224px'
        p='8px 8px 16px'
        role='dialog'
        aria-labelledby='title-CD'
        aria-modal='false'
      >
        <Text id='title-CD' size={200} bold>
          Custom range
        </Text>
        <InputRange
          ariaLabelledby='title-CD'
          value={value}
          changeValue={setValue}
          my={2}
          onKeyDown={handleKeyDown}
        />
        <Button use='primary' theme='info' w='100%' onClick={applyFilters}>
          Apply
        </Button>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
