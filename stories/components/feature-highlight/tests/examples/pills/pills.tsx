import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { PillsFH, BadgeFH } from '@semcore/ui/feature-highlight';
import type { NSPills } from '@semcore/ui/pills';
import React from 'react';

export type PillsFHAdvancedProps = NSPills.Props & {
  firstPillText?: string;
  secondPillText?: string;
  thirdPillText?: string;
  highlightedValue?: number;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  size?: 'm' | 'l';
  disabled?: boolean;
  ariaLabel?: string;
};

const Demo = (props: PillsFHAdvancedProps) => {
  const {
    firstPillText = 'One',
    secondPillText = 'Two',
    thirdPillText = 'Three',
    highlightedValue = 2,
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    size = 'm',
    disabled = false,
    ariaLabel = 'Pills with highlighted item',
  } = props;

  return (
    <Flex direction='column' gap={4} alignItems='start'>
      <ScreenReaderOnly id='pills-aria-desc'>Powered by AI</ScreenReaderOnly>

      <PillsFH
        defaultValue={highlightedValue}
        aria-label={ariaLabel}
        size={size}
      >
        <PillsFH.Item value={1} disabled={disabled}>
          {firstPillText}
        </PillsFH.Item>
        <PillsFH.HighlightedItem
          value={2}
          disabled={disabled}
          aria-describedby='pills-aria-desc'
        >
          <PillsFH.HighlightedItem.Addon animatedSparkleCount={animatedSparkleCount} />
          <PillsFH.HighlightedItem.Text>{secondPillText}</PillsFH.HighlightedItem.Text>
          {showBadge && (
            <PillsFH.HighlightedItem.Addon>
              <BadgeFH>{badgeText}</BadgeFH>
            </PillsFH.HighlightedItem.Addon>
          )}
        </PillsFH.HighlightedItem>
        <PillsFH.Item value={3} disabled={disabled}>
          {thirdPillText}
        </PillsFH.Item>
      </PillsFH>
    </Flex>
  );
};

export const defaultProps: PillsFHAdvancedProps = {
  firstPillText: 'One',
  secondPillText: 'Two',
  thirdPillText: 'Three',
  highlightedValue: 2,
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  size: 'm',
  disabled: false,
  ariaLabel: 'Pills with highlighted item',
};

Demo.defaultProps = defaultProps;

export default Demo;
