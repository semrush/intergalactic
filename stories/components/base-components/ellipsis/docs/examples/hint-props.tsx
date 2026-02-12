import type { SimpleHintPopperProps } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const hintProps: Partial<Omit<SimpleHintPopperProps, 'children'>> = {
  placement: 'bottom',
};

const Demo = () => {
  return (
    <Text w={180} ellipsis hintProps={hintProps}>
      {text}
    </Text>
  );
};

export default Demo;
