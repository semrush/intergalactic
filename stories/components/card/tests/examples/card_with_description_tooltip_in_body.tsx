import { Box, Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import Card from '@semcore/card';
import Tooltip, { DescriptionTooltip } from '@semcore/tooltip';
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
      <DescriptionTooltip.Popper>Hello, stranger!</DescriptionTooltip.Popper>
    </DescriptionTooltip>
  </Card>
);

export default Demo;
