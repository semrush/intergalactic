import React from 'react';
import Popper from 'intergalactic/popper';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
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

export default Demo;
