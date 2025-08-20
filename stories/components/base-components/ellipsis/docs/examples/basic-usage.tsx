import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Text
      w={200}
      size={300}
      display='inline-block'
      ellipsis={{ trim: 'middle' }}
    >
      Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.
    </Text>

  );
};

export default Demo;
