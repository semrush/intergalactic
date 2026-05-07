import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Tooltip, { DescriptionTooltip } from '@semcore/ui/tooltip';
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

    <Card.Title>
      <Tooltip>
        <Tooltip.Trigger>
          <Button>TooltipTitle</Button>
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
      </Tooltip>

      <DescriptionTooltip>
        <DescriptionTooltip.Trigger tag={Button}>
          DescriptionTooltipTitle
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='Hello2'>Hello, stranger!</DescriptionTooltip.Popper>
      </DescriptionTooltip>
      Market Traffic
    </Card.Title>

    <Card.Description>
      {' '}
      <Tooltip>
        <Tooltip.Trigger>
          <Button>TooltipTitleDescription</Button>
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
      </Tooltip>

      <DescriptionTooltip>
        <DescriptionTooltip.Trigger tag={Button}>
          DescriptionTooltipDescription
        </DescriptionTooltip.Trigger>
        <DescriptionTooltip.Popper aria-label='Hello3'>Hello, stranger!</DescriptionTooltip.Popper>
      </DescriptionTooltip>
      Info about data (optional)
    </Card.Description>

  </Card>
);

export default Demo;
