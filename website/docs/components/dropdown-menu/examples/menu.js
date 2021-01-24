import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';

export default function() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={ButtonTrigger}>Click me</DropdownMenu.Trigger>
      {/* Ограничиваем высоту списка */}
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
