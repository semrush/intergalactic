import React from 'react';
import { Text } from '@semcore/typography';

export default () => (
  <div>
    <Text size={300} tag="p" mb={4} mt={0}>
      Paragraph 16px / --fs-300,--lh-300 / 1em
    </Text>
    <Text size={200} tag="p" mb={3} mt={0}>
      Paragraph 14px / --fs-200,--lh-200 / 0.875em
    </Text>
    <Text size={100} tag="p" mb={2} mt={0}>
      Paragraph 12px / --fs-100,--lh-100 / 0.75em
    </Text>
  </div>
);
