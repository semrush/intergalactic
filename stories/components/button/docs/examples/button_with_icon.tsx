import CheckM from '@semcore/icon/Check/m';
import Button from '@semcore/ui/button';
import React from 'react';

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
