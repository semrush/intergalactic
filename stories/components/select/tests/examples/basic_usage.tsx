import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SelectBasicProps = SelectProps & {
  labelText?: string;
  showLabel?: boolean;
  optionCount?: number;
};

const Demo = (props: SelectBasicProps) => {
  const {
    labelText = 'Select label',
    showLabel = true,
    optionCount = 6,
    placeholder = 'Select option',
    size = 'm',
    disabled = undefined,
    state = undefined,
    multiselect = undefined,
    interaction = undefined,
    scrollToSelected = undefined,
    ...restProps
  } = props;

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  return (
    <Flex direction='column'>
      {showLabel && (
        <Text tag='label' size={200} htmlFor='configurable-select'>
          {labelText}
        </Text>
      )}
      <Select
        mt={showLabel ? 2 : 0}
        mr='auto'
        options={options}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        state={state}
        multiselect={multiselect}
        interaction={interaction}
        scrollToSelected={scrollToSelected}
        id='configurable-select'
        {...restProps}
      />
    </Flex>
  );
};

export const defaultProps: SelectBasicProps = {
  labelText: 'Select label',
  showLabel: true,
  optionCount: 6,
  placeholder: 'Select option',
  size: 'm',
  disabled: undefined,
  state: undefined,
  multiselect: undefined,
  interaction: undefined,
  scrollToSelected: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
