import React from 'react';
import Button from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';

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
