import React from 'react';
import Button from 'intergalactic/button';
import PlusM from 'intergalactic/icon/MathPlus/m';

const Demo = () => {
  return (
    <>
      <Button tag={'a'} href='#'>
        <Button.Addon>
          <PlusM />
        </Button.Addon>
        <Button.Text>Link as button</Button.Text>
      </Button>{' '}
      <Button tag={'a'} disabled>
        <Button.Addon>
          <PlusM />
        </Button.Addon>
        <Button.Text>Disabled link as button</Button.Text>
      </Button>
    </>
  );
};

export default Demo;
