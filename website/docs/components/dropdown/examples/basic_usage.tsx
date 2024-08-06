import React from 'react';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='dropdown-basic'>
      Basic usage
    </Text>
    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' mt={2} mr='auto' tag={ButtonTrigger}>
        Trigger
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} aria-label='Dropdown popper description'>
        Content
      </Dropdown.Popper>
    </Dropdown>
  </Flex>
);

export default Demo;
