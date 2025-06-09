import Badge from '@semcore/badge';
import Button from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';
import React from 'react';

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
