import { Flex } from '@semcore/ui/base-components';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Spin w={50} />
      <Spin h={50} />
      <Spin w={50} h={50} m={4} />
      <Spin w={50} h={50} p={4} />
      <Spin w={50} h={50} pb={4} />
    </>
  );
};

export default Demo;
