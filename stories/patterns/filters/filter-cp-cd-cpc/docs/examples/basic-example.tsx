import React, { useState, useRef } from 'react';
import Dropdown from '@semcore/ui/dropdown';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';

interface ValueState {
  from: string;
  to: string;
}

interface InputRangeProps {
  value: ValueState;
  changeValue: (updatedValue: ValueState) => void;
  [key: string]: unknown;
}

const InputRange: React.FC<InputRangeProps> = ({ value: valueState, changeValue, ...other }) => {
  const minRange = 1;
  const maxRange = 8;

  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (key: keyof ValueState) => (value: string | null) => {
    valueState[key] = value ?? '';
    changeValue({ ...valueState });
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== fromRef.current && document.activeElement !== toRef.current) {
        const { from, to } = valueState;
        if (from > to && to !== '') {
          changeValue({
            from: Math.max(Number(to), minRange).toString(),
            to: Math.min(Number(from), maxRange).toString(),
          });
        }
        if ((to === '' || from === '') && (to !== '' || from !== '')) {
          changeValue({
            from: from !== '' ? from : minRange.toString(),
            to: to !== '' ? to : maxRange.toString(),
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

const setTriggerText = ({ from, to }: { from: string; to: string }): string | null => {
  if (from !== '' && to !== '') {
    return from === to ? `${from}` : `${from}-${to}`;
  }
  return null;
};

const Demo = () => {
  const [value, setValue] = useState<ValueState>({ from: '', to: '' });
  const [filters, setFilters] = useState(false);
  const [visible, setVisible] = useState(false);
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
    setDisplayValue(setTriggerText(value) ?? '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      <Dropdown.Popper w={240} p={2} pb={3} aria-label='Competitive Density' tabIndex={-1}>
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
