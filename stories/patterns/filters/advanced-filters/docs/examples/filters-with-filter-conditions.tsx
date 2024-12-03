import React, { useEffect, useState } from 'react';
import Dropdown from '@semcore/dropdown';
import Select from '@semcore/select';
import Input from '@semcore/input';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Hint } from '@semcore/ui/tooltip';
import { Flex } from '@semcore/flex-box';
import Divider from '@semcore/divider';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import CloseM from '@semcore/icon/Close/m';
import TrashM from '@semcore/icon/Trash/m';
import { ScreenReaderOnly } from '@semcore/flex-box';

const makeOptions = (options: string[]) => options.map((value) => ({ value, children: value }));

const filterConfig = {
  rule: ['Include', 'Exclude'],
  type: ['Keyword', 'Backlink'],
  filter: ['Containing', 'Not containing'],
};

type FilterData = {
  id: number;
  rule: string;
  type: string;
  filter: string;
  value: string;
};

interface FilterProps extends React.ComponentPropsWithoutRef<typeof Flex> {
  removable?: boolean;
  applyFilters: () => void;
  onUpdate: (filterId: number, key: string, value: string) => void;
  onRemove: (filterId: number, conditionId: number) => void;
  data: FilterData;
  conditionId: number;
}

const Filter: React.FC<FilterProps> = ({
  removable,
  data,
  applyFilters,
  onUpdate,
  onRemove,
  conditionId,
  ...props
}) => {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') applyFilters();
  };

  const handleChange = (key: string) => (value: string) => {
    onUpdate(data.id, key, value);
  };

  const handleRemove = () => {
    onRemove(data.id, conditionId);
  };

  return (
    <Flex {...props} gap={2}>
      <Flex
        flexWrap
        gap={4}
        tag='fieldset'
        m={0}
        p={0}
        style={{ border: 'none' }}
        mr={Number(!removable) * 9}
      >
        <ScreenReaderOnly tag='legend'>{`Condition #${conditionId}`}</ScreenReaderOnly>
        <Select
          options={makeOptions(filterConfig.rule)}
          value={data.rule}
          onChange={handleChange('rule')}
          aria-label='Rule'
          w={100}
        />
        <Select
          options={makeOptions(filterConfig.type)}
          value={data.type}
          onChange={handleChange('type')}
          aria-label='Type'
          w={100}
        />
        <Select
          options={makeOptions(filterConfig.filter)}
          value={data.filter}
          onChange={handleChange('filter')}
          aria-label='Filter'
          w={150}
        />
        <Input w={150}>
          <Input.Value
            aria-label='Value'
            placeholder='Enter value'
            value={data.value}
            onChange={handleChange('value')}
            onKeyDown={handleKeyDown}
          />
        </Input>
        {removable && (
          <Button
            use='tertiary'
            theme='muted'
            addonLeft={TrashM}
            onClick={handleRemove}
            title={'Remove condition'}
            hintPlacement='right'
            ml={-2}
          />
        )}
      </Flex>
    </Flex>
  );
};

const Demo = () => {
  const [savedFilters, setSavedFilters] = useState<FilterData[]>([]);
  const [newFilters, setNewFilters] = useState<FilterData[]>(savedFilters);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const addButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const applyButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const newFilter: FilterData = {
    id: 0,
    rule: 'Include',
    type: 'Keyword',
    filter: 'Containing',
    value: '',
  };

  if (!newFilters.length) setNewFilters([newFilter]);

  useEffect(() => {
    if (!addButtonRef.current || !applyButtonRef.current) return;
    if (document.activeElement === addButtonRef.current)
      applyButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [newFilters]);

  useEffect(() => {
    if (!visible) setNewFilters(savedFilters);
  }, [visible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 500);
    return () => clearTimeout(timer);
  }, [message]);

  const isFilterEmpty = () => newFilters.length === 1 && newFilters[0].value === '';

  const addFilter = () => {
    setNewFilters([
      ...newFilters,
      { ...newFilter, id: newFilters.reduce((max, item) => Math.max(item.id, max), 0) + 1 },
    ]);
    setMessage(`Condition #${newFilters.length + 1} added`);
  };

  const updateFilters = (id: number, key: string, value: string) => {
    setNewFilters(newFilters.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const removeFilter = (id: number, conditionId: number) => {
    setNewFilters(newFilters.filter((item) => item.id !== id));
    setMessage(`Condition #${conditionId} removed`);
  };

  const clearConditions = () => {
    setNewFilters([newFilter]);
    setMessage('Conditions cleared');
  };

  const applyFilters = () => {
    setVisible(false);
    setNewFilters([...newFilters.filter((item) => item.value !== '')]);
    setSavedFilters([...newFilters.filter((item) => item.value !== '')]);
  };

  const clearAll = () => {
    setNewFilters([newFilter]);
    setSavedFilters([]);
    setVisible(false);
  };

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger
        placeholder='Advanced filters'
        aria-label='Advanced filters'
        id='advanced-filters-trigger'
        empty={!savedFilters.length}
        onClear={clearAll}
        tag={FilterTrigger}
        w={200}
      >
        <FilterTrigger.TriggerButton>
          <FilterTrigger.Text aria-hidden>Advanced filters</FilterTrigger.Text>
          {!!savedFilters.length && (
            <FilterTrigger.Counter>
              {savedFilters.length} <ScreenReaderOnly>applied</ScreenReaderOnly>
            </FilterTrigger.Counter>
          )}
        </FilterTrigger.TriggerButton>
        {!!savedFilters.length && (
          <Hint tag={FilterTrigger.ClearButton} title='Clear advanced filters' />
        )}
      </Dropdown.Trigger>
      <Dropdown.Popper aria-label='Advanced filters'>
        <ScreenReaderOnly aria-live='polite' role='status'>
          {message}
        </ScreenReaderOnly>
        <Flex direction='column' gap={4} py={4}>
          <Flex direction='column' gap={4} px={4} alignItems='start'>
            {newFilters.map((item, index) => (
              <Filter
                key={item.id}
                conditionId={index + 1}
                data={item}
                removable={!isFilterEmpty()}
                onUpdate={updateFilters}
                onRemove={removeFilter}
                applyFilters={applyFilters}
              />
            ))}
            <Button use='tertiary' addonLeft={MathPlusM} onClick={addFilter} ref={addButtonRef}>
              Add condition
            </Button>
          </Flex>
          <Divider />
          <Flex px={4} justifyContent='space-between'>
            <Button use='primary' theme='info' onClick={applyFilters} ref={applyButtonRef}>
              Apply
            </Button>
            {!isFilterEmpty() && (
              <Button use='tertiary' theme='muted' addonLeft={CloseM} onClick={clearConditions}>
                Clear all
              </Button>
            )}
          </Flex>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
};

export default Demo;
