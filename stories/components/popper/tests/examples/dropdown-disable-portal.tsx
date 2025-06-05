import { ButtonTrigger } from '@semcore/base-trigger';
import DropdownMenu from '@semcore/dropdown-menu';
import React from 'react';

const Demo = () => {
  return (
    <div>
      <DropdownMenu visible disablePortal>
        <DropdownMenu.Trigger tag={ButtonTrigger}>Disabled portal</DropdownMenu.Trigger>
        <DropdownMenu.Popper p={5} data-testid='popper' aria-label='Select popper'>
          <input data-testid='input-in-popper' />
        </DropdownMenu.Popper>
      </DropdownMenu>
      <input />
      <input />
    </div>
  );
};

export default Demo;
