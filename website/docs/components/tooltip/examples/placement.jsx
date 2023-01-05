import React from 'react';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';

const styleBox = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '2vw',
  padding: '60px',
};

function Demo() {
  const placements = [
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
              <Tooltip.Trigger tag={Button} w="100px">
                {placement.toLocaleUpperCase()}
              </Tooltip.Trigger>
              <Tooltip.Popper>Attached content</Tooltip.Popper>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default Demo;
