import React from 'react';
import Feedback from 'intergalactic/illustration/Feedback';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={5}>
      <Feedback width={100} height={100} />
      <Feedback width={100} height={100} color='orange' />
      <Feedback width={100} height={100} color='bg-primary-success' />
    </Flex>
  );
};

export default Demo;
