import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';

export default () => (
  <Flex>
    <Select m="auto">
      <Select.Trigger placeholder="I'll show u some options, buddy 😉" />
      <Select.Menu>
        <Select.Option value={1}>I'm option</Select.Option>
        <Select.OptionCheckbox value={2}>I'm option-checkbox</Select.OptionCheckbox>
        <Select.OptionTitle>I'm title</Select.OptionTitle>
        <Select.OptionHint>I'm hint</Select.OptionHint>
      </Select.Menu>
    </Select>
  </Flex>
);
