import Tooltip from '@semcore/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <Tooltip interaction='hover'>
      <Tooltip.Trigger data-testid='trigger'>Trigger</Tooltip.Trigger>
      <Tooltip.Popper data-testid='popper'>Popper</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
