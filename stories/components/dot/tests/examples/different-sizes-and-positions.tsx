import React from 'react';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import Dot from '@semcore/dot';

const Demo = () => {

  return (
    <Flex direction='row' gap={2}>

      <Dot size='m' aria-label='Our brand new button!' />
      <Dot size='l' aria-label='Our brand new button!' />

      <Button>
        Button Dot
        <Dot aria-label='Our brand new button!' />
      </Button>

      <Button>
        Button Dot up
        <Dot up aria-label='Our brand new button!' />
      </Button>

      <Button>
        Button Dot with value Up
        <Dot up aria-label='Value'>
          12
        </Dot>
      </Button>
      <Button>
        Button Dot with value
        <Dot aria-label='Our brand new button!'>12</Dot>
      </Button>

      <Button>
        Button Dot L
        <Dot size='l' aria-label='L size' />
      </ Button>
      <Button>
        Button Dot M
        <Dot size='m' aria-label='M size' />
      </Button>
      <Button>
        Button Dot L Up
        <Dot up size='l' aria-label='L size Up' />
      </Button>
      <Button>
        Button Dot M Up
        <Dot up size='m' aria-label='M size Up' />
      </Button>
    </Flex>
  );
};

export default Demo;
