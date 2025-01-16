import React from 'react';
import Popper from '@semcore/popper';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Popper interaction='hover'>
    <Popper.Trigger style={style}>Hover me pls</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
