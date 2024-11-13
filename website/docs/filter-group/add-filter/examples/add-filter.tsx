import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Select from '@semcore/select';
import Input from '@semcore/input';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Hint } from '@semcore/ui/tooltip';
import { Flex } from '@semcore/flex-box';
import Button, { ButtonLink } from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import CloseM from '@semcore/icon/Close/m';
import SearchM from '@semcore/icon/Search/m';

type FilterSelectProps = {
  value: string;
  options: string[];
  onClear: () => void;
  onChange: (value: string) => void;
  name: string;
};

const FilterSelect = ({ value, onClear, onChange, options, name }: FilterSelectProps) => {
  const selectMenuRef = React.useRef<HTMLDivElement>();
  const triggerRef = React.useRef<HTMLButtonElement>();
  const [selectVisible, setSelectVisible] = React.useState(false);
  const focusTrigger = React.useCallback(() => {
    triggerRef.current?.focus();
    setSelectVisible(true);
  }, []);

  React.useEffect(() => {
    // calling focusTrigger with timeout to enable animation
    setTimeout(focusTrigger);
  }, []);

  const isEscapeKeyDown = (e) => {
    return e.key === 'Escape';
  };

  return (
    <Select
      visible={selectVisible}
      onVisibleChange={setSelectVisible}
      value={value}
      onChange={onChange}
      placeholder={name}
    >
      <Select.Trigger
        triggerRef={triggerRef}
        onKeyDown={(e) => {
          if (isEscapeKeyDown(e) && !value) {
            onClear();
            setSelectVisible(false);
          }
        }}
        onBlur={(e) => {
          if (
            !value &&
            !selectMenuRef.current
              ?.closest('[data-ui-name="DropdownMenu.Popper"]')
              ?.contains(e.relatedTarget)
          ) {
            setSelectVisible(false);
            onClear();
          }
        }}
        tag={FilterTrigger}
        onClear={onClear}
      >
        {name}: {value}
      </Select.Trigger>
      <Select.Menu ref={selectMenuRef}>
        {options.map((option, idx) => (
          <Select.Option value={option} key={idx}>
            {option}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
};

type Filter = {
  id: string;
  name: string;
  values: string[];
};
type FilterData = Record<string, string>;

const Demo = () => {
  const [name, setName] = React.useState('');
  const [size, setSize] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<Filter[]>([]);
  const [filterData, setFilterData] = React.useState<FilterData>({});
  const [addFilterVisible, setAddFilterVisible] = React.useState<boolean>(false);

  const updateFilterFields = (filter: Filter) => {
    setSelectedFilters((prevFilters) => [...prevFilters, filter]);
  };

  const updateFilterData = (value: string, name: string) => {
    const newData = { ...filterData, ...{ [name]: value } };
    setFilterData(newData);
  };

  const removeByName = (nameToRemove) => {
    const newFields = selectedFilters.filter(({ name }) => name !== nameToRemove);
    setSelectedFilters(newFields);

    const newData = { ...filterData };
    delete newData[nameToRemove];
    setFilterData(newData);
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setFilterData({});
    setName('');
    setSize('');
  };

  const filtersWithoutSelected = React.useMemo(() => {
    return filters.filter((filter) => {
      return !selectedFilters.map((item) => item.name).includes(filter.name);
    });
  }, [filters, selectedFilters]);

  const hasFilterData = React.useMemo(() => {
    return name || size || Object.values(filterData).filter((v) => v).length > 0;
  }, [filterData, name, size]);

  return (
    <Flex gap={2} flexWrap>
      <Input w={160}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          value={name}
          onChange={setName}
          placeholder='Filter by name'
          aria-label='Filter by name'
        />
        {name && (
          <Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => setName('')}
            />
          </Input.Addon>
        )}
      </Input>

      <Select value={size} onChange={setSize}>
        <Select.Trigger
          empty={!size}
          placeholder='Size'
          tag={FilterTrigger}
          onClear={() => setSize('')}
        >
          Size: {size}
        </Select.Trigger>
        <Select.Menu>
          {sizes.map((item, idx) => (
            <Select.Option key={idx} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>

      {selectedFilters.map(({ id, name, values }) => (
        <FilterSelect
          key={id}
          name={name}
          options={values}
          value={filterData[name]}
          onChange={(v) => updateFilterData(v, name)}
          onClear={() => removeByName(name)}
        />
      ))}

      {Boolean(filtersWithoutSelected.length) && (
        <DropdownMenu visible={addFilterVisible} onVisibleChange={setAddFilterVisible}>
          <DropdownMenu.Trigger tag={Button} use='tertiary' addonLeft={MathPlusM}>
            Add filter
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            {filtersWithoutSelected.map((filterItem) => (
              <DropdownMenu.Item
                key={filterItem.name}
                onClick={() => {
                  updateFilterFields(filterItem);
                  setAddFilterVisible(false);
                }}
              >
                {filterItem.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Menu>
        </DropdownMenu>
      )}
      {hasFilterData && (
        <Button onClick={clearAllFilters} use='tertiary' theme='muted' addonLeft={CloseM} ml='auto'>
          Clear filters
        </Button>
      )}
    </Flex>
  );
};

const filters: Filter[] = [
  {
    id: 'cbf46bbe-4c1d-47a8-b3fe-11d55298d97d',
    name: 'Color',
    values: ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'],
  },
  {
    id: '254c8b3d-bd58-4019-ae45-0e0babfadd34',
    name: 'Device',
    values: ['Desktop', 'Phone', 'Tablet'],
  },
  {
    id: 'bdf21be3-b398-4e0c-bcbe-6afa7fcab43e',
    name: 'Language',
    values: ['Chinese', 'English', 'French', 'German', 'Italian', 'Korean', 'Spanish', 'Turkish'],
  },
  {
    id: 'e8409dcd-a3ad-405b-8840-4623e752cb92',
    name: 'Material',
    values: ['Glass', 'Metal', 'Paper', 'Wood'],
  },
  {
    id: '80b9d5ae-882f-4457-9beb-f6481cfe26c6',
    name: 'Shape',
    values: ['Circle', 'Rectangle', 'Star', 'Triangle'],
  },
];

const sizes = ['Small', 'Medium', 'Large'];

export default Demo;
