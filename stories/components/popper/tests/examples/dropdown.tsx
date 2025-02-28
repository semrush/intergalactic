import React from 'react';
// @ts-ignore
import DropdownMenu from '@semcore/dropdown-menu';
// @ts-ignore
import { ButtonTrigger } from '@semcore/base-trigger';

const Demo = () => {
  return (
    <div>
      <DropdownMenu visible>
        <DropdownMenu.Trigger tag={ButtonTrigger}>Enabled portal</DropdownMenu.Trigger>
        <DropdownMenu.Popper p={5} data-testid='popper' aria-label={'Select popper'}>
          <input data-testid='input-in-popper' />
        </DropdownMenu.Popper>
      </DropdownMenu>
      <input />
    </div>
  );
};

export default Demo;
