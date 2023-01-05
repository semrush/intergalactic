import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

export default () => (
  <Flex>
    <Select m="auto">
      <Select.Trigger placeholder="I'll show u some options, buddy 😉" />
      <Select.Menu>
        <Select.Option value={1}>I'm option</Select.Option>
        <Select.Option value={2}>
          <Select.Option.Checkbox />
          I'm option-checkbox
        </Select.Option>
        <Select.OptionTitle>I'm title</Select.OptionTitle>
        <Select.OptionHint>I'm hint</Select.OptionHint>
      </Select.Menu>
    </Select>
  </Flex>
);
