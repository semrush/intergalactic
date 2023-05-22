import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

export default function () {
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
}
