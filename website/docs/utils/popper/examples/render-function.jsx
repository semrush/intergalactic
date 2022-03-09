import React from 'react';
import Popper from '@semcore/popper';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

export default () => (
  <Popper interaction="focus">
    {({ getTriggerProps }) => (
      <>
        <input {...getTriggerProps({ placeholder: 'My custom trigger' })} />
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </>
    )}
  </Popper>
);
