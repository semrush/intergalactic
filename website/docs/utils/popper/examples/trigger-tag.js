import React from 'react';
import Popper from '@semcore/popper';
import Button from '@semcore/button';
import HamburgerXS from '@semcore/icon/lib/Hamburger/m';

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
