import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { TabLineFH, BadgeFH } from '@semcore/ui/feature-highlight';
import type { TabLineProps } from '@semcore/ui/tab-line';
import React from 'react';

export type TabLineFHAdvancedProps = TabLineProps & {
  firstTabText?: string;
  secondTabText?: string;
  thirdTabText?: string;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  size?: 'm' | 'l';
  disabled?: boolean;
  defaultValue?: number;
  ariaLabel?: string;
};

const Demo = (props: TabLineFHAdvancedProps) => {
  const {
    firstTabText = 'First option',
    secondTabText = 'Second option',
    thirdTabText = 'Third option',
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    size = 'm',
    disabled = false,
    defaultValue = 2,
    ariaLabel = 'Tabs with highlighted item',
  } = props;

  return (
    <Flex direction='column' gap={4}>
      <TabLineFH
        size={size}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
      >
        <TabLineFH.Item value={1} disabled={disabled}>
          {firstTabText}
        </TabLineFH.Item>
        <TabLineFH.HighlightedItem
          value={2}
          disabled={disabled}
          aria-describedby='tab-aria-desc'
        >
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={animatedSparkleCount} />
          <TabLineFH.HighlightedItem.Text>
            {secondTabText}
          </TabLineFH.HighlightedItem.Text>
          {showBadge && (
            <TabLineFH.HighlightedItem.Addon>
              <BadgeFH>{badgeText}</BadgeFH>
            </TabLineFH.HighlightedItem.Addon>
          )}
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3} disabled={disabled}>
          {thirdTabText}
        </TabLineFH.Item>
      </TabLineFH>
      <ScreenReaderOnly id='tab-aria-desc'>Powered by AI</ScreenReaderOnly>
    </Flex>
  );
};

export const defaultProps: TabLineFHAdvancedProps = {
  firstTabText: 'First option',
  secondTabText: 'Second option',
  thirdTabText: 'Third option',
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  size: 'm',
  disabled: false,
  defaultValue: 2,
  ariaLabel: 'Tabs with highlighted item',
};

Demo.defaultProps = defaultProps;

export default Demo;
