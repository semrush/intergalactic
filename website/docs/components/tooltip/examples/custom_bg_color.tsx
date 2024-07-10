import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Box } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

const Demo = () => (
  <Tooltip>
    <Tooltip.Trigger tag={Link} href='#'>
      Colored tooltip
    </Tooltip.Trigger>
    <Tooltip.Popper
      arrowBgColor={'bg-secondary-advertising'}
      arrowShadowColor={'bg-secondary-advertising'}
      p={0}
    >
      <Box style={{ background: 'bg-secondary-advertising' }} p={3}>
        Hey! I'm your colored tooltip!
      </Box>
    </Tooltip.Popper>
  </Tooltip>
);

export default Demo;
