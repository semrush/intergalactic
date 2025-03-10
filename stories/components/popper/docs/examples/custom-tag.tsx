import React from 'react';
import Popper from '@semcore/popper';
import Button from '@semcore/button';
import HamburgerM from '@semcore/icon/Hamburger/m';

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
