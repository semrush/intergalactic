import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import IconInfo from '@semcore/ui/icon/Info/m';

const Demo = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger tag={IconInfo} interactive={true} aria-label='Infromation hint' />
      <Tooltip.Popper>Content for tooltip</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
