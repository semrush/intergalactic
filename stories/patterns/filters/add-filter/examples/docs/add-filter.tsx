import React from 'react';
import AddFilterPattern from '@semcore/add-filter-pattern';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

import SearchM from '@semcore/icon/Search/m';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Radio, { RadioGroup } from '@semcore/radio';
import Textarea from '@semcore/textarea';
import type { AddFilterPatternDropdownProps } from '@semcore/add-filter-pattern';
import { verify } from 'crypto';

const selectOptions = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
];

type SearchFilterInputProps = {
  placeholder: string;
  onChange: (v: string) => void;
  value: string;
  onClear: () => void;
};

const SearchFilterInput = ({ value, onClear, onChange, placeholder }: SearchFilterInputProps) => {
  return (
    <AddFilterPattern.Search.Input>
      <AddFilterPattern.Search.Input.Addon>
        <SearchM />
      </AddFilterPattern.Search.Input.Addon>
      <AddFilterPattern.Search.Input.Value
        value={value}
        onChange={onChange}
        w={110}
        placeholder={placeholder}
      />
      {Boolean(value) && (
        <AddFilterPattern.Search.Input.Addon>
          <AddFilterPattern.Search.Input.CloseHint
            tag={ButtonLink}
            use='secondary'
            addonLeft={CloseM}
            title='Clear'
            onClick={onClear}
          />
        </AddFilterPattern.Search.Input.Addon>
      )}
    </AddFilterPattern.Search.Input>
  );
};

const FilterSearchByFullNameWithNeighbours = ({
  value,
  onClear,
  onChange,
  placeholder,
}: SearchFilterInputProps) => {
  return (
    <Flex>
      <Select placeholder='Everywhere' options={selectOptions} neighborLocation='right' />

      <AddFilterPattern.Search.Input w={130} neighborLocation='both'>
        <AddFilterPattern.Search.Input.Value
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          aria-label='Filter by fullname'
        />
        {Boolean(value) && (
          <AddFilterPattern.Search.Input.Addon>
            <AddFilterPattern.Search.Input.CloseHint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={onClear}
            />
          </AddFilterPattern.Search.Input.Addon>
        )}
      </AddFilterPattern.Search.Input>

      <Button neighborLocation='left'>
        <Button.Addon>
          <SearchM />
        </Button.Addon>
      </Button>
    </Flex>
  );
};

type KeywordDataItem = {
  value: string;
  displayValue: string;
} | null;

type KeywordProps = {
  value: KeywordDataItem;
  onChange: (v: KeywordDataItem) => void;
};
const Keywords = ({ value, onChange }: KeywordProps) => {
  const [textAreaValue, setTextAreaValue] = React.useState(value?.value ?? '');

  const applyFilters = () => {
    if (!textAreaValue) {
      return;
    }
    const countLine = textAreaValue.match(/\n/g) || [];
    const value = textAreaValue;
    const displayValue = String(countLine.length || (textAreaValue && 1));

    onChange({
      value,
      displayValue,
    });
  };

  return (
    <>
      <Text tag='label' htmlFor='textarea' size={200} color='text-primary'>
        Enter keywords separated by commas or one per line. For exact matches, enter your keyword
        with square brackets around it.
      </Text>
      <RadioGroup my={4} defaultValue='1' direction='row'>
        <Radio>
          <Radio.Value value='1' />
          <Radio.Text>All keywords</Radio.Text>
        </Radio>
        <Radio ml={6}>
          <Radio.Value value='2' />
          <Radio.Text>Any keywords</Radio.Text>
        </Radio>
      </RadioGroup>
      <Textarea value={textAreaValue} onChange={setTextAreaValue} h={132} id='textarea' />
      <Flex mt={5}>
        <Button use='primary' theme='info' onClick={applyFilters}>
          Apply
        </Button>
        <Button
          ml={2}
          onClick={() => {
            onChange(null);
          }}
        >
          Clear all
        </Button>
      </Flex>
    </>
  );
};

