import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={16} direction='row'>
      <DropdownMenu size='m' visible disablePortal stretch='min'>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>S</DropdownMenu.Item>
          <DropdownMenu.Item>R</DropdownMenu.Item>
          <DropdownMenu.Item>D</DropdownMenu.Item>
          <DropdownMenu.Item>D</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='m' visible disablePortal stretch='min'>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save Save Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' visible disablePortal stretch='fixed'>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' visible disablePortal stretch='fixed'>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>S</DropdownMenu.Item>
          <DropdownMenu.Item>R</DropdownMenu.Item>
          <DropdownMenu.Item>D</DropdownMenu.Item>
          <DropdownMenu.Item>D</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' visible disablePortal stretch={false}>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <DropdownMenu size='l' visible disablePortal stretch={false}>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Sa</DropdownMenu.Item>
          <DropdownMenu.Item>R</DropdownMenu.Item>
          <DropdownMenu.Item>D</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>

  );
};

export default Demo;
