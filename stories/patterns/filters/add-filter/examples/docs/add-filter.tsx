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

const selectOptions = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
];

const SearchFilterInput = ({ valueProps, onClear, onChange, placeholder }) => {
  return (
    <AddFilterPattern.Search.Input>
      <AddFilterPattern.Search.Input.Addon>
        <SearchM />
      </AddFilterPattern.Search.Input.Addon>
      <AddFilterPattern.Search.Input.Value
        {...valueProps}
        onChange={onChange}
        w={110}
        placeholder={placeholder}
      />
      {valueProps.value && (
        <AddFilterPattern.Search.Input.Addon>
          <Hint
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

const FilterSearchByFullNameWithNeighbours = ({ valueProps, onClear, onChange, placeholder }) => {
  return (
    <Flex>
      <Select placeholder='Everywhere' options={selectOptions} neighborLocation='right' />

      <AddFilterPattern.Search.Input w={130} neighborLocation='both'>
        <AddFilterPattern.Search.Input.Value
          {...valueProps}
          placeholder={placeholder}
          onChange={onChange}
          aria-label='Filter by fullname'
        />
        {valueProps.value && (
          <AddFilterPattern.Search.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={onClear}
            />
          </AddFilterPattern.Search.Addon>
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

const Keywords = ({ value, onChange }) => {
  const [textAreaValue, setTextAreaValue] = React.useState(value?.value ?? '');

  const applyFilters = () => {
    if (!textAreaValue) {
      return;
    }
    const countLine = textAreaValue.match(/\n/g) || [];
    const value = textAreaValue.split(/\n/g) || [];
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
  keywords: { value: string[]; displayValue: string } | null;
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
    (name: string) => {
      const tempData = { ...filterData, [name]: null };
      setFilterData(tempData);
    },
    [filterData],
  );

  return (
    <AddFilterPattern gap={2} flexWrap>
      <AddFilterPattern.Search alwaysVisible={true} name='name' displayName='Name'>
        {({ onClear, ...rest }) => (
          <SearchFilterInput
            {...rest}
            placeholder={'Filter by name'}
            onChange={(v) => {
              rest.valueProps.onChange(v);
              setFilterData({ ...filterData, name: v });
            }}
            onClear={() => {
              onClear();
              clearField('name');
            }}
          />
        )}
      </AddFilterPattern.Search>

      <AddFilterPattern.Search alwaysVisible={true} name='fullname' displayName='Fullname'>
        {({ onClear, ...rest }) => (
          <FilterSearchByFullNameWithNeighbours
            {...rest}
            onChange={(v) => {
              rest.valueProps.onChange(v);
              setFilterData({ ...filterData, fullname: v });
            }}
            onClear={() => {
              onClear();
              clearField('fullname');
            }}
            placeholder={'Filter by fullname'}
          />
        )}
      </AddFilterPattern.Search>

      <AddFilterPattern.Select
        onChange={(v) => {
          setFilterData({ ...filterData, size: v });
        }}
        alwaysVisible={true}
        name='size'
        displayName='Size'
      >
        <AddFilterPattern.Select.Trigger
          placeholder='Size'
          onClear={() => {
            clearField('size');
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
          {({ onChange, ...rest }) => (
            <Keywords
              onChange={(v) => {
                onChange(v);
                setFilterData({ ...filterData, keywords: v });
              }}
            />
          )}
        </AddFilterPattern.Dropdown.Popper>
      </AddFilterPattern.Dropdown>

      <AddFilterPattern.Search name='position' displayName='Position'>
        {({ onClear, ...rest }) => (
          <SearchFilterInput
            {...rest}
            placeholder={'Filter by position'}
            onChange={(v) => {
              rest.valueProps.onChange(v);
              setFilterData({ ...filterData, position: v });
            }}
            onClear={() => {
              onClear();
              clearField('position');
            }}
          />
        )}
      </AddFilterPattern.Search>

      <AddFilterPattern.Select
        name='device'
        displayName='Device'
        onChange={(v) => {
          setFilterData({ ...filterData, device: v });
        }}
        onClear={() => {
          clearField('device');
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
