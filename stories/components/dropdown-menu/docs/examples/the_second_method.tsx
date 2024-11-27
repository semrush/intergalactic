import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-children-items'>
        Your action
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button} mt={2} mr='auto' id='dropdown-menu-children-items'>
          Explore menu items
        </DropdownMenu.Trigger>
        {/* Adding max-height to the dropdown menu */}
        <DropdownMenu.Menu hMax={'180px'}>
          <DropdownMenu.Group title={'List heading'} subTitle={'Subtitle'}>
            <DropdownMenu.Item>Menu item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 3</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 4</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 5</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 6</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 7</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 8</DropdownMenu.Item>
            <DropdownMenu.Item>Menu item 9</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
