import CloseM from '@semcore/icon/Close/m';
import SearchM from '@semcore/icon/Search/m';
import AddFilter from '@semcore/ui/add-filter';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import React from 'react';

type FilterData = Record<string, any>;

const defaultFilterData = {
  name: '',
  size: '',
  Device: '',
  Language: '',
  Material: '',
  Shape: '',
  Color: '',
};

export type PrimaryTableAddFilterProps = {
  nameFilter?: string;
  onNameFilterChange?: (value: string) => void;
};

const filters = [
  {
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

function PrimaryTableAddFilter({
  nameFilter: nameFilterProp,
  onNameFilterChange,
}: PrimaryTableAddFilterProps = {}) {
  const isNameControlled = onNameFilterChange !== undefined;
  const [filterData, setFilterData] = React.useState<FilterData>(defaultFilterData);

  React.useEffect(() => {
    if (!isNameControlled || nameFilterProp === undefined) {
      return;
    }
    setFilterData((prev) => (prev.name === nameFilterProp ? prev : { ...prev, name: nameFilterProp }));
  }, [isNameControlled, nameFilterProp]);

  const filterDataForUi = isNameControlled ? { ...filterData, name: nameFilterProp ?? '' } : filterData;

  const updateFilterData = (value: string, name: string) => {
    if (name === 'name' && isNameControlled) {
      onNameFilterChange(value);
      return;
    }
    setFilterData((prevData) => {
      return { ...prevData, ...{ [name]: value } };
    });
  };

  const clearField = React.useCallback(
    (name: keyof FilterData) => {
      if (name === 'name' && isNameControlled) {
        onNameFilterChange?.('');
        return;
      }
      const tempData = { ...filterData, [name]: '' };
      setFilterData(tempData);
    },
    [filterData, isNameControlled, onNameFilterChange],
  );

  return (
    <AddFilter
      filterData={filterDataForUi}
      onClearAll={() => {
        setFilterData(defaultFilterData);
        if (isNameControlled) {
          onNameFilterChange?.('');
        }
      }}
      gap={2}
      flexWrap
    >
      <Input w={160}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          value={filterDataForUi.name}
          onChange={(v) => updateFilterData(v, 'name')}
          placeholder='Filter by name'
          aria-label='Filter by name'
        />
        {filterDataForUi.name && (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => clearField('name')}
            />
          </Input.Addon>
        )}
      </Input>

      <Select value={filterDataForUi.size} onChange={(v: string) => updateFilterData(v, 'size')}>
        <Select.Trigger
          empty={!filterDataForUi.size}
          placeholder='Size'
          tag={FilterTrigger}
          onClear={() => clearField('size')}
          aria-label='Size'
        >
          <span aria-hidden>Size:</span>
          {' '}
          {filterDataForUi.size}
        </Select.Trigger>
        <Select.Menu aria-label='Size'>
          {sizes.map((item, idx) => (
            <Select.Option key={idx} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>

      {filters.map(({ name, values }) => {
        return (
          <AddFilter.Select
            key={name}
            name={name}
            displayName={name}
            onChange={(v: any) => {
              updateFilterData(v, name);
            }}
          >
            <AddFilter.Select.Trigger
              placeholder={name}
              aria-label={name}
              onClear={() => {
                clearField(name);
              }}
            >
              <span aria-hidden>
                {name}
                :
              </span>
              {' '}
              {filterDataForUi[name]}
            </AddFilter.Select.Trigger>
            <AddFilter.Select.Menu aria-label={name}>
              {values.map((item, idx) => (
                <AddFilter.Select.Option key={idx} value={item}>
                  {item}
                </AddFilter.Select.Option>
              ))}
            </AddFilter.Select.Menu>
          </AddFilter.Select>
        );
      })}
    </AddFilter>
  );
}

export default PrimaryTableAddFilter;
