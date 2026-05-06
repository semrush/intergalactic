import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Dot from '@semcore/ui/dot';
import React from 'react';

export default function AllDots() {
  return (
    <Flex gap={6} flexWrap alignItems='center'>
      <Dot aria-label='Notifications'>3</Dot>
      <Dot size='l' aria-label='Notifications'>
        12
      </Dot>
      <Button>
        Button
        <Dot up aria-label='New'>
          1
        </Dot>
      </Button>
    </Flex>
  );
}
