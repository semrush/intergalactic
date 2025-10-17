import { Popper, Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex>
        <Button data-position='before'>1</Button>
        <Popper interaction='focus' timeout={[0, 100]}>
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
