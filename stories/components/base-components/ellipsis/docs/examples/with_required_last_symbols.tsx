import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <>
      <Text
        ellipsis={{
          cropPosition: 'middle',
          lastRequiredSymbols: 5,
        }}
        w='300px'
      >
        {text}
      </Text>
      <br />
      <br />
      <Text
        ellipsis={{
          cropPosition: 'middle',
          lastRequiredSymbols: 29,
        }}
        w='300px'
      >
        {text}
      </Text>
    </>
  );
};

export default Demo;
