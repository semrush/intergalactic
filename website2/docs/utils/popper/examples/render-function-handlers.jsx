import React from 'react';
import Button from '@semcore/button';
import Popper from '@semcore/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper>
    {(props, handlers) => {
      // function for managing the visibility state of Popper.Popper
      const { visible } = handlers;

      return (
        <>
          <Button onClick={() => visible(true)} mr={4}>
            Open popper
          </Button>
          <Popper.Trigger style={style}>Attach trigger</Popper.Trigger>
          <Popper.Popper style={style}>
            <p>Attached content</p>
            <Button onClick={() => visible(false)}>Close popper</Button>
          </Popper.Popper>
        </>
      );
    }}
  </Popper>
);
