import React from 'react';
import { Box } from 'intergalactic/flex-box';
import Popper from 'intergalactic/popper';
import Button from 'intergalactic/button';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const styleBox = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '2vw',
  padding: '60px',
};

const Demo = () => (
  <Box style={styleBox}>
    <Popper placement='top-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='top' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='top-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        TOP END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='left-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        LEFT END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <div />
    <Popper placement='right-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        RIGHT END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>

    <Popper placement='bottom-start' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM START
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='bottom' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
    <Popper placement='bottom-end' interaction='hover'>
      <Popper.Trigger w='100px' tag={Button}>
        BOTTOM END
      </Popper.Trigger>
      <Popper.Popper style={style}>Attached content</Popper.Popper>
    </Popper>
  </Box>
);

export default Demo;
