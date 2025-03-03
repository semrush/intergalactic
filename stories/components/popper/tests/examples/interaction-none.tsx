import React from 'react';
import Tooltip from '@semcore/tooltip';
import Popper from '@semcore/popper';
import { Box, Flex } from '@semcore/flex-box';
import Card from '@semcore/card';
import Button from '@semcore/button';

const Demo = () => {
  return (
    <>
       <Flex m={4} >
    <Tooltip interaction='none'>
      <Tooltip.Trigger data-testid='trigger'>Trigger</Tooltip.Trigger>
      <Tooltip.Popper data-testid='popper'>Popper</Tooltip.Popper>
    </Tooltip>
   </Flex>

    <Flex>
        <Button data-position='before'>1</Button>
        <Popper interaction={'none'} timeout={[0, 100]}>
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
