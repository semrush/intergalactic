import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';

export default function () {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <ButtonTrigger>Click me</ButtonTrigger>
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
  );
}
