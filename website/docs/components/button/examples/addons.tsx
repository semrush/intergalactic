import React from 'react';
import Button from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';
import ArrowRightM from 'intergalactic/icon/ArrowRight/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM}>Button</Button>
      <Button ml={2}>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <ArrowRightM />
        </Button.Addon>
      </Button>
    </>
  );
};

export default Demo;
