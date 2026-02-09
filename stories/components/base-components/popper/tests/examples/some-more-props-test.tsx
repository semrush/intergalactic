import HamburgerM from '@semcore/icon/Hamburger/m';
import { Popper, Flex } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Input from '@semcore/ui/input';
import React from 'react';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Flex>
    <Popper disabled>
      <Popper.Trigger tag={Button}>
        <Button.Addon>
          <HamburgerM />
        </Button.Addon>
        <Button.Text>Disabled popper</Button.Text>
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <DropdownMenu focusLoop={false}>
      <DropdownMenu.Trigger tag={ButtonTrigger}>focusLoop</DropdownMenu.Trigger>
      <DropdownMenu.Popper
        p={5}
        data-testid='popper'
        aria-label='Select popper'
        popperMargin={30}
      >
        <Input w={240} data-testid='input-in-popper'>
          <Input.Value placeholder='Password' />
        </Input>
      </DropdownMenu.Popper>
    </DropdownMenu>
  </Flex>
);

export default Demo;
