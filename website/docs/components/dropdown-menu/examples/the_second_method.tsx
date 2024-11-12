import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-children-items'>
        Your choice
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button} mt={2} mr='auto' id='dropdown-menu-children-items'>
          Choose an item
        </DropdownMenu.Trigger>
        {/* Adding max-height to the dropdown menu */}
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            <DropdownMenu.Item>Item 4</DropdownMenu.Item>
            <DropdownMenu.Item>Item 5</DropdownMenu.Item>
            <DropdownMenu.Item>Item 6</DropdownMenu.Item>
            <DropdownMenu.Item>Item 7</DropdownMenu.Item>
            <DropdownMenu.Item>Item 8</DropdownMenu.Item>
            <DropdownMenu.Item>Item 9</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
