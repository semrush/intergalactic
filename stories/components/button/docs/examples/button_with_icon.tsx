import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
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
