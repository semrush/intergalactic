import React from 'react';
import Feedback from 'intergalactic/illustration/Feedback';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={5}>
      <Feedback width={100} height={100} />
      <Feedback width={100} height={100} color='#ff7ad1' />
      <Feedback width={100} height={100} color='green-200' />
    </Flex>
  );
};

export default Demo;
