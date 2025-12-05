import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import React from 'react';

type SelectDisabledItemsProps = SelectProps & {
  disabledAll?: boolean;
  disabledOption1?: boolean;
  disabledOption2?: boolean;
  disabledOption3?: boolean;
  disabledOption4?: boolean;
  selectedOption1?: boolean;
  selectedOption2?: boolean;
  selectedOption3?: boolean;
  selectedOption4?: boolean;
};

const Demo = (props: SelectDisabledItemsProps) => {
  const {
    size,
    visible,
    disablePortal,
    disabledAll,
    disabledOption1,
    disabledOption2,
    disabledOption3,
    disabledOption4,
    selectedOption1,
    selectedOption2,
    selectedOption3,
    selectedOption4,
  } = props;

  return (
    <Flex gap={16} direction='column'>
      <Select size={size} visible={visible} disablePortal={disablePortal}>
        <Select.Trigger placeholder='Select option' />
        <Select.Menu>
          <Select.Option value={1} disabled={disabledAll || disabledOption1} selected={selectedOption1}>
            Option 1
          </Select.Option>
          <Select.Option value={2} disabled={disabledAll || disabledOption2} selected={selectedOption2}>
            Option 2
          </Select.Option>
          <Select.Option value={3} disabled={disabledAll || disabledOption3} selected={selectedOption3}>
            Option 3
          </Select.Option>
          <Select.Option value={4} disabled={disabledAll || disabledOption4} selected={selectedOption4}>
            Option 4
          </Select.Option>
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export const defaultProps: SelectDisabledItemsProps = {
  size: 'm',
  disabledAll: false,
  disabledOption1: false,
  disabledOption2: false,
  disabledOption3: false,
  disabledOption4: false,
  selectedOption1: false,
  selectedOption2: false,
  selectedOption3: false,
  selectedOption4: false,
  visible: undefined,
  disablePortal: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
