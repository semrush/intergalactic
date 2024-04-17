import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-children-items'>
        Button trigger
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger
          tag={ButtonTrigger}
          mt={2}
          mr='auto'
          id='dropdown-menu-children-items'
        >
          Click me
        </DropdownMenu.Trigger>
        {/* Adding max-height to the dropdown menu */}
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.ItemTitle>List heading</DropdownMenu.ItemTitle>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          <DropdownMenu.Item>Item 4</DropdownMenu.Item>
          <DropdownMenu.Item>Item 5</DropdownMenu.Item>
          <DropdownMenu.Item>Item 6</DropdownMenu.Item>
          <DropdownMenu.Item>Item 7</DropdownMenu.Item>
          <DropdownMenu.Item>Item 8</DropdownMenu.Item>
          <DropdownMenu.Item>Item 9</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
