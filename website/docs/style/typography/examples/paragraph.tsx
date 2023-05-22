import React from 'react';
import { Text } from '@semcore/ui/typography';

export default () => (
  <div>
    <Text size={300} tag="p" mb={4} mt={0}>
      Paragraph 16px / 1em / --fs-300,--lh-300
    </Text>
    <Text size={200} tag="p" mb={3} mt={0}>
      Paragraph 14px / 0.875em / --fs-200,--lh-200
    </Text>
    <Text size={100} tag="p" mb={2} mt={0}>
      Paragraph 12px / 0.75em / --fs-100,--lh-100
    </Text>
  </div>
);
