import React from 'react';
import Popper from 'intergalactic/popper';
import Button from 'intergalactic/button';
import HamburgerM from 'intergalactic/icon/Hamburger/m';

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
