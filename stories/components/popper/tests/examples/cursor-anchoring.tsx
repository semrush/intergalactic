import React from 'react';
// @ts-ignore
import Tooltip from '@semcore/tooltip';

const Demo = () => {
  return (
    <Tooltip cursorAnchoring>
      <Tooltip.Trigger
        data-testid='trigger'
        // @ts-ignore
        style={{
          border: '1px dashed black',
          borderRadius: 10,
          width: 800,
          height: 300,
        }}
      />
      <Tooltip.Popper data-testid='popper'>Content for tooltip</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
