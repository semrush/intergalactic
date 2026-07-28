import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { List, Text } from '@semcore/ui/typography';
import React from 'react';

export function PaywallMessage() {
  return (
    <Box position='relative' w='100%'>
      <Card w='100%' h={240}>
        <Card.Header>
          <Card.Title tag='h3'>Something interesting</Card.Title>
        </Card.Header>
        <Card.Body tag={Flex} direction='column'>
          <Text size={300} my={3} semibold>
            This is a paragraph with fs-300 font size. It's so big that even my neighbor's cat can read it from across the street.
          </Text>
        </Card.Body>
      </Card>

      <Flex
        position='absolute'
        top={0}
        right={0}
        bottom={0}
        left={0}
        m='-16px'
        direction='column'
        alignItems='center'
        py={10}
        aria-label='Paywall message'
        style={{
          backgroundColor: 'var(--intergalactic-overlay-limitation-primary)',
        }}
      >
        <Box
          p={6}
          wMax={400}
          bg='bg-primary-neutral'
          borderRadius='popper-rounded'
          style={{
            boxShadow: 'var(--intergalactic-box-shadow-popper)',
          }}
        >
          <Text size={300} bold mb={2}>
            Unlock competitor and audience insights with Traffic & Market Pro!
          </Text>
          <Flex gap={2} mt={4}>
            <Button size='l' use='primary' theme='success'>
              Get free trial
            </Button>
            <Button size='l' use='secondary'>
              View sample
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
