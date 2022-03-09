import React from 'react';
import { Text } from '@semcore/typography';

export default () => (
  <>
    <Text size={600} fontWeight={500} tag="h4">
      Heading <Text color="gray60">12,457</Text>
    </Text>
    <br />
    <Text size={400}>
      Widget heading <Text color="gray60">149</Text>
    </Text>
  </>
);
