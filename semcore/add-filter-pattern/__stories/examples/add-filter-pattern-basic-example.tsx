import React from 'react';
import AddFilterPattern from '@semcore/add-filter-pattern';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { Flex } from 'intergalactic/flex-box';

import SearchM from '@semcore/icon/Search/m';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import { Hint } from '@semcore/ui/tooltip';
import { Text } from 'intergalactic/typography';
import Radio, { RadioGroup } from 'intergalactic/radio';
import Textarea from 'intergalactic/textarea';

const selectOptions = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
];

const SearchFilterInput = ({ valueProps, onClear, placeholder }) => {
  const { value } = valueProps;

  return (
    <AddFilterPattern.Search.Input>
      <AddFilterPattern.Search.Input.Addon>
        <SearchM />
      </AddFilterPattern.Search.Input.Addon>
      <AddFilterPattern.Search.Input.Value {...valueProps} w={110} placeholder={placeholder} />
      {value && (
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

const FilterSearchByFullNameWithNeighbours = ({ valueProps, onClear }) => {
  const { value } = valueProps;
  return (
    <>
      <AddFilterPattern.Search.Addon neighborLocation='right'>
        <Select placeholder='Everywhere' options={selectOptions} />
      </AddFilterPattern.Search.Addon>

      <AddFilterPattern.Search.Input neighborLocation='both'>
        <AddFilterPattern.Search.Input.Value
          {...valueProps}
          w={130}
          placeholder='Filter by fullname'
          aria-label='Filter by fullname'
        />
        {value && (
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

      <AddFilterPattern.Search.Addon neighborLocation='left'>
        <Button>
          <Button.Addon>
            <SearchM />
          </Button.Addon>
        </Button>
      </AddFilterPattern.Search.Addon>
    </>
  );
};

const Keywords = ({ value, onChange, onClear }) => {
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
            setTextAreaValue('');
          }}
        >
          Clear all
        </Button>
      </Flex>
    </>
  );
};
export const AddFilterPatternBasicExample = () => {
  const [filterData, setFilterData] = React.useState({ size: '', keywords: null, device: '' });

  const clearField = React.useCallback(
    (name: string) => {
      const tempData = { ...filterData, [name]: null };
      setFilterData(tempData);
    },
    [filterData],
  );

  return (
    <AddFilterPattern gap={2} flexWrap>
      <AddFilterPattern.Search
        onChange={(v) => {
          setFilterData({ ...filterData, name: v });
        }}
        onClear={() => {
          clearField('name');
        }}
        alwaysVisible={true}
        name='name'
        displayName='Name'
      >
        {(props) => <SearchFilterInput {...props} placeholder={'Filter by name'} />}
      </AddFilterPattern.Search>

      <AddFilterPattern.Search
        onChange={(v) => {
          setFilterData({ ...filterData, fullname: v });
        }}
        onClear={() => {
          clearField('fullname');
        }}
        alwaysVisible={true}
        name='fullname'
        displayName='Fullname'
      >
        {FilterSearchByFullNameWithNeighbours}
      </AddFilterPattern.Search>

      <AddFilterPattern.Select
        alwaysVisible={true}
        name='size'
        displayName='Size'
        onChange={(v) => {
          setFilterData({ ...filterData, size: v });
        }}
        onClear={() => {
          clearField('size');
        }}
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

      <AddFilterPattern.Dropdown
        name='keywords'
        displayName='Keywords'
        onChange={(v) => {
          setFilterData({ ...filterData, keywords: v });
        }}
        onClear={() => {
          clearField('keywords');
        }}
      >
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
          {Keywords}
        </AddFilterPattern.Dropdown.Popper>
      </AddFilterPattern.Dropdown>

      <AddFilterPattern.Search
        onChange={(v) => {
          setFilterData({ ...filterData, position: v });
        }}
        onClear={() => {
          clearField('position');
        }}
        name='position'
        displayName='Position'
      >
        {(props) => <SearchFilterInput {...props} placeholder={'Filter by position'} />}
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

type Filter = {
  id: string;
  name: string;
  displayName: string;
  options: string[];
};

const filters: Filter[] = [
  {
    id: 'cbf46bbe-4c1d-47a8-b3fe-11d55298d97d',
    name: 'color',
    displayName: 'Color',
    options: ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'],
  },
  {
    id: '254c8b3d-bd58-4019-ae45-0e0babfadd34',
    name: 'device',
    displayName: 'Device',
    options: ['Desktop', 'Phone', 'Tablet'],
  },
  {
    id: 'bdf21be3-b398-4e0c-bcbe-6afa7fcab43e',
    name: 'language',
    displayName: 'Language',
    options: ['Chinese', 'English', 'French', 'German', 'Italian', 'Korean', 'Spanish', 'Turkish'],
  },
  {
    id: 'e8409dcd-a3ad-405b-8840-4623e752cb92',
    name: 'material',
    displayName: 'Material',
    options: ['Glass', 'Metal', 'Paper', 'Wood'],
  },
  {
    id: '80b9d5ae-882f-4457-9beb-f6481cfe26c6',
    name: 'shape',
    displayName: 'Shape',
    options: ['Circle', 'Rectangle', 'Star', 'Triangle'],
  },
];

const devices = ['Desktop', 'Phone', 'Tablet'];
const sizes = ['Small', 'Medium', 'Large'];
