import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { Box, Flex } from '@semcore/ui/flex-box';
import Popper from '@semcore/ui/popper';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex m={4}>
        <Tooltip interaction='click'>
          <Tooltip.Trigger data-testid='trigger'>Trigger</Tooltip.Trigger>
          <Tooltip.Popper data-testid='popper'>Popper</Tooltip.Popper>
        </Tooltip>
      </Flex>

      <Flex>
        <Button data-position='before'>1</Button>
        <Popper interaction='click' timeout={[0, 100]}>
          <Popper.Trigger>
            <Button data-testid='button'>Click</Button>
          </Popper.Trigger>
          <Popper.Popper>
            <Card>Some content in popper</Card>
          </Popper.Popper>
        </Popper>
        <Button data-position='after'>2</Button>
      </Flex>
    </>
  );
};

export default Demo;
