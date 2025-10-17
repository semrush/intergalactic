import { Popper, Box, Flex } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    ref.current?.focus();
  };

  return (
    <Flex gap={2}>
      <Tooltip interaction='hover'>
        <Tooltip.Trigger data-testid='trigger-hover'>Trigger</Tooltip.Trigger>
        <Tooltip.Popper data-testid='popper-hover'>Popper</Tooltip.Popper>
      </Tooltip>

      <Flex>
        <Button data-position='before-hover'>1</Button>
        <Popper interaction='hover' timeout={[0, 100]}>
          <Popper.Trigger>
            <Button data-testid='button-hover'>Click</Button>
          </Popper.Trigger>
          <Popper.Popper>
            <Card>Some content in popper</Card>
          </Popper.Popper>
        </Popper>
        <Button data-position='after-hover'>2</Button>
      </Flex>

      <Flex>
        <Button onClick={handleClick} data-position='before-onFocus'>1</Button>
        <Popper interaction='hover' timeout={[0, 100]}>
          <Popper.Trigger ref={ref} onClick={handleClick} tag={BaseTrigger} data-testid='popper-onFocus'>
            Click
          </Popper.Trigger>
          <Popper.Popper>
            <Card>Some content in popper</Card>
          </Popper.Popper>
        </Popper>
        <Button data-position='after-onFocus'>2</Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
