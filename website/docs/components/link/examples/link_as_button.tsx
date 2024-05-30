import React from 'react';
import Button from 'intergalactic/button';
import Link from 'intergalactic/link';
import PlusM from 'intergalactic/icon/MathPlus/m';

const Demo = () => {
  return (
    <Button tag={Link} href='#'>
      <Button.Addon>
        <PlusM />
      </Button.Addon>
      <Button.Text>Link as button</Button.Text>
    </Button>
  );
};

export default Demo;
