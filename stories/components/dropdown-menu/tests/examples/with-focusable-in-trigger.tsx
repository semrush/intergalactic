import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Hint } from '@semcore/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <DropdownMenu interaction='focus'>
      <DropdownMenu.Trigger tag={Button}>
        Actions
        <Hint
          tag={LinkExternalM}
          interactive
          title='Go to our awesome article'
          color='icon-secondary-neutral'
        />
      </DropdownMenu.Trigger>
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
