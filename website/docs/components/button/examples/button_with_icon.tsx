import React from 'react';
import Button from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => {
  return (
    <Button title='Confirm'>
      <Button.Addon>
        <CheckM />
      </Button.Addon>
    </Button>
  );
};

export default Demo;
