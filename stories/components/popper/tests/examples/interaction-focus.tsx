import React from 'react';
// @ts-ignore
import Popper from '@semcore/popper';
// @ts-ignore
import { Box, Flex } from '@semcore/flex-box';
// @ts-ignore
import Card from '@semcore/card';
// @ts-ignore
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
