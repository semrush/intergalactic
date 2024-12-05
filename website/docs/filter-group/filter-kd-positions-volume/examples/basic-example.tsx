import React, { useState, useRef } from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import Divider from '@semcore/ui/divider';
import NeighborLocation from '@semcore/ui/neighbor-location';
import InputNumber from '@semcore/ui/input-number';

const InputRange = ({ value: valueState, changeValue, ...other }) => {
  const minRange = 1;

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
            to: from,
          });
        }
        if (from === '' && to !== '') {
          changeValue({
            from: minRange,
            to,
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

const setTriggerText = ({ from, to }) => {
  if (from !== '') {
    if (to === '') return `${numberFormat.format(from)}+`;
    else if (from === to) return numberFormat.format(from);
    else return `${numberFormat.format(from)}-${numberFormat.format(to)}`;
  }
  return null;
};

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [customRange, setCustomRange] = useState({ from: '', to: '' });
  const [selectValue, setSelectValue] = useState(null);
  const [displayValue, setDisplayValue] = useState(null);
  const triggerRef = React.useRef(null);

  const clearAll = () => {
    setCustomRange({ from: '', to: '' });
    setSelectValue(null);
    setDisplayValue(null);
  };

  const applyFilters = () => {
    setVisible(false);
    setDisplayValue(setTriggerText(customRange));
    setSelectValue(null);
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();

    if (e.key === 'Tab' && e.shiftKey && e.target.getAttribute('aria-label') === 'From') {
      e.preventDefault();
      triggerRef.current?.focus();
    }

    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  const handleKeyDownApply = (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      triggerRef.current?.focus();
    }
  };

  const handleSelect = (value) => {
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
        empty={displayValue === null}
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
