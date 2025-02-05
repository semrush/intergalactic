import React from 'react';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import { Flex } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';

const Demo = () => {
  return (
    <Flex direction='column' gap={4}>
      <Flex role='group' aria-label='secondary buttons'>
        <Button neighborLocation='right'>First</Button>
        <Button neighborLocation='both'>Middle</Button>
        <Button neighborLocation='left'>Last</Button>
      </Flex>
      <Flex role='group' aria-label='primary buttons'>
        <Button neighborLocation='right' use='primary'>
          First
        </Button>
        <Button neighborLocation='both' use='primary'>
          Middle
        </Button>
        <Button neighborLocation='left' use='primary'>
          Last
        </Button>
      </Flex>
      <Flex role='group' aria-label='primary success buttons'>
        <Button neighborLocation='right' use='primary' theme='success'>
          First
        </Button>
        <Button neighborLocation='both' use='primary' theme='success'>
          Middle
        </Button>
        <Button neighborLocation='left' use='primary' theme='success'>
          Last
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
