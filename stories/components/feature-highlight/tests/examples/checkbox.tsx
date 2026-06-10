import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import type { NSCheckbox } from '@semcore/ui/checkbox';
import { CheckboxFH, BadgeFH } from '@semcore/ui/feature-highlight';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

export type CheckboxFHAdvancedProps = NSCheckbox.Props & {
  firstOptionText?: string;
  secondOptionText?: string;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  showIcon?: boolean;
  size?: 'm' | 'l';
  checked?: boolean;
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  legendText?: string;
  legendSize?: 200 | 300;
};

const Demo = (props: CheckboxFHAdvancedProps) => {
  const {
    firstOptionText = 'First option',
    secondOptionText = 'Second option',
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    showIcon = true,
    size = 'm',
    checked = undefined,
    disabled = false,
    state = undefined,
    legendText = 'List with a highlighted checkbox',
    legendSize = 200,
  } = props;

  return (
    <Flex direction='column' gap={6}>
      <fieldset style={{ border: 'none' }}>
        <Text tag='legend' size={legendSize} mb={3}>
          {legendText}
        </Text>
        <List marker='' m={0} p={0}>
          <List.Item p={0} mb={2}>
            <CheckboxFH
              aria-describedby='checkbox-aria-desc'
              size={size}
              state={state}
              checked={checked}
              disabled={disabled}
            >
              <CheckboxFH.Value />
              <CheckboxFH.AnimatedSparkles count={animatedSparkleCount} />
              <CheckboxFH.Text>
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
              </CheckboxFH.Text>
            </CheckboxFH>
            <ScreenReaderOnly id='checkbox-aria-desc'>Powered by AI</ScreenReaderOnly>
          </List.Item>
          <List.Item p={0}>
            <Checkbox
              label={secondOptionText}
              size={size}
              state={state}
              checked={checked}
              disabled={disabled}
            />
          </List.Item>
        </List>
      </fieldset>
    </Flex>
  );
};

export const defaultProps: CheckboxFHAdvancedProps = {
  firstOptionText: 'First option',
  secondOptionText: 'Second option',
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  showIcon: true,
  size: 'm',
  checked: undefined,
  disabled: false,
  state: undefined,
  legendText: 'List with a highlighted checkbox',
  legendSize: 200,
};

Demo.defaultProps = defaultProps;

export default Demo;
