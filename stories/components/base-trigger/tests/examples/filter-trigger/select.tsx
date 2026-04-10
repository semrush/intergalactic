import { Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { FilterTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import React from 'react';

type FilterTriggerSelectDDMenuExample = FilterTriggerProps &
  BaseTriggerProps & {
    ellipsis?: boolean;
    w?: number;
  };

const Demo = (props: FilterTriggerSelectDDMenuExample) => {
  const { size, state, active, placeholder, disabled, ellipsis, w } = props;

  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Flex direction='column' gap={3}>
      <Flex gap={2} justifyContent='flex-start'>
        <Select
          value={value}
          onChange={setValue}
          data-test-id='base-trigger-as-tag-in-select'
          aria-label='base addon'
        >
          <Select.Trigger
            tag={FilterTrigger}
            size={size}
            state={state}
            active={active}
            placeholder={placeholder}
            disabled={disabled}
            {...(w ? { wMax: w } : {})}
          >
            {value && (
              <FilterTrigger.Text
                ellipsis={ellipsis || undefined}
                ellipsis:observeChildrenMutations
              >
                {value}
              </FilterTrigger.Text>
            )}
          </Select.Trigger>
          <Select.Menu aria-label='Select device'>
            {devices.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.children}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
      </Flex>
    </Flex>
  );
};

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

export const filterTriggerSelectDDMenuExampleProps: FilterTriggerSelectDDMenuExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: 'Select device',
  disabled: undefined,
  ellipsis: undefined,
  w: undefined,
};

Demo.defaultProps = filterTriggerSelectDDMenuExampleProps;

export default Demo;
