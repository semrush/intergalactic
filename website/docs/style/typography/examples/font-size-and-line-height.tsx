import React from 'react';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <div>
    <Text size={100} tag='p'>
      12px / --fs-100,--lh-100
    </Text>
    <Text size={200} tag='p'>
      14px / --fs-200,--lh-200
    </Text>
    <Text size={300} tag='p'>
      16px / --fs-300,--lh-300
    </Text>
    <Text size={400} tag='p'>
      20px / --fs-400,--lh-400
    </Text>
    <Text size={500} tag='p'>
      24px / --fs-500,--lh-500
    </Text>
    <Text size={600} tag='p'>
      32px / --fs-600,--lh-600
    </Text>
    <Text size={700} tag='p'>
      36px / --fs-700,--lh-700
    </Text>
    <Text size={800} tag='p'>
      48px / --fs-800,--lh-800
    </Text>
  </div>
);

export default Demo;