type FilterData = {
  name: string;
  fullname: string;
  size: string;
  position: string;
  device: string;
  keywords: KeywordDataItem | null;
};
const defaultFilterData = {
  name: '',
  fullname: '',
  size: '',
  keywords: null,
  device: '',
  position: '',
};
const AddFilterPatternExample = () => {
  const [filterData, setFilterData] = React.useState<FilterData>(() => defaultFilterData);

  const clearField = React.useCallback(
    (name: keyof FilterData) => {
      const valueType = typeof filterData[name];
      const tempData = { ...filterData, [name]: valueType === 'string' ? '' : null };
      setFilterData(tempData);
    },
    [filterData],
  );

  return (
    <AddFilterPattern
      onClearAll={() => {
        setFilterData(defaultFilterData);
      }}
      gap={2}
      flexWrap
    >
      <AddFilterPattern.Search alwaysVisible={true} name='name' displayName='Name'>
        <SearchFilterInput
          placeholder={'Filter by name'}
          onChange={(v: string) => {
            setFilterData({ ...filterData, name: v });
          }}
          onClear={() => {
            clearField('name');
          }}
          value={filterData['name']}
        />
      </AddFilterPattern.Search>

      <AddFilterPattern.Search alwaysVisible={true} name='fullname' displayName='Fullname'>
        <FilterSearchByFullNameWithNeighbours
          onChange={(v) => {
            setFilterData({ ...filterData, fullname: v });
          }}
          onClear={() => {
            clearField('fullname');
          }}
          placeholder={'Filter by fullname'}
          value={filterData['fullname']}
        />
      </AddFilterPattern.Search>

      <AddFilterPattern.Select
        onChange={(v: any) => {
          setFilterData({ ...filterData, size: v });
        }}
        alwaysVisible={true}
        name='size'
        displayName='Size'
      >
        <AddFilterPattern.Select.Trigger
          placeholder='Size'
          onClear={() => {
            return clearField('size');
          }}
        >
          {'Size'}: {filterData.size}
        </AddFilterPattern.Select.Trigger>
        <AddFilterPattern.Select.Menu>
          {sizes.map((item, idx) => (
            <AddFilterPattern.Select.Option key={idx} value={item}>
              {item}
            </AddFilterPattern.Select.Option>
          ))}
        </AddFilterPattern.Select.Menu>
      </AddFilterPattern.Select>

      <AddFilterPattern.Dropdown name='keywords' displayName='Keywords'>
        <AddFilterPattern.Dropdown.Trigger placeholder='Exclude keywords'>
          {`Exclude: ${filterData.keywords?.displayValue} keywords`}
        </AddFilterPattern.Dropdown.Trigger>

        <AddFilterPattern.Dropdown.Popper
          w={325}
          p='8px 8px 16px'
          role='dialog'
          aria-label='List of excluded keywords'
          aria-modal='false'
        >
          {({ onChange }) => (
            <Keywords
              onChange={(v) => {
                setFilterData({ ...filterData, keywords: v });
                onChange(v);
              }}
              value={filterData.keywords}
            />
          )}
        </AddFilterPattern.Dropdown.Popper>
      </AddFilterPattern.Dropdown>

      <AddFilterPattern.Search name='position' displayName='Position'>
        <SearchFilterInput
          placeholder={'Filter by position'}
          onChange={(v) => {
            setFilterData({ ...filterData, position: v });
          }}
          onClear={() => {
            clearField('position');
          }}
          value={filterData['position']}
        />
      </AddFilterPattern.Search>

      <AddFilterPattern.Select
        name='device'
        displayName='Device'
        onChange={(v: any) => {
          setFilterData({ ...filterData, device: v });
        }}
      >
        <AddFilterPattern.Select.Trigger
          placeholder='Device'
          onClear={() => {
            clearField('device');
          }}
        >
          {'Device'}: {filterData.device}
        </AddFilterPattern.Select.Trigger>
        <AddFilterPattern.Select.Menu>
          {devices.map((item, idx) => (
            <AddFilterPattern.Select.Option key={idx} value={item}>
              {item}
            </AddFilterPattern.Select.Option>
          ))}
        </AddFilterPattern.Select.Menu>
      </AddFilterPattern.Select>
    </AddFilterPattern>
  );
};

export default AddFilterPatternExample;

const devices = ['Desktop', 'Phone', 'Tablet'];
const sizes = ['Small', 'Medium', 'Large'];
