import CheckM from '@semcore/icon/Check/m';
import Badge from '@semcore/ui/badge';
import Button from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM}>Button</Button>
      <Button ml={2}>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <Badge type='new' />
        </Button.Addon>
      </Button>
    </>
  );
};

export default Demo;
