import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { RadioFH, BadgeFH } from '@semcore/ui/feature-highlight';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import type { NSRadio } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type RadioFHAdvancedProps = NSRadio.Props & {
  firstOptionText?: string;
  secondOptionText?: string;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  showIcon?: boolean;
  size?: 'm' | 'l';
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  defaultValue?: number;
  legendText?: string;
  legendSize?: 200 | 300;
};

const Demo = (props: RadioFHAdvancedProps) => {
  const {
    firstOptionText = 'First option',
    secondOptionText = 'Second option',
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    showIcon = true,
    size = 'm',
    disabled = false,
    state = undefined,
    defaultValue = 1,
    legendText = 'Highlighted radio button',
    legendSize = 200,
  } = props;

  return (
    <Flex direction='column' gap={6}>
      <RadioGroup
        name='radio'
        aria-labelledby='radioGroup'
        defaultValue={defaultValue}
        size={size}
        disabled={disabled}
      >
        <Text id='radioGroup' size={legendSize} mb={2}>
          {legendText}
        </Text>
        <Flex gap={3} direction='column' alignItems='start'>
          <RadioFH value={1} state={state}>
            <RadioFH.Value>
              <Radio.Value.Control aria-describedby='radio-aria-desc' />
              <Radio.Value.RadioMark />
            </RadioFH.Value>
            <RadioFH.AnimatedSparkles count={animatedSparkleCount} />
            <RadioFH.Text>
              {firstOptionText}
              {showIcon && (
                <Box
                  tag={SummaryAI}
                  color='--intergalactic-icon-primary-feature-highlight'
                  ml={2}
                  style={{ verticalAlign: -3 }}
                />
              )}
              {showBadge && <BadgeFH ml={2}>{badgeText}</BadgeFH>}
            </RadioFH.Text>
          </RadioFH>
          <ScreenReaderOnly id='radio-aria-desc'>Powered by AI</ScreenReaderOnly>
          <Radio value={2} label={secondOptionText} state={state} />
        </Flex>
      </RadioGroup>
    </Flex>
  );
};

export const defaultProps: RadioFHAdvancedProps = {
  firstOptionText: 'First option',
  secondOptionText: 'Second option',
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  showIcon: true,
  size: 'm',
  disabled: false,
  state: undefined,
  defaultValue: 1,
  legendText: 'Highlighted radio button',
  legendSize: 200,
};

Demo.defaultProps = defaultProps;

export default Demo;
