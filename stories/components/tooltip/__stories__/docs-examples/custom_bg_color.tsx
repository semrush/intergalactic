import React from 'react';
import Tooltip from '@semcore/tooltip';
import { Box } from '@semcore/flex-box';
import { ButtonLink } from '@semcore/button';

const Demo = () => (
  <Tooltip>
    <Tooltip.Trigger tag={ButtonLink}>Colored tooltip</Tooltip.Trigger>
    <Tooltip.Popper
      arrowBgColor={'bg-primary-advertising'}
      arrowShadowColor={'border-tooltip-invert'}
      p={0}
    >
      <Box
        style={{
          background: 'var(--intergalactic-bg-primary-advertising)',
          color: 'var(--intergalactic-text-primary-invert)',
          borderRadius: 'var(--intergalactic-popper-rounded)',
          borderColor: 'var(--intergalactic-border-tooltip-invert)',
        }}
        p={3}
      >
        Hey! I'm your colored tooltip!
      </Box>
    </Tooltip.Popper>
  </Tooltip>
);

export default Demo;
