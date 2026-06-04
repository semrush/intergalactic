import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SelectComponentConfigProps = SelectProps & {
  // Main props
  optionCount?: number;

  // Trigger props
  triggerPlaceholder?: string;
  triggerSize?: 'm' | 'l';
  triggerDisabled?: boolean;
  triggerState?: 'normal' | 'valid' | 'invalid';
  triggerLoading?: boolean;
  // List props
  listSize?: 'm' | 'l';
  listMaxH?: string | number;

  // InputSearch props
  showInputSearch?: boolean;
  inputSearchPlaceholder?: string;
};

const Demo = (props: SelectComponentConfigProps) => {
  const {
    optionCount = 6,

    // Trigger
    triggerPlaceholder = 'Select option',
    triggerSize = 'm',
    triggerDisabled = undefined,
    triggerState = undefined,
    triggerLoading = undefined,

    // List
    listSize = 'm',
    listMaxH = 224,

    // InputSearch
    showInputSearch = false,
    inputSearchPlaceholder = 'Search...',

    ...restProps
  } = props;

  const [value, setValue] = React.useState<string | number | (string | number)[] | null>('');
  const [searchValue, setSearchValue] = React.useState('');

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  const filteredOptions = showInputSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : options;

  return (
    <Select
      value={value}
      onChange={setValue}
      {...restProps}
    >
      <Select.Trigger
        placeholder={triggerPlaceholder}
        mr='auto'
        size={triggerSize}
        disabled={triggerDisabled}
        state={triggerState}
        loading={triggerLoading}
        id='component-config-select'
      />
      <Select.Popper aria-labelledby='component-config-select'>
        {showInputSearch && (
          <Select.InputSearch
            value={searchValue}
            onChange={setSearchValue}
            placeholder={inputSearchPlaceholder}
          />
        )}
        <Select.List size={listSize} hMax={listMaxH}>
          {filteredOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.children}
            </Select.Option>
          ))}
          {filteredOptions.length === 0 && (
            <Text tag='div' p={2} size={200} use='secondary'>
              Nothing found
            </Text>
          )}
        </Select.List>
      </Select.Popper>
    </Select>
  );
};

export const defaultProps: SelectComponentConfigProps = {
  optionCount: 6,

  // Trigger
  triggerPlaceholder: 'Select option',
  triggerSize: 'm',
  triggerDisabled: undefined,
  triggerState: undefined,
  triggerLoading: undefined,

  // List
  listSize: 'm',
  listMaxH: 224,

  // InputSearch
  showInputSearch: false,
  inputSearchPlaceholder: 'Search...',
};

Demo.defaultProps = defaultProps;

export default Demo;
