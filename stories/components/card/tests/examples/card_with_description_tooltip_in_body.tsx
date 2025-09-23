import { LinkTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import Card from '@semcore/card';
import Tooltip, { DescriptionTooltip, Hint } from '@semcore/tooltip';
import React from 'react';

const Demo = () => (
  <Card>
    <Tooltip>
      <Tooltip.Trigger>
        <Button>Tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
    </Tooltip>

    <DescriptionTooltip>
      <DescriptionTooltip.Trigger tag={Button}>
        DescriptionTooltip
      </DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper aria-label='Hello'>Hello, stranger!</DescriptionTooltip.Popper>
    </DescriptionTooltip>

  </Card>
);

export default Demo;
