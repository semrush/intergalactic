import React from 'react';
import Button from 'intergalactic/button';
import { Hint } from 'intergalactic/tooltip';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => {
  return (
    <Button aria-label='Confirm'>
      <Button.Addon tag={Hint} title={'Confirm'}>
        <CheckM />
      </Button.Addon>
    </Button>
  );
};

export default Demo;
