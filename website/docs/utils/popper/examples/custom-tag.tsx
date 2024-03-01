import React from 'react';
import Popper from '@semcore/ui/popper';
import Button from '@semcore/ui/button';
import HamburgerM from '@semcore/ui/icon/Hamburger/m';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Popper>
    <Popper.Trigger tag={Button}>
      <Button.Addon>
        <HamburgerM />
      </Button.Addon>
    </Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
