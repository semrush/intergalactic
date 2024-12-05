import React from 'react';
import AddFilterPattern from '@semcore/add-filter-pattern';
import Select from '@semcore/select';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import SearchM from '@semcore/icon/Search/m';
import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import { Hint, Text } from '@semcore/typography';
import Radio, { RadioGroup } from '@semcore/radio';
import Textarea from '@semcore/textarea';

const selectOptions = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
];

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
      filterData={filterData}
      onClearAll={() => {
        setFilterData(defaultFilterData);
      }}
      gap={2}
      flexWrap
    >
      <AddFilterPattern.Input alwaysVisible={true} name={'name'} displayName={'Name'}>
        <AddFilterPattern.Input.Addon>
          <SearchM />
        </AddFilterPattern.Input.Addon>
        <AddFilterPattern.Input.Value
          w={110}
          value={filterData['name']}
          onChange={(v: string) => {
            setFilterData({ ...filterData, name: v });
          }}
          placeholder={'Filter by name'}
        />
        {Boolean(filterData['name']) && (
          <AddFilterPattern.Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => {
                clearField('name');
              }}
            />
          </AddFilterPattern.Input.Addon>
        )}
      </AddFilterPattern.Input>

      <AddFilterPattern.Input alwaysVisible={true} name={'fullname'} displayName={'Fullname'}>
        <Select placeholder='Everywhere' options={selectOptions} neighborLocation='right' />

        <Flex neighborLocation='both'>
          <AddFilterPattern.Input.Value
            placeholder={'Filter by fullname'}
            onChange={(v) => {
              setFilterData({ ...filterData, fullname: v });
            }}
            value={filterData['fullname']}
            aria-label='Filter by fullname'
          />
          {Boolean(filterData['fullname']) && (
            <AddFilterPattern.Input.Addon>
              <Hint
                tag={ButtonLink}
                use='secondary'
                addonLeft={CloseM}
                title='Clear'
                onClick={() => {
                  clearField('fullname');
                }}
              />
            </AddFilterPattern.Input.Addon>
          )}
        </Flex>

        <Button neighborLocation='left'>
          <Button.Addon>
            <SearchM />
          </Button.Addon>
        </Button>
      </AddFilterPattern.Input>

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
          <Keywords
            onChange={(v) => {
              setFilterData({ ...filterData, keywords: v });
            }}
            value={filterData.keywords}
          />
        </AddFilterPattern.Dropdown.Popper>
      </AddFilterPattern.Dropdown>

      <AddFilterPattern.Input name={'position'} displayName={'Position'}>
        <AddFilterPattern.Input.Addon>
          <SearchM />
        </AddFilterPattern.Input.Addon>
        <AddFilterPattern.Input.Value
          w={110}
          value={filterData['position']}
          onChange={(v) => {
            setFilterData({ ...filterData, position: v });
          }}
          placeholder={'Filter by position'}
        />
        {Boolean(filterData['position']) && (
          <AddFilterPattern.Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => {
                clearField('position');
              }}
            />
          </AddFilterPattern.Input.Addon>
        )}
      </AddFilterPattern.Input>

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
