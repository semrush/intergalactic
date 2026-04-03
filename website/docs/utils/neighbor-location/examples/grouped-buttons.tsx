import Button from '@semcore/button';
import { Flex, NeighborLocation } from '@semcore/ui/base-components';
import React from 'react';

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
