import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Save</DropdownMenu.Item>
        <DropdownMenu.Item>Rename</DropdownMenu.Item>
        <DropdownMenu.Item>Download</DropdownMenu.Item>
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
