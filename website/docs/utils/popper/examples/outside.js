import React from 'react';
import Popper from '@semcore/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper
    onOutsideClick={() => {
      // cancel hide popper
      return false;
    }}
  >
    <Popper.Trigger style={style}>Click me pls</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
