import React from 'react';
import Popper from '@semcore/popper';
import Button from '@semcore/button';

const style = { background: '#FFF', border: '1px solid black', padding: '20px' };

function Demo() {
  return (
    <>
      <Popper>
        <Popper.Trigger tag={Button} mr={8}>
          rootBoundary: "viewport"
        </Popper.Trigger>
        <Popper.Popper style={style}>Scroll page</Popper.Popper>
      </Popper>
      <Popper preventOverflow={{ rootBoundary: 'document' }}>
        <Popper.Trigger tag={Button} mr={8}>
          rootBoundary: "document"
        </Popper.Trigger>
        <Popper.Popper style={style}>Scroll page</Popper.Popper>
      </Popper>
      <span
        style={{
          overflow: 'auto',
          display: 'inline-block',
          height: 200,
          border: '1px solid black',
        }}
      >
        <span style={{ display: 'inline-block', height: 500 }}>
          <Popper preventOverflow={{ altBoundary: true }}>
            <Popper.Trigger tag={Button} mt="150px">
              altBoundary: true
            </Popper.Trigger>
            <Popper.Popper style={style}>Scroll me</Popper.Popper>
          </Popper>
        </span>
      </span>
    </>
  );
}

export default Demo;
