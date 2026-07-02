import { Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => (
  <Tooltip>
    <Tooltip.Trigger tag={ButtonLink}>Colored tooltip</Tooltip.Trigger>
    <Tooltip.Popper
      arrowBgColor='bg-primary-advertising'
      arrowShadowColor='tooltip-border-invert'
      p={0}
    >
      <Box
        style={{
          background: 'var(--intergalactic-bg-primary-advertising)',
          color: 'var(--intergalactic-text-primary-invert)',
          borderRadius: 'var(--intergalactic-popper-rounded)',
          borderColor: 'var(--intergalactic-tooltip-border-invert)',
        }}
        p={3}
      >
        Hey! I'm your colored tooltip!
      </Box>
    </Tooltip.Popper>
  </Tooltip>
);

export default Demo;
