import React from 'react';
import Dropdown from '@semcore/ui/dropdown';
import Select from '@semcore/ui/select';
import Input from '@semcore/ui/input';
import MathPlusXS from '@semcore/ui/icon/MathPlus/m';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Divider from '@semcore/ui/divider';
import Button from '@semcore/ui/button';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import CloseXS from '@semcore/ui/icon/Close/m';
import TrashXS from '@semcore/ui/icon/Trash/m';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';

const makeOptions = (options) => options.map((value) => ({ value, children: value }));

const Filter = ({ closable, onClose, id, name, ...props }) => (
  <Flex {...props} gap={4}>
    <Flex flexWrap gap={4} tag="fieldset" m={0} p={0} style={{ border: 'none' }}>
      <ScreenReaderOnly>
        <Text tag="legend" size="200" mb={2}>
          {name}
        </Text>
      </ScreenReaderOnly>
      <Flex direction="column" wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag="label" htmlFor={`${id}-strategy`} size="200">
            Strategy
          </Text>
        </ScreenReaderOnly>
        <Select options={makeOptions(['Include', 'Exclude'])} id={`${id}-strategy`} />
      </Flex>
      <Flex direction="column" wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag="label" htmlFor={`${id}-entity`} size="200">
            Entity
          </Text>
        </ScreenReaderOnly>
        <Select options={makeOptions(['Keyword', 'Backlink'])} id={`${id}-enity`} />
      </Flex>
      <Flex direction="column" wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag="label" htmlFor={`${id}-filter`} size="200">
            Filter
          </Text>
        </ScreenReaderOnly>
        <Select options={makeOptions(['Containing', 'Not containing'])} id={`${id}-filter`} />
      </Flex>
      <Flex direction="column" wMin={120} gap={2}>
        <ScreenReaderOnly>
          <Text tag="label" htmlFor={`${id}-value`} size="200">
            Value
          </Text>
        </ScreenReaderOnly>
        <Input w={120}>
          <Input.Value id={`${id}-label`} />
        </Input>
      </Flex>
    </Flex>
    {closable ? (
      <TrashXS my={2} color="stone" interactive aria-label={`Remove ${name}`} onClick={onClose} />
    ) : null}
  </Flex>
);

export default () => {
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
    <Flex direction="column" gap={2}>
      <Text tag="label" htmlFor="advanced-filter" size="200">
        Super advanced filter
      </Text>
      <Dropdown visible={visible} onVisibleChange={setVisible}>
        <Dropdown.Trigger
          placeholder="No filter set"
          id="advanced-filter"
          empty={!filtersCount}
          onClear={clearAll}
          tag={FilterTrigger}
          w={200}
        >
          <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
          {!!filtersCount && (
            <FilterTrigger.Counter aria-label="Applied filters count">
              {filtersCount}
            </FilterTrigger.Counter>
          )}
        </Dropdown.Trigger>
        <Dropdown.Popper aria-label="Advanced filter popup">
          <Flex direction="column" gap={4} py={4}>
            {filtersCount > 0 && (
              <Flex direction="column" gap={4} px={4} alignItems="flex-start">
                {[...new Array(filtersCount)].map((_, index) => (
                  <Filter
                    key={index}
                    name={`Condition #${index + 1}`}
                    id={`advanced-filter-condition-${index + 1}`}
                    closable
                    onClose={handleCloseFilter}
                  />
                ))}
              </Flex>
            )}
            <div>
              <Button use="tertiary" onClick={addFilter} ref={buttonRef} mx={4}>
                <Button.Addon>
                  <MathPlusXS />
                </Button.Addon>
                <Button.Text>Add condition</Button.Text>
              </Button>
            </div>
            <Divider />
            <Flex px={4} justifyContent="space-between">
              <Button use="primary" theme="info" onClick={applyFilters}>
                Apply
              </Button>
              <Button use="tertiary" theme="muted" onClick={clearAll}>
                <Button.Addon>
                  <CloseXS />
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
