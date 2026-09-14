import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options = Array(12)
  .fill('')
  .map((_, index) => `Option ${index}`);

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='customized-dropdown-select'>
      Select with notice
    </Text>
    <Select>
      <Select.Trigger mt={2} mr='auto' id='customized-dropdown-select' />
      <Select.Popper aria-label='Select with notice'>
        <Select.List>
          {options.map((option, index) => (
            <Select.Option value={option} key={index}>
              {option}
            </Select.Option>
          ))}
        </Select.List>
        <Select.Notice px={3} aria-live='polite'>
          <Select.Notice.Text>Woooop, it's simple magic!</Select.Notice.Text>
        </Select.Notice>
      </Select.Popper>
    </Select>
  </Flex>
);

export default Demo;
