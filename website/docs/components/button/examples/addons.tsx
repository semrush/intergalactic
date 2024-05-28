import React from 'react';
import Button from 'intergalactic/button';
import Badge from '@semcore/ui/badge';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM}>Button</Button>
      <Button ml={2}>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <Badge bg='green-400'>new</Badge>
        </Button.Addon>
      </Button>
    </>
  );
};

export default Demo;
