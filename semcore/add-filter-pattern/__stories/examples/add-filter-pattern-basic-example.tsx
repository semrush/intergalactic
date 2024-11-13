import React from 'react';
import AddFilterPattern from '@semcore/add-filter-pattern';
import Select from '@semcore/select';
import Input from '@semcore/input';
import { Hint } from '@semcore/ui/tooltip';
import { FilterTrigger } from '@semcore/base-trigger';

import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import SearchM from '@semcore/icon/Search/m';

export const AddFilterPatternBasicExample = () => {
  const [name, setName] = React.useState('');
  const [size, setSize] = React.useState('');
  const [filterData, setFilterData] = React.useState({});

  const clearField = React.useCallback(
    (name) => {
      const tempData = { ...filterData };
      delete tempData[name];
      setFilterData(tempData);
    },
    [filterData],
  );

  return (
    <AddFilterPattern gap={2} flexWrap>
      <AddFilterPattern.Item alwaysVisible={true} placeholder='Filter by name' name='name'>
        {(props) => {
          const { value, onChange, onClear, placeholder } = props;

          return (
            <Input w={160}>
              <Input.Addon>
                <SearchM />
              </Input.Addon>
              <Input.Value
                placehoder={placeholder}
                onChange={(v) => {
                  onChange(v);
                  setFilterData({ ...filterData, ...{ [name]: v } });
                }}
                aria-label='Filter by name'
              />
              {value && (
                <Input.Addon>
                  <Hint
                    tag={ButtonLink}
                    use='secondary'
                    addonLeft={CloseM}
                    title='Clear'
                    onClick={() => {
                      clearField(name);
                      onClear();
                    }}
                  />
                </Input.Addon>
              )}
            </Input>
          );
        }}
      </AddFilterPattern.Item>

      <AddFilterPattern.Item alwaysVisible={true} name='size' displayName='Size'>
        {({ value, name, displayName, onChange, onClear, placeholder }) => {
          return (
            <Select
              placehoder={placeholder}
              onChange={(v) => {
                onChange(v);
                setFilterData({ ...filterData, ...{ [name]: v } });
              }}
            >
              <Select.Trigger
                empty={!value}
                tag={FilterTrigger}
                onClear={() => {
                  onClear();
                  clearField(name);
                }}
              >
                {displayName}: {value}
              </Select.Trigger>
              <Select.Menu>
                {sizes.map((item, idx) => (
                  <Select.Option key={idx} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
          );
        }}
      </AddFilterPattern.Item>

      {filters.map(({ id, name, displayName, options }) => {
        return (
          <AddFilterPattern.Item
            key={id}
            name={name}
            placeholder={displayName}
            displayName={displayName}
          >
            {(props) => {
              const {
                selectProps,
                selectMenuRef,
                shouldAutoFocus,
                onChange,
                onVisibleChange,
                selectVisible,
                onClear,
                placeholder,
                value,
              } = props;

              return (
                <Select
                  onVisibleChange={onVisibleChange}
                  visible={selectVisible}
                  placeholder={placeholder}
                >
                  <Select.Trigger
                    tag={FilterTrigger}
                    empty={!value}
                    onClear={onClear}
                    onChange={(v) => {
                      onChange(v);
                      setFilterData({ filterData, [name]: v });
                    }}
                    autoFocus={shouldAutoFocus}
                    {...selectProps}
                  >
                    {displayName}: {value}
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
            }}
          </AddFilterPattern.Item>
        );
      })}
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

const sizes = ['Small', 'Medium', 'Large'];
