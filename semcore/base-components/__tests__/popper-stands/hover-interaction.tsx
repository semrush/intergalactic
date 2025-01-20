import React from 'react';
// @ts-ignore
import Tooltip from 'intergalactic/tooltip';

const Demo = () => {
  return (
    <Tooltip interaction='hover'>
      <Tooltip.Trigger data-testid='trigger'>Trigger</Tooltip.Trigger>
      <Tooltip.Popper data-testid='popper'>Popper</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
