import React from 'react';
import Tooltip from '@semcore/tooltip';

export default () => {
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <Tooltip visible disablePortal>
        <Tooltip.Trigger>
          <button type='button'>Test</button>
        </Tooltip.Trigger>
        <Tooltip.Popper arrowBgColor={'green'} arrowShadowColor={'grey'}>
          text text text
        </Tooltip.Popper>
      </Tooltip>
    </div>
  );
};
