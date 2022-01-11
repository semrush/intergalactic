import React from 'react';
import Button from '@semcore/button';
import CheckXS from '@semcore/icon/lib/Check/m';
import ArrowRightXS from '@semcore/icon/lib/ArrowRight/m';

export default function() {
  return (
    <>
      <Button addonLeft={CheckXS} addonRight={ArrowRightXS}>
        Button
      </Button>
      <Button ml={2}>
        <Button.Addon tag={CheckXS} />
        <Button.Text>Button</Button.Text>
        <Button.Addon tag={ArrowRightXS} />
      </Button>
    </>
  );
}
