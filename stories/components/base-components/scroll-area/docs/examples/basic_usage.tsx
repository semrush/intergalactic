import { Box, ScrollArea } from '@semcore/ui/base-components';
import React from 'react';

const CHART_PALETTE_ORDER_COUNT = 24;

const Demo = () => (
  <ScrollArea h={300}>
    {[...new Array(100)].map((_, index) => (
      <Box
        key={index}
        inline
        m={2}
        w={160}
        h={160}
        style={{
          backgroundColor: `var(--intergalactic-chart-palette-order-${(index % CHART_PALETTE_ORDER_COUNT) + 1})`, borderRadius: 'var(--intergalactic-surface-rounded)',
        }}
      />
    ))}
  </ScrollArea>
);

export default Demo;
