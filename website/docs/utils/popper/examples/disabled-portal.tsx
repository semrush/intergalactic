import React from 'react';
import Popper from 'intergalactic/popper';
import Button from 'intergalactic/button';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => (
  <>
    <Popper disablePortal>
      <Popper.Trigger tag={Button} mr={8}>
        disablePortal = true
      </Popper.Trigger>
      <Popper.Popper style={style}>disablePortal = true</Popper.Popper>
    </Popper>
    <Popper>
      <Popper.Trigger tag={Button}>disablePortal = false</Popper.Trigger>
      <Popper.Popper style={style}>disablePortal = false</Popper.Popper>
    </Popper>
  </>
);

export default Demo;
