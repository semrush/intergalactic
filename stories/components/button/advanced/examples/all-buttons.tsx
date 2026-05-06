import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import React from 'react';

type ButtonRowProps = {
  use?: 'primary' | 'secondary' | 'tertiary';
  theme?: 'info' | 'success' | 'danger' | 'brand' | 'muted' | 'invert';
  size?: 'm' | 'l';
};

function ButtonRow({ use = 'secondary', theme = 'info', size = 'm' }: ButtonRowProps) {
  return (
    <Flex gap={2} alignItems='center' flexWrap>
      <Button use={use} theme={theme} size={size}>
        Default
      </Button>
      <Button use={use} theme={theme} size={size} disabled>
        Disabled
      </Button>
      <Button use={use} theme={theme} size={size} loading>
        Loading
      </Button>
    </Flex>
  );
}

type ButtonLinkRowProps = {
  use?: 'primary' | 'secondary';
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
};

function ButtonLinkRow({ use = 'primary', size = 300 }: ButtonLinkRowProps) {
  return (
    <Flex gap={2} alignItems='center' flexWrap>
      <ButtonLink use={use} size={size}>
        Default
      </ButtonLink>
      <ButtonLink use={use} size={size} disabled>
        Disabled
      </ButtonLink>
    </Flex>
  );
}

export default function AllButtons() {
  return (
    <Flex direction='column' gap={8}>
      <Flex gap={8} alignItems='flex-start' flexWrap>
        <Flex direction='column' gap={6}>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='primary' theme='info' />
            <ButtonRow use='primary' theme='success' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='primary' theme='danger' />
            <ButtonRow use='primary' theme='brand' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='tertiary' theme='muted' />
            <ButtonRow use='tertiary' theme='info' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='primary' theme='info' size='l' />
            <ButtonRow use='primary' theme='success' size='l' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='primary' theme='danger' size='l' />
            <ButtonRow use='primary' theme='brand' size='l' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow size='l' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonRow use='tertiary' theme='muted' size='l' />
            <ButtonRow use='tertiary' theme='info' size='l' />
          </Flex>
        </Flex>
        <Box
          p={4}
          style={{
            background: 'var(--intergalactic-bg-primary-invert)',
            borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
          }}
        >
          <Flex direction='column' gap={6}>
            <ButtonRow use='primary' theme='invert' />
            <ButtonRow use='secondary' theme='invert' />
            <ButtonRow use='tertiary' theme='invert' />
            <ButtonRow use='primary' theme='invert' size='l' />
            <ButtonRow use='secondary' theme='invert' size='l' />
            <ButtonRow use='tertiary' theme='invert' size='l' />
          </Flex>
        </Box>
      </Flex>
      <Flex gap={8} alignItems='flex-start' flexWrap>
        <Flex direction='column' gap={6}>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonLinkRow use='primary' />
            <ButtonLinkRow use='secondary' />
          </Flex>
          <Flex gap={8} flexWrap alignItems='center'>
            <ButtonLinkRow use='primary' size={400} />
            <ButtonLinkRow use='secondary' size={400} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
