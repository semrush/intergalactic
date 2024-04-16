import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list'>
        Elements of the list
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger
          tag={ButtonTrigger}
          mt={2}
          mr='auto'
          id='dropdown-menu-elements-of-the-list'
        >
          I'll show u some options, buddy
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.ItemTitle>I'm title</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemHint>I'm hint</DropdownMenu.ItemHint>
          <DropdownMenu.Item>I'm item</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
