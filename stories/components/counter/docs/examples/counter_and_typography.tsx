import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <Text size={300}>
      Cats
      {' '}
      <Text color='text-secondary'>12,457</Text>
    </Text>
    <br />
    <Text size={300}>
      Dogs:
      {' '}
      <Text color='text-secondary'>149</Text>
    </Text>
  </>
);

export default Demo;
