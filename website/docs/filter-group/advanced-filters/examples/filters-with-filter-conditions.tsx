import React from 'react';
import Dropdown from 'intergalactic/dropdown';
import Select from 'intergalactic/select';
import Input from 'intergalactic/input';
import MathPlusM from 'intergalactic/icon/MathPlus/m';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Divider from 'intergalactic/divider';
import Button from 'intergalactic/button';
import { FilterTrigger } from 'intergalactic/base-trigger';
import CloseM from 'intergalactic/icon/Close/m';
import TrashM from 'intergalactic/icon/Trash/m';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';

const makeOptions = (options) => options.map((value) => ({ value, children: value }));

const Filter = ({ closable, onClose, id, name, ...props }) => (
  <Flex {...props} gap={2}>
    <Flex flexWrap gap={4} tag='fieldset' m={0} p={0} style={{ border: 'none' }}>
      <ScreenReaderOnly>
        <Text tag='legend' size={200} mb={2}>
          {name}
        </Text>
      </ScreenReaderOnly>
      <Flex direction='column' wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag='label' htmlFor={`${id}-strategy`} size={200}>
            Strategy
          </Text>
        </ScreenReaderOnly>
        <Select
          options={makeOptions(['Include', 'Exclude'])}
          id={`${id}-strategy`}
          defaultValue={'Include'}
        />
      </Flex>
      <Flex direction='column' wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag='label' htmlFor={`${id}-entity`} size={200}>
            Entity
          </Text>
        </ScreenReaderOnly>
        <Select
          options={makeOptions(['Keyword', 'Backlink'])}
          id={`${id}-enity`}
          defaultValue={'Keyword'}
        />
      </Flex>
      <Flex direction='column' wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag='label' htmlFor={`${id}-filter`} size={200}>
            Filter
          </Text>
        </ScreenReaderOnly>
        <Select
          options={makeOptions(['Containing', 'Not containing'])}
          id={`${id}-filter`}
          defaultValue={'Containing'}
        />
      </Flex>
      <Flex direction='column' wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag='label' htmlFor={`${id}-value`} size={200}>
            Enter value
          </Text>
        </ScreenReaderOnly>
        <Input w={120}>
          <Input.Value id={`${id}-label`} placeholder='Enter value' />
        </Input>
      </Flex>
    </Flex>
    {closable ? (
      <Button use='tertiary' theme='muted' aria-label='Remove filter' onClick={onClose}>
        <Button.Addon>
          <TrashM />
        </Button.Addon>
      </Button>
    ) : null}
  </Flex>
);

const Demo = () => {
  const [filtersCount, setFiltersCount] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [filtersCount]);

  const clearAll = () => setFiltersCount(0);
  const addFilter = () => setFiltersCount(filtersCount + 1);
  const applyFilters = () => setVisible(false);
  const handleCloseFilter = () => setFiltersCount(filtersCount - 1);

  return (
    <Flex direction='column' gap={2}>
      <Text tag='label' htmlFor='advanced-filter' size={200}>
        Advanced filter label
      </Text>
      <Dropdown visible={visible} onVisibleChange={setVisible}>
        <Dropdown.Trigger
          placeholder='No filter set'
          id='advanced-filter'
          empty={!filtersCount}
          onClear={clearAll}
          tag={FilterTrigger}
          w={200}
        >
          <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
          {!!filtersCount && (
            <FilterTrigger.Counter aria-label='Applied filters count'>
              {filtersCount}
            </FilterTrigger.Counter>
          )}
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label='Advanced filter popup'>
          <Flex direction='column' gap={4} py={4}>
            {filtersCount > 0 && (
              <Flex direction='column' gap={4} px={4} alignItems='flex-start'>
                {[...new Array(filtersCount)].map((_, index) => (
                  <Filter
                    key={`${index}`}
                    name={`Condition #${index + 1}`}
                    id={`advanced-filter-condition-${index + 1}`}
                    closable
                    onClose={handleCloseFilter}
                  />
                ))}
              </Flex>
            )}
            <div>
              <Button use='tertiary' onClick={addFilter} ref={buttonRef} mx={4}>
                <Button.Addon>
                  <MathPlusM />
                </Button.Addon>
                <Button.Text>Add condition</Button.Text>
              </Button>
            </div>
            <Divider />
            <Flex px={4} justifyContent='space-between'>
              <Button use='primary' theme='info' onClick={applyFilters}>
                Apply
              </Button>
              <Button use='tertiary' theme='muted' onClick={clearAll}>
                <Button.Addon>
                  <CloseM />
                </Button.Addon>
                <Button.Text>Clear all</Button.Text>
              </Button>
            </Flex>
          </Flex>
        </Dropdown.Popper>
      </Dropdown>
    </Flex>
  );
};

export default Demo;
