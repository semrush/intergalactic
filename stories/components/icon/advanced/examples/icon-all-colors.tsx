import MathPlusM from '@semcore/icon/MathPlus/m';
import Warning from '@semcore/icon/Warning/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const INTERGALACTIC_ICON_PRIMARY_VARS = [
  '--intergalactic-icon-primary-neutral',
  '--intergalactic-icon-primary-neutral-hover-active',
  '--intergalactic-icon-primary-info',
  '--intergalactic-icon-primary-info-hover-active',
  '--intergalactic-icon-primary-success',
  '--intergalactic-icon-primary-success-hover-active',
  '--intergalactic-icon-primary-critical',
  '--intergalactic-icon-primary-critical-hover-active',
  '--intergalactic-icon-primary-warning',
  '--intergalactic-icon-primary-warning-hover-active',
  '--intergalactic-icon-primary-invert',
  '--intergalactic-icon-primary-invert-hover-active',
] as const;

const INTERGALACTIC_ICON_SECONDARY_VARS = [
  '--intergalactic-icon-secondary-neutral',
  '--intergalactic-icon-secondary-neutral-hover-active',
  '--intergalactic-icon-secondary-info',
  '--intergalactic-icon-secondary-info-hover-active',
  '--intergalactic-icon-secondary-success',
  '--intergalactic-icon-secondary-success-hover-active',
  '--intergalactic-icon-secondary-critical',
  '--intergalactic-icon-secondary-critical-hover-active',
  '--intergalactic-icon-secondary-warning',
  '--intergalactic-icon-secondary-warning-hover-active',
  '--intergalactic-icon-non-interactive',
] as const;

function IconThemeSwatch({ token }: { token: string }) {
  const invert = token.includes('icon-primary-invert');
  return (
    <Flex direction='column' gap={1} alignItems='center' style={{ minWidth: 72, display: 'inline-flex' }}>
      <Box
        p={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 'var(--intergalactic-rounded-medium, 6px)',
          background: invert ? 'var(--gray-800)' : 'var(--intergalactic-bg-primary-neutral)',
          color: `var(${token})`,
        }}
        title={token}
      >
        <MathPlusM />
      </Box>
      <Text
        size={100}
        color='text-secondary'
        style={{
          maxWidth: 120,
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2,
        }}
      >
        {token.replace(/^--intergalactic-/, '')}
      </Text>
    </Flex>
  );
}

const Demo = () => (
  <Flex direction='column' gap={6} mb={10} w='100%'>
    <Flex gap={6} alignItems='center' flexWrap>
      <Flex gap={2} alignItems='center'>
        <Warning color='--intergalactic-icon-primary-critical' aria-label='icon-primary-critical' />
        <Text color='text-critical' size={200} tag='span'>
          icon-primary-critical
        </Text>
      </Flex>
      <Flex gap={2} alignItems='center'>
        <Warning color='--intergalactic-icon-primary-warning' aria-label='icon-primary-warning' />
        <Text color='orange-300' size={200} tag='span'>
          icon-primary-warning
        </Text>
      </Flex>
    </Flex>
    <Flex gap={4} flexWrap alignItems='flex-start'>
      {INTERGALACTIC_ICON_PRIMARY_VARS.map((token) => (
        <IconThemeSwatch key={token} token={token} />
      ))}
    </Flex>
    <Flex gap={4} flexWrap alignItems='flex-start'>
      {INTERGALACTIC_ICON_SECONDARY_VARS.map((token) => (
        <IconThemeSwatch key={token} token={token} />
      ))}
    </Flex>
  </Flex>
);

export default Demo;
