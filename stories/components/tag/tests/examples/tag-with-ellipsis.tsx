import { Box, Flex } from '@semcore/ui/base-components';
import Tag from '@semcore/ui/tag';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={4}>
      <Box>
        <h3>Tag.Text with ellipsis (boolean)</h3>
        <Tag w={120} size='m'>
          <Tag.Text ellipsis>Long tag text that should be truncated</Tag.Text>
        </Tag>
      </Box>

      <Box>
        <h3>Tag.Text with ellipsis middle crop</h3>
        <Tag w={120} size='m'>
          <Tag.Text ellipsis={{ cropPosition: 'middle' }}>
            Long tag text that should be truncated
          </Tag.Text>
        </Tag>
      </Box>

      <Box>
        <h3>Tag.Text without ellipsis (default)</h3>
        <Tag w={120} size='m'>
          <Tag.Text>Long tag text that should be truncated</Tag.Text>
        </Tag>
      </Box>

      <Box>
        <h3>Different sizes with ellipsis</h3>
        <Flex gap={2} alignItems='center'>
          <Tag w={100} size='m'>
            <Tag.Text ellipsis>Very long tag text</Tag.Text>
          </Tag>
          <Tag w={100} size='l'>
            <Tag.Text ellipsis>Very long tag text</Tag.Text>
          </Tag>
          <Tag w={100} size='xl'>
            <Tag.Text ellipsis>Very long tag text</Tag.Text>
          </Tag>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
