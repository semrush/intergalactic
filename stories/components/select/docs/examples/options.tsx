import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='options-select'>
      Option types
    </Text>
    <Select>
      <Select.Trigger
        placeholder='There are several option types'
        mr='auto'
        mt={2}
        id='options-select'
      />
      <Select.Menu>
        <Select.Option value={1}>Default option</Select.Option>
        <Select.Option value={2}>
          <Select.Option.Checkbox />
          Checkbox option
        </Select.Option>
        <Select.Option value={3} disabled>
          <Select.Option.Checkbox />
          Disabled checkbox option
        </Select.Option>
        <Select.Option value={3}>
          <Select.Option.Content>
            <Select.Option.Checkbox indeterminate />
            Indeterminate checkbox option
          </Select.Option.Content>
          <Select.Option.Hint>Hint for the option</Select.Option.Hint>
        </Select.Option>

        <Select.Group title={'Group title'} subTitle={'Hint for the title'}>
          <Select.Option value={4}>1st option in group</Select.Option>
          <Select.Option value={5}>2nd option in group</Select.Option>
          <Select.Option value={6}>3rd option in group</Select.Option>
        </Select.Group>
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
