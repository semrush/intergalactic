import { Box, Flex } from '@semcore/ui/base-components';
import Spin from '@semcore/ui/spin';
import type { NSSpin } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSSpin.Props & { style?: any };

const Demo = (props: ExampleProps) => {
  const { size, theme, centered, locale, w, h, m, p } = props;

  // Box props are left out entirely when not set, so the component keeps its own defaults.
  const spinProps = {
    size,
    theme,
    centered,
    locale,
    ...(w !== undefined && { w }),
    ...(h !== undefined && { h }),
    ...(m !== undefined && { m }),
    ...(p !== undefined && { p }),
  };

  return (
    <Flex direction='column' gap={6} p={4} style={props.style} data-testid='spin-demo'>
      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          on default background
        </Text>
        <Flex alignItems='center' data-testid='spin-default-bg'>
          <Spin {...spinProps} />
        </Flex>
      </Flex>

      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          on inverted background (use theme='invert' here)
        </Text>
        <Box
          p={4}
          data-testid='spin-invert-bg'
          style={{
            background: 'var(--intergalactic-bg-primary-invert)',
            borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            width: 'fit-content',
          }}
        >
          <Spin {...spinProps} />
        </Box>
      </Flex>

      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          inside a 200x200 flex parent (use centered here)
        </Text>
        <Flex
          w={200}
          h={200}
          data-testid='spin-centered-parent'
          style={{ border: '1px dashed var(--intergalactic-border-primary)' }}
        >
          <Spin {...spinProps} />
        </Flex>
      </Flex>

      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          with children
        </Text>
        <Flex alignItems='center' gap={2} data-testid='spin-with-children'>
          <Spin {...spinProps}>
            <title>Custom title node</title>
          </Spin>
          <Text size={200}>Loading…</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultSpinProps: ExampleProps = {
  size: 'm',
  theme: 'default',
  centered: false,
  locale: 'en',
};

Demo.defaultProps = defaultSpinProps;
export default Demo;
