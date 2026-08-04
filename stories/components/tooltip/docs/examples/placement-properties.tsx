import { Box } from '@semcore/ui/base-components';
import type { NSPopper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const styleBox = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '2vw',
  padding: '60px',
};

const Demo = () => {
  const placements: NSPopper.Placement[] = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'right-start',
    'left',
    'right',
    'left-end',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
  ];
  return (
    <Box style={styleBox}>
      {placements.map((placement, i) => {
        return (
          <React.Fragment key={i}>
            {['right', 'right-start', 'right-end'].includes(placement) && <div />}
            <Tooltip placement={placement}>
              <Tooltip.Trigger tag={Button}>{placement.toLocaleUpperCase()}</Tooltip.Trigger>
              <Tooltip.Popper>Hi there!</Tooltip.Popper>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Demo;
