import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <>
    <Text size={300}>
      Lorem ipsum
      {' '}
      <Text color='text-secondary'>12,457</Text>
    </Text>
    <br />
    <Text size={300}>
      Dolor sit amet:
      {' '}
      <Text color='text-secondary'>149</Text>
    </Text>
  </>
);

export default Demo;
