import Button from '@semcore/ui/button';
import Popper from '@semcore/ui/popper';
import React from 'react';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Popper offset={30}>
    <Popper.Trigger tag={Button}>Open popper</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
