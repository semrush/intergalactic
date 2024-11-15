import React from 'react';
import Button from '@semcore/button';
import Badge from '@semcore/ui/badge';
import CheckM from '@semcore/icon/Check/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM}>Button</Button>
      <Button ml={2}>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <Badge bg='--intergalactic-control-primary-success'>new</Badge>
        </Button.Addon>
      </Button>
    </>
  );
};

export default Demo;
