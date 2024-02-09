import React from 'react';
import Button from 'intergalactic/button';
import Divider from 'intergalactic/divider';
import { Flex } from 'intergalactic/flex-box';
import NeighborLocation from 'intergalactic/neighbor-location';

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
