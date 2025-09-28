import Divider from '@semcore/ui/divider';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

const Demo = () => {
  return (

    <Flex w={200} direction='column' style={{ background: '#979797' }}>
      <Divider use='primary' mb={2} mt={2} h={5} />
      <Divider use='secondary' mb={2} h={10} w={100} />
    </Flex>
  );
};

export default Demo;
