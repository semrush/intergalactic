import React from 'react';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='button-trigger-dropdown'>
      Button trigger dropdown
    </Text>
    <Dropdown interaction={'focus'}>
      <Dropdown.Trigger id='button-trigger-dropdown' mt={2} mr='auto' tag={ButtonTrigger}>
        Trigger
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} aria-label='Dropdown popper description'>
        Content
      </Dropdown.Popper>
    </Dropdown>
  </Flex>
);

export default Demo;
