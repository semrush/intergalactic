import React from 'react';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

export default () => (
  <div>
    <Text size={600} tag="strong" mb={4} mt={0}>
      Metric 32px / 2em / --fs-600,--lh-600
    </Text>
    <Box block h={8} />
    <Text size={500} tag="strong" mb={3} mt={0}>
      Metric 24px / 1.5em / --fs-500,--lh-500
    </Text>
    <Box block h={8} />
    <Text size={400} tag="strong" mb={2} mt={0}>
      Metric 20px / 1.25em / --fs-400,--lh-400
    </Text>
    <Box block h={8} />
    <Text size={300} tag="strong" mb={1} mt={0}>
      Metric 16px / 1em / --fs-300,--lh-300
    </Text>
    <Box block h={8} />
    <Text size={200} tag="strong" mb={1} mt={0}>
      Metric 14px / 0.875em / --fs-200,--lh-200
    </Text>
  </div>
);
