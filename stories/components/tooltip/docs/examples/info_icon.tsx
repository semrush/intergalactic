import IconInfo from '@semcore/icon/Info/m';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger
        tag={IconInfo}
        color='--intergalactic-icon-secondary-neutral'
        interactive={true}
        aria-label='Hint'
      />
      <Tooltip.Popper>Content for tooltip</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
