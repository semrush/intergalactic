import { Box, Flex } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import SpinContainer from '@semcore/ui/spin-container';
import type { NSSpinContainer } from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSSpinContainer.Props & {
  style?: any;
  /** Demo-only knob: render SpinContainer.Content / SpinContainer.Overlay explicitly */
  advancedMode?: boolean;
  /** Demo-only knob: text rendered inside SpinContainer.Overlay instead of the spinner */
  overlayText?: string;
};

const Demo = (props: ExampleProps) => {
  const { loading, size, theme, background, duration, advancedMode, overlayText, w, h, m, p } =
    props;

  // Box props are left out entirely when not set, so the component keeps its own defaults.
  const containerProps = {
    loading,
    size,
    theme,
    duration,
    ...(background !== undefined && { background }),
    ...(w !== undefined && { w }),
    ...(h !== undefined && { h }),
    ...(m !== undefined && { m }),
    ...(p !== undefined && { p }),
  };

  return (
    <Flex direction='column' gap={6} p={4} style={props.style} data-testid='spin-container-demo'>
      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          over static content
        </Text>
        <Flex data-testid='spin-container-static'>
          <SpinContainer {...containerProps}>
            {advancedMode
              ? (
                  <>
                    <SpinContainer.Content>
                      <Box w={200} h={200}>
                        <Text size={200}>Hello world</Text>
                      </Box>
                    </SpinContainer.Content>
                    <SpinContainer.Overlay>
                      {overlayText ? <Text size={200}>{overlayText}</Text> : undefined}
                    </SpinContainer.Overlay>
                  </>
                )
              : (
                  <Box w={200} h={200}>
                    <Text size={200}>Hello world</Text>
                  </Box>
                )}
          </SpinContainer>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          over interactive content (must become inert while loading)
        </Text>
        <Flex data-testid='spin-container-interactive'>
          <SpinContainer {...containerProps}>
            <Flex direction='column' gap={2} w={150}>
              <Text htmlFor='spin-container-input' size={200} tag='label'>
                Input
              </Text>
              <Input>
                <Input.Value id='spin-container-input' />
              </Input>
            </Flex>
          </SpinContainer>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2}>
        <Text color='text-secondary' size={100}>
          on inverted background (use theme='invert' here)
        </Text>
        <Box
          p={4}
          data-testid='spin-container-invert-bg'
          style={{
            background: 'var(--intergalactic-bg-primary-invert)',
            borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            width: 'fit-content',
          }}
        >
          <SpinContainer {...containerProps}>
            <Box w={200} h={200}>
              <Text size={200} color='text-primary-invert'>
                Hello world
              </Text>
            </Box>
          </SpinContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export const defaultSpinContainerProps: ExampleProps = {
  loading: true,
  size: 'xxl',
  theme: 'default',
  duration: 200,
  advancedMode: false,
  overlayText: '',
};

Demo.defaultProps = defaultSpinContainerProps;
export default Demo;
