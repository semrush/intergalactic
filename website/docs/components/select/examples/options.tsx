import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';

const Demo = () => (
  <Flex>
    <Select m='auto'>
      <Select.Trigger placeholder="I'll show u some options, buddy" />
      <Select.Menu>
        <Select.Option value={1}>I'm option</Select.Option>
        <Select.Option value={2}>
          <Select.Option.Checkbox />
          I'm option-checkbox
        </Select.Option>
        <Select.Option value={3} disabled>
          <Select.Option.Checkbox />
          I'm disabled option-checkbox
        </Select.Option>
        <Select.Option value={3}>
          <Select.Option.Checkbox indeterminate />
          I'm indeterminate option-checkbox
        </Select.Option>
        <Select.OptionTitle>I'm title</Select.OptionTitle>
        <Select.OptionHint>I'm hint</Select.OptionHint>
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
