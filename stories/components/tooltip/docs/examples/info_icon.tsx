import Info from '@semcore/icon/Info/m';
import { ButtonLink } from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger
        tag={ButtonLink}
        addonLeft={Info}
        color='--intergalactic-icon-secondary-neutral'
        aria-label='Hint'
      />
      <Tooltip.Popper>Content for tooltip</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
