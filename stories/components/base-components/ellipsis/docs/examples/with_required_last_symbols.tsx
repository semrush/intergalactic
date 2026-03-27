import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <Text
      ellipsis:cropPosition='middle'
      ellipsis:lastRequiredSymbols={5}
      size={300}
      w='300px'
    >
      {text}
    </Text>
  );
};

export default Demo;
