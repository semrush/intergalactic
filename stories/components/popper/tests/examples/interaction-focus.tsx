import React from 'react';
import Popper from '@semcore/popper';
import { Box, Flex } from '@semcore/flex-box';
import Card from '@semcore/card';
import Button from '@semcore/button';

const Demo = () => {
  return (
    <>
      <Flex>
        <Button data-position='before'>1</Button>
        <Popper interaction={'focus'} timeout={[0, 100]}>
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
