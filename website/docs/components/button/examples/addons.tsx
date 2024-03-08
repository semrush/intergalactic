import React from 'react';
import Button from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';
import ArrowRightM from 'intergalactic/icon/ArrowRight/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM} addonRight={ArrowRightM}>
        Button
      </Button>
      <Button ml={2}>
        <Button.Addon>
          <CheckM />
        </Button.Addon>
        <Button.Text>Button</Button.Text>
        <Button.Addon>
          <ArrowRightM />
        </Button.Addon>
      </Button>
    </>
  );
};

export default Demo;
