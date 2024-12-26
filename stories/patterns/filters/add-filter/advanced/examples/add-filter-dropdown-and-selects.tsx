import React from 'react';
import AddFilter from '@semcore/add-filter';
import { Flex } from '@semcore/flex-box';
import SearchM from '@semcore/icon/Search/m';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import Input from '@semcore/input';
import NeighborLocation from '@semcore/neighbor-location';
import InputNumber from '@semcore/input-number';
import Divider from '@semcore/divider';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { preview } from 'vite';

type RangeValue = {
  from: string;
  to: string;
};

type InputRangeProps = {
  value: RangeValue;
  onChange: (updatedValue: RangeValue) => void;
  [key: string]: unknown;
};
const minRange = 1;

const InputRange = ({ value: valueState, onChange, ...other }: InputRangeProps) => {
  const fromRef = React.useRef<HTMLInputElement | null>(null);
  const toRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (key: keyof RangeValue) => (value: string | number | undefined) => {
    onChange({
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
          onChange({
            from: to > minRange ? to.toString() : minRange.toString(),
            to: from.toString(),
          });
        }
        if (valueState.from === '' && valueState.to !== '') {
          onChange({
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

const setTriggerText = ({ from, to }: RangeValue): string | undefined => {
  if (from !== '') {
    if (to === '') return `${numberFormat.format(Number(from))}+`;
    if (from === to) return numberFormat.format(Number(from));
    return `${numberFormat.format(Number(from))}-${numberFormat.format(Number(to))}`;
  } else if (to !== '') {
    return `${numberFormat.format(minRange)}-${numberFormat.format(Number(to))}`;
  }
  return '';
};

type FilterData = {
  name: string;
  volume: string;
};

const defaultFilterData = {
  name: '',
  volume: '',
};

const AddFilterDropdownAndSelectsExample = () => {
  const [filterData, setFilterData] = React.useState<FilterData>(() => defaultFilterData);
  const [customRange, setCustomRange] = React.useState<RangeValue>({ from: '', to: '' });
  const volumeTriggerRef = React.useRef<HTMLButtonElement | null>(null);

  const clearField = (name: keyof FilterData) => {
    setFilterData((prevData) => ({ ...prevData, [name]: defaultFilterData[name] }));
  };

  const clearVolume = () => {
    setCustomRange({ from: '', to: '' });
    clearField('volume');
  };

  const applyVolumeValueFromRange = () => {
    setFilterData((prevValue) => {
      return { ...prevValue, volume: setTriggerText(customRange) };
    });
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
      volumeTriggerRef.current?.focus();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      applyVolumeValueFromRange();
    }
  };

  const handleKeyDownApply = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      volumeTriggerRef.current?.focus();
    }
  };

  return (
    <Flex gap={2}>
      <Input inline={false} w={160}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          value={filterData['name']}
          onChange={(v: string) => {
            setFilterData({ ...filterData, name: v });
          }}
          placeholder={'Filter by name'}
        />
        {Boolean(filterData['name']) && (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              aria-label='Clear'
              onClick={() => {
                clearField('name');
              }}
            />
          </Input.Addon>
        )}
      </Input>

      <AddFilter
        filterData={filterData}
        onClearAll={() => {
          setFilterData(defaultFilterData);
        }}
        gap={2}
        flexWrap
      >
        <AddFilter.Select
          name='range'
          displayName='Range'
          onChange={(volume: any) => {
            setFilterData({ ...filterData, volume });
          }}
        >
          <AddFilter.Select.Trigger
            placeholder='Volume'
            aria-label='Volume'
            empty={!filterData.volume}
            onClear={clearVolume}
            triggerRef={volumeTriggerRef}
          >
            {'Volume'}: {filterData.volume}
          </AddFilter.Select.Trigger>
          <AddFilter.Select.Popper w={224} aria-label='Volume'>
            <AddFilter.Select.List aria-label='Presets'>
              {['100,001+', '10,001-100,000', '1,001-10,000', '101-1,000', '11-100', '1-10'].map(
                (item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ),
              )}
            </AddFilter.Select.List>
            <Divider my={1} />
            <Flex px={2} pt={1} pb={3} gap={2} direction='column'>
              <Text id='custom-range-title' size={200} bold>
                Custom range
              </Text>
              <InputRange
                role='group'
                aria-labelledby='custom-range-title'
                value={customRange}
                onChange={setCustomRange}
                onKeyDown={handleKeyDown}
              />
              <Button
                use='primary'
                theme='info'
                w='100%'
                onClick={applyVolumeValueFromRange}
                onKeyDown={handleKeyDownApply}
              >
                Apply
              </Button>
            </Flex>
          </AddFilter.Select.Popper>
        </AddFilter.Select>
      </AddFilter>
    </Flex>
  );
};

export default AddFilterDropdownAndSelectsExample;
