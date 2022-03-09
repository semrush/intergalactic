import React from 'react';
import Popper from '@semcore/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper interaction="hover">
    <Popper.Trigger style={style}>Hover me pls</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);
