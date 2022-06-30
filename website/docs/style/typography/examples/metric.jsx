import React from 'react';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

export default () => (
  <div>
    <Text size={600} tag="strong" mb={4} mt={0}>
      Metric 32px / --fs-600,--lh-600 / 2em
    </Text>
    <Box block h={8} />
    <Text size={500} tag="strong" mb={3} mt={0}>
      Metric 24px / --fs-500,--lh-500 / 1.5em
    </Text>
    <Box block h={8} />
    <Text size={400} tag="strong" mb={2} mt={0}>
      Metric 20px / --fs-400,--lh-400 / 1.25em
    </Text>
    <Box block h={8} />
    <Text size={300} tag="strong" mb={1} mt={0}>
      Metric 16px / --fs-300,--lh-300 / 1em
    </Text>
    <Box block h={8} />
    <Text size={200} tag="strong" mb={1} mt={0}>
      Metric 14px / --fs-200,--lh-200 / 0.875em
    </Text>
  </div>
);
