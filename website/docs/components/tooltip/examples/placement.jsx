import React from 'react';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';

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
      {placements.map((placement) => {
        return (
          <>
            {['right', 'right-start', 'right-end'].includes(placement) && <div />}
            <Tooltip placement={placement}>
              <Tooltip.Trigger tag={Button} w="100px">
                {placement.toLocaleUpperCase()}
              </Tooltip.Trigger>
              <Tooltip.Popper>Attached content</Tooltip.Popper>
            </Tooltip>
          </>
        );
      })}
    </Box>
  );
}

export default Demo;
