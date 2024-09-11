import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='options-select'>
      Options
    </Text>
    <Select>
      <Select.Trigger
        placeholder="I'll show u some options, buddy"
        mr='auto'
        mt={2}
        id='options-select'
      />
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
          <Select.Option.Content>
            <Select.Option.Checkbox indeterminate />
            I'm indeterminate option-checkbox
          </Select.Option.Content>
          <Select.Option.Hint>I'm hint</Select.Option.Hint>
        </Select.Option>

        <Select.Group title={"I'm title"} subTitle={"I'm hint"}>
          <Select.Option value={4}>Option 1</Select.Option>
          <Select.Option value={5}>Option 2</Select.Option>
          <Select.Option value={6}>Option 3</Select.Option>
        </Select.Group>
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
