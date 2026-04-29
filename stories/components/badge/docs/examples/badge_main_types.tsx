import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={8} alignItems='center'>
      <Flex gap={2} alignItems='center'>
        <Badge bg='blue-400' color='text-primary-invert'>
          admin
        </Badge>
        <Badge bg='orange-400' color='text-primary-invert'>
          alpha
        </Badge>
        <Badge bg='red-400' color='text-primary-invert'>
          beta
        </Badge>
        <Badge bg='green-400' color='text-primary-invert'>
          new
        </Badge>
        <Badge bg='gray-400' color='text-primary-invert'>
          soon
        </Badge>
      </Flex>
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
          width: 'fit-content',
        }}
      >
        <Flex gap={2} alignItems='center'>
          <Badge bg='gray-white' color='text-primary'>
            admin
          </Badge>
          <Badge bg='gray-white' color='text-primary'>
            alpha
          </Badge>
          <Badge bg='gray-white' color='text-primary'>
            beta
          </Badge>
          <Badge bg='gray-white' color='text-primary'>
            new
          </Badge>
          <Badge bg='gray-white' color='text-primary'>
            soon
          </Badge>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
