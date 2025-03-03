import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';
import Input from '@semcore/input';

const Demo = () => {
  return (
    <div>
      <DropdownMenu visible>
        <DropdownMenu.Trigger tag={ButtonTrigger}>Enabled portal</DropdownMenu.Trigger>
        <DropdownMenu.Popper p={5} data-testid='popper' aria-label={'Select popper'}>
        <Input w={240} data-testid="input-in-popper">
        <Input.Value
          placeholder='Password'
        />
        </Input>
        </DropdownMenu.Popper>
      </DropdownMenu>
      <Input w={240}>
        <Input.Value
          placeholder='Password'
        />
        </Input>
    </div>
  );
};

export default Demo;
