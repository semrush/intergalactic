import React from 'react';
import { Text } from '@semcore/ui/typography';

export default () => (
  <div>
    <Text size={800} tag="h1" mb={6} mt={0}>
      48px / 3em / --fs-800,--lh-800
    </Text>
    <Text size={700} tag="h2" mb={4} mt={0}>
      36px / 2.25em / --fs-700,--lh-700
    </Text>
    <Text size={600} tag="h3" mb={4} mt={0}>
      32px / 2em / --fs-600,--lh-600
    </Text>
    <Text size={500} tag="h4" mb={3} mt={0}>
      24px / 1.5em / --fs-500,--lh-500
    </Text>
    <Text size={400} tag="h5" mb={2} mt={0}>
      20px / 1.25em / --fs-400,--lh-400
    </Text>
    <Text size={300} tag="h6" mb={1} mt={0}>
      16px / 1em / --fs-300,--lh-300
    </Text>
    <Text size={200} tag="p" mb={1} mt={0}>
      14px / 0.875em / --fs-200,--lh-200
    </Text>
    <Text size={100} tag="p" mb={1} mt={0}>
      12px / 0.75em / --fs-100,--lh-100
    </Text>
  </div>
);
