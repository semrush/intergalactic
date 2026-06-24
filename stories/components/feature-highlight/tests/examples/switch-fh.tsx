import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { SwitchFH, BadgeFH } from '@semcore/ui/feature-highlight';
import type { NSSwitch } from '@semcore/ui/switch';
import React from 'react';

export type SwitchFHAdvancedProps = NSSwitch.Props & {
  label?: string;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  showIcon?: boolean;
  checked?: boolean;
  disabled?: boolean;
  size?: 'm' | 'l' | 'xl';
};

const Demo = (props: SwitchFHAdvancedProps) => {
  const {
    label = 'Switch label',
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    showIcon = true,
    checked = undefined,
    disabled = false,
    size = 'm',
  } = props;

  return (
    <Flex direction='column' gap={4} alignItems='start'>
      <SwitchFH size={size} disabled={disabled}>
        <SwitchFH.Value
          aria-describedby='switch-aria-desc'
          checked={checked}
          ml={0}
        />
        <SwitchFH.AnimatedSparkles count={animatedSparkleCount} />
        <SwitchFH.Addon>
          {label}
          {showIcon && (
            <Box
              tag={SummaryAI}
              color='--intergalactic-icon-primary-feature-highlight'
              ml={2}
              style={{ verticalAlign: -3 }}
            />
          )}
          {showBadge && <BadgeFH ml={2}>{badgeText}</BadgeFH>}
        </SwitchFH.Addon>
      </SwitchFH>
      <ScreenReaderOnly id='switch-aria-desc'>Powered by AI</ScreenReaderOnly>
    </Flex>
  );
};

export const defaultProps: SwitchFHAdvancedProps = {
  label: 'Switch label',
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  showIcon: true,
  checked: undefined,
  disabled: false,
  size: 'm',
};

Demo.defaultProps = defaultProps;

export default Demo;
