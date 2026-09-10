import { Box, Flex } from '@semcore/ui/base-components';
import ProgressBar from '@semcore/ui/progress-bar';
import type { NSProgressBar } from '@semcore/ui/progress-bar';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ProgressBarExampleProps = NSProgressBar.Props & {
  valueTheme?: string;
};

const BACKGROUNDS = [
  { bg: 'bg-primary-neutral', textColor: 'text-primary', label: 'Light background' },
  { bg: 'bg-primary-invert', textColor: 'text-primary-invert', label: 'Dark background' },
] as const;

const Demo = (props: ProgressBarExampleProps) => {
  const { theme, size, value, duration, valueTheme } = props;
  const valueProps = valueTheme ? { theme: valueTheme } : {};

  return (
    <Flex direction='column' gap={6} w='100%'>
      {BACKGROUNDS.map((background) => (
        <Box key={background.bg} bg={background.bg} p={5}>
          <Flex direction='column' gap={4} w='100%'>
            <Text size={200} color={background.textColor}>
              {background.label}
              {' '}
              — theme=
              {String(theme)}
              , size=
              {String(size)}
              {valueTheme ? `, value theme=${valueTheme}` : ''}
            </Text>

            <Flex direction='column' gap={2} w='100%'>
              <Text size={100} color={background.textColor}>
                controlled value: {String(value)}
              </Text>
              <ProgressBar
                tabIndex={0}
                theme={theme}
                size={size}
                value={value}
                duration={duration}
                aria-label={`Progress ${value}% on ${background.label}`}
              >
                <ProgressBar.Value {...valueProps} />
              </ProgressBar>
            </Flex>

            <Flex direction='column' gap={2} w='100%'>
              <Text size={100} color={background.textColor}>
                value=0
              </Text>
              <ProgressBar
                theme={theme}
                size={size}
                value={0}
                duration={duration}
                aria-label={`Progress 0% on ${background.label}`}
              />
            </Flex>

            <Flex direction='column' gap={2} w='100%'>
              <Text size={100} color={background.textColor}>
                value=100
              </Text>
              <ProgressBar
                theme={theme}
                size={size}
                value={100}
                duration={duration}
                aria-label={`Progress 100% on ${background.label}`}
              >
                <ProgressBar.Value {...valueProps} />
              </ProgressBar>
            </Flex>

            <Flex direction='column' gap={2} w='100%'>
              <Text size={100} color={background.textColor}>
                no value prop
              </Text>
              {/* `value` is intentionally not passed: the animated pattern renders only when value === undefined */}
              <ProgressBar
                theme={theme}
                size={size}
                duration={duration}
                aria-label={`Indeterminate progress on ${background.label}`}
              />
            </Flex>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export const defaultProps: ProgressBarExampleProps = {
  theme: 'default',
  size: 'm',
  value: 60,
  duration: 1000,
};

Demo.defaultProps = defaultProps;

export default Demo;
