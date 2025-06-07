import Button from '@semcore/button';
import Divider from '@semcore/divider';
import DropdownMenu from '@semcore/dropdown-menu';
import { Flex } from '@semcore/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={16} direction='row'>
      <DropdownMenu size='m' visible disablePortal>
        <DropdownMenu.Trigger tag={Button}>M size</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='m-size'>
          <DropdownMenu.Item disabled>Save disadled</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <Divider />
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' visible disablePortal>
        <DropdownMenu.Trigger tag={Button}>L size</DropdownMenu.Trigger>
        <DropdownMenu.Menu data-testid='l-size'>
          <DropdownMenu.Item disabled>Save disabled</DropdownMenu.Item>
          <Divider />
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
