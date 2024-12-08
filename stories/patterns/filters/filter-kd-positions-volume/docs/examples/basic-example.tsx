import React, { useState, useRef } from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import Divider from '@semcore/divider';
import NeighborLocation from '@semcore/neighbor-location';
import InputNumber from '@semcore/input-number';

interface ValueState {
  from: string;
  to: string;
}

interface InputRangeProps {
  value: ValueState;
  changeValue: (updatedValue: ValueState) => void;
  [key: string]: unknown;
}

const minRange = 1;

const InputRange: React.FC<InputRangeProps> = ({ value: valueState, changeValue, ...other }) => {
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (key: keyof ValueState) => (value: string | number | undefined) => {
    changeValue({
      ...valueState,
      [key]: value !== undefined ? String(value) : '',
    });
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== fromRef.current && document.activeElement !== toRef.current) {
        const from = Number(valueState.from);
        const to = Number(valueState.to);
        if (from > to && valueState.to !== '') {
          changeValue({
            from: to > minRange ? to.toString() : minRange.toString(),
            to: from.toString(),
          });
        }
        if (valueState.from === '' && valueState.to !== '') {
          changeValue({
            from: minRange.toString(),
            to: valueState.to,
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
            aria-label='From'
            placeholder='From'
            value={from}
            onChange={handleChange('from')}
            onBlur={handleBlur}
            ref={fromRef}
          />
          <InputNumber.Controls />
        </InputNumber>
        <InputNumber>
          <InputNumber.Value
            min={minRange}
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

const numberFormat = new Intl.NumberFormat('en-US');

const setTriggerText = ({ from, to }: ValueState): string | undefined => {
  if (from !== '') {
    if (to === '') return `${numberFormat.format(Number(from))}+`;
    if (from === to) return numberFormat.format(Number(from));
    return `${numberFormat.format(Number(from))}-${numberFormat.format(Number(to))}`;
  } else if (to !== '') {
    return `${numberFormat.format(minRange)}-${numberFormat.format(Number(to))}`;
  }
  return undefined;
};

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [customRange, setCustomRange] = useState<ValueState>({ from: '', to: '' });
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const [displayValue, setDisplayValue] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const clearAll = () => {
    setCustomRange({ from: '', to: '' });
    setSelectValue(undefined);
    setDisplayValue(undefined);
  };

  const applyFilters = () => {
    setVisible(false);
    setDisplayValue(setTriggerText(customRange));
    setSelectValue(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (
      e.key === 'Tab' &&
      e.shiftKey &&
      e.target instanceof HTMLElement &&
      e.target.getAttribute('aria-label') === 'From'
    ) {
      e.preventDefault();
      triggerRef.current?.focus();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilters();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setVisible(false);
    }
  };

  const handleKeyDownApply = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      triggerRef.current?.focus();
    }
  };

  const handleSelect = (value: string) => {
    setDisplayValue(value);
    setSelectValue(value);
    setCustomRange({ from: '', to: '' });
  };

  return (
    <Select
      visible={visible}
      onVisibleChange={setVisible}
      onChange={handleSelect}
      value={selectValue}
    >
      <Select.Trigger
        placeholder='Volume'
        aria-label='Volume'
        active={visible}
        empty={!displayValue}
        onClear={clearAll}
        tag={FilterTrigger}
        triggerRef={triggerRef}
      >
        <span aria-hidden>Volume: </span>
        {displayValue}
      </Select.Trigger>
      <Select.Popper w={224} aria-label='Volume'>
        <Select.List aria-label='Presets'>
          {['100,001+', '10,001-100,000', '1,001-10,000', '101-1,000', '11-100', '1-10'].map(
            (item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ),
          )}
        </Select.List>
        <Divider my={1} />
        <Flex px={2} pt={1} pb={3} gap={2} direction='column'>
          <Text id='custom-range-title' size={200} bold>
            Custom range
          </Text>
          <InputRange
            role='group'
            aria-labelledby='custom-range-title'
            value={customRange}
            changeValue={setCustomRange}
            onKeyDown={handleKeyDown}
          />
          <Button
            use='primary'
            theme='info'
            w='100%'
            onClick={applyFilters}
            onKeyDown={handleKeyDownApply}
          >
            Apply
          </Button>
        </Flex>
      </Select.Popper>
    </Select>
  );
};

export default Demo;
