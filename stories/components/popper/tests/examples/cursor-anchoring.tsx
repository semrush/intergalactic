import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

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
