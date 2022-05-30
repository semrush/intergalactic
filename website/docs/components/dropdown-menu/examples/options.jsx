import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';

export default function () {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <ButtonTrigger>I'll show u some options, buddy 😉</ButtonTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.ItemTitle>I'm title</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemHint>I'm hint</DropdownMenu.ItemHint>
        <DropdownMenu.Item>I'm item</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
