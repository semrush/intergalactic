import React from 'react';
import Button from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';

export default function () {
  return (
    <Button>
      <Button.Addon tag={CheckM} />
    </Button>
  );
}
