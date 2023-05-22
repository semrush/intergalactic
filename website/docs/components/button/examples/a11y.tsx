import React from 'react';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';

export default function () {
  return (
    <>
      <Button addonLeft={CloseM} aria-label="Close" />
      <Button ml={2} aria-label="Confirm">
        <CheckM />
      </Button>
    </>
  );
}
