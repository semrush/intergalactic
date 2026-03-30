import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <Text
      w={180}
      ellipsis:cropPosition='end'
      ellipsis:maxLine={2}
    >
      {text}
    </Text>
  );
};

export default Demo;
