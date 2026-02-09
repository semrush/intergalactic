import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Button, { ButtonLink } from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

const Demo = () => {
  return (
    <DropdownMenu interaction='focus'>
      <DropdownMenu.Trigger tag={Button}>
        Actions
        <ButtonLink
          addonLeft={LinkExternalM}
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
