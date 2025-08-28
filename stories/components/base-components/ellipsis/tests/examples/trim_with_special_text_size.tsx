import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Text
      display='block'
      w={100}

      mb={3}
      size={400}
      tag='p'
      mt={0}
      style={{ outline: '1px solid red' }}
      ellipsis={true}
    >
      WordWord WordWord
    </Text>
  );
};

export default Demo;
