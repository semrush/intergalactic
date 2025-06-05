import Tooltip from '@semcore/tooltip';
import React from 'react';

export default () => {
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <Tooltip visible disablePortal>
        <Tooltip.Trigger>
          <button type='button'>Test</button>
        </Tooltip.Trigger>
        <Tooltip.Popper arrowBgColor='green' arrowShadowColor='grey'>
          text text text
        </Tooltip.Popper>
      </Tooltip>
    </div>
  );
};
