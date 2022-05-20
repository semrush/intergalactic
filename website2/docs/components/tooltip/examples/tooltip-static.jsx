import React from 'react';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';

const Demo = () => (
  <Tooltip>
    <Tooltip.Trigger>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Popper>Hello, I am a tooltip! Very nice to meet you!</Tooltip.Popper>
  </Tooltip>
);

export default Demo;
