import React, { useState, useRef } from 'react';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';

const InputRange = ({ value: valueState, changeValue, ...other }) => {
  const minRange = 1;
  const maxRange = 8;

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleChange = (key) => (value) => {
    valueState[key] = value ? Number(value) : '';
    changeValue({ ...valueState });
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== fromRef.current && document.activeElement !== toRef.current) {
        const { from, to } = valueState;
        if (from > to && to !== '') {
          changeValue({
            from: Math.max(to, minRange),
            to: Math.min(from, maxRange),
          });
        }
        if ((to === '' || from === '') && (to !== '' || from !== '')) {
          changeValue({
            from: from !== '' ? from : minRange,
            to: to !== '' ? to : maxRange,
          });
        }
      }
    }, 0);
  };

  const { from, to } = valueState;

  return (
    <Flex {...other}>
      <NeighborLocation>
        <InputNumber>
          <InputNumber.Value
            min={minRange}
            max={maxRange}
            aria-label='From'
            placeholder='From'
            value={from}
            onChange={handleChange('from')}
            onBlur={handleBlur}
            ref={fromRef}
            autoFocus
          />
          <InputNumber.Controls />
        </InputNumber>
        <InputNumber>
          <InputNumber.Value
            min={minRange}
            max={maxRange}
            aria-label='To'
            placeholder='To'
            value={to}
            onChange={handleChange('to')}
            onBlur={handleBlur}
            ref={toRef}
          />
          <InputNumber.Controls />
        </InputNumber>
      </NeighborLocation>
    </Flex>
  );
};

const setTriggerText = ({ from, to }) => {
  if (from !== '' && to !== '') {
    return from === to ? from : `${from}-${to}`;
  }
  return null;
};

const Demo = () => {
  const [filters, setFilters] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({ from: '', to: '' });
  const [displayValue, setDisplayValue] = useState('');
  const clearAll = () => {
    setFilters(false);
    setValue({ from: '', to: '' });
    setVisible(false);
  };
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
        aria-label='Competitive Density'
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        <span aria-hidden>Com.:</span> {displayValue}
      </Dropdown.Trigger>
      <Dropdown.Popper w={240} p={2} pb={3} aria-label='Competitive Density'>
        <Text id='title-CD' size={200} bold>
          Custom range
        </Text>
        <InputRange
          role='group'
          aria-labelledby='title-CD'
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
