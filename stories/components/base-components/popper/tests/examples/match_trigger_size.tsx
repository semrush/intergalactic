import { Popper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import React from 'react';

const Demo = () => {
  return (
    <Popper placement='bottom' matchTriggerSize>
      <Popper.Trigger tag={Button} w='140px' data-testid='button-trigger'>
        Click
      </Popper.Trigger>
      <Popper.Popper data-testid='popper'>
        <Card>Some content in popper</Card>
      </Popper.Popper>
    </Popper>
  );
};

export default Demo;
