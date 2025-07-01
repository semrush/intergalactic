import { Popper } from '@semcore/base-components';
import Button from '@semcore/button';
import HamburgerM from '@semcore/icon/Hamburger/m';
import React from 'react';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Popper>
    <Popper.Trigger tag={Button}>
      <Button.Addon>
        <HamburgerM />
      </Button.Addon>
      <Button.Text>Menu</Button.Text>
    </Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
