import { Popper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <Popper interaction='hover'>
    <Popper.Trigger tag={Button}>Open popper on hover or focus</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
