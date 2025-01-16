import React from 'react';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <Flex direction='column' gap={4}>
      <Flex>
        <Button neighborLocation='right'>Left</Button>
        <Button neighborLocation='both'>Center</Button>
        <Button neighborLocation='left'>Right</Button>
      </Flex>
      <Flex>
        <Button neighborLocation='right' use='primary'>
          Left
        </Button>
        <Button neighborLocation='both' use='primary'>
          Center
        </Button>
        <Button neighborLocation='left' use='primary'>
          Right
        </Button>
      </Flex>
      <Flex>
        <Button neighborLocation='right' use='primary' theme='success'>
          Left
        </Button>
        <Button neighborLocation='both' use='primary' theme='success'>
          Center
        </Button>
        <Button neighborLocation='left' use='primary' theme='success'>
          Right
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
