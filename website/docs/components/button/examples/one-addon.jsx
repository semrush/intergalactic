import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';

export default function () {
  return (
    <Button aria-label="Confirm">
      <Button.Addon>
        <CheckM />
      </Button.Addon>
    </Button>
  );
}
