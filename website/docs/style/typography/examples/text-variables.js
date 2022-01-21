import React from 'react';
import { Text } from '@semcore/typography';

export default () => (
  <div>
    <Text size={800} tag="h1" mb={6} mt={0}>
      48px / --fs800,--lh800 / 3em
    </Text>
    <Text size={700} tag="h2" mb={4} mt={0}>
      36px / --fs700,--lh700 / 2.25em
    </Text>
    <Text size={600} tag="h3" mb={4} mt={0}>
      32px / --fs600,--lh600 / 2em
    </Text>
    <Text size={500} tag="h4" mb={3} mt={0}>
      24px / --fs500,--lh500 / 1.5em
    </Text>
    <Text size={400} tag="h5" mb={2} mt={0}>
      20px / --fs400,--lh400 / 1.25em
    </Text>
    <Text size={300} tag="h6" mb={1} mt={0}>
      16px / --fs300,--lh300 / 1em
    </Text>
    <Text size={200} tag="h6" mb={1} mt={0}>
      14px / --fs200,--lh200 / 0.875em
    </Text>
    <Text size={100} tag="h6" mb={1} mt={0}>
      12px / --fs100,--lh100 / 0.75em
    </Text>
  </div>
);
