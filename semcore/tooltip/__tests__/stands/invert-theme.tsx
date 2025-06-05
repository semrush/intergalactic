import Tooltip from '@semcore/tooltip';
import React from 'react';

export default () => {
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <Tooltip visible disablePortal theme='invert'>
        <Tooltip.Trigger>
          <button type='button'>Test</button>
        </Tooltip.Trigger>
        <Tooltip.Popper style={{ opacity: 1 }}>text text text</Tooltip.Popper>
      </Tooltip>
    </div>
  );
};
