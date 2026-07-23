import { Flex } from '@semcore/ui/base-components';
import Notice from '@semcore/ui/notice';
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
        {/* TODO: remove styles and replace with new dropdown notice */}
        <Notice
          p='var(--intergalactic-spacing-content-inset-inline)'
          borderRadius='0 0 var(--intergalactic-rounded-medium, 6px) var(--intergalactic-rounded-medium, 6px)'
          style={{
            borderWidth: '1px 0 0 0',
          }}
        >
          <Notice.Content aria-live='polite'>Woooop, it's simple magic!</Notice.Content>
        </Notice>
      </Select.Popper>
    </Select>
  </Flex>
);

export default Demo;
