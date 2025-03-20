import React from 'react';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Flex gap={6} >
    <Box w="50%">
      <Text size={800} tag="h1" mb={6} mt={0}>
        H1, 48px, --fs-800
      </Text>
      <Text size={300} tag="p" mb={2} mt={0}>
        Paragraph example.
      </Text>
      <Text size={700} tag="h2" mb={4} mt={10}>
        H2, 36px, --fs-700
      </Text>
      <Text tag="p" mb={2} mt={0}>
        Paragraph example.
      </Text>
      <Text size={600} tag="h3" fontWeight={500} mb={4} mt={10}>
        H3, 32px, --fs-600
      </Text>
      <Text tag="p" mb={2} mt={0}>
        Paragraph example.
      </Text>
      <Text size={500} tag="h4" fontWeight={500} mb={3} mt={10}>
        H4, 24px, --fs-500
      </Text>
      <Text tag="p" mb={2} mt={0}>
        Paragraph example.
      </Text>
    </Box>

    <Box w="50%">
      <Text size={400} tag="h5" fontWeight={500} mb={2} mt={10}>
        H5, 20px, --fs-400
      </Text>
      <Text tag="p" mb={2} mt={0}>
        Paragraph example.
      </Text>
      <Text size={300} tag="h6" mb={1} mt={10}>
        H6, 16px, --fs-300
      </Text>
      <Text size={200} tag="p" mb={3} mt={0}>
        Paragraph, 14px, --fs-200
      </Text>
      <Text tag="p" mb={2} mt={10}>
        Paragraph example, 16px, --fs-300
      </Text>
      <Text size={200} tag="p" mb={3} mt={0}>
        Paragraph, 14px, --fs-200
      </Text>
      <Text size={100} tag="p" mb={2} mt={0}>
        Paragraph, 12px, --fs-200
      </Text>
    </Box>
  </Flex>
);

export default Demo;
