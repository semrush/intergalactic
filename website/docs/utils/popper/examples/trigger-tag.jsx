import React from 'react';
import Popper from '@semcore/ui/popper';
import Button from '@semcore/ui/button';
import HamburgerXS from '@semcore/ui/icon/Hamburger/m';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper>
    <Popper.Trigger tag={Button}>
      <Button.Addon>
        <HamburgerXS />
      </Button.Addon>
    </Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
