import type { TextEllipsisProps } from '@semcore/typography';
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
  ellipsis?: TextEllipsisProps;
  w?: number | string;
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
    ellipsis,
  } = props;

  const firstRef = React.useRef<HTMLDivElement>(null);
  const secondRef = React.useRef<HTMLDivElement>(null);
  const thirdRef = React.useRef<HTMLDivElement>(null);

  return (
    <Flex direction='column' gap={4}>
      <TabLineFH
        size={size}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
      >
        <TabLineFH.Item ref={firstRef} value={1} disabled={disabled} w={props.w}>
          <TabLineFH.Item.Text {...ellipsis} hint:triggerRef={firstRef}>
            {firstTabText}
          </TabLineFH.Item.Text>
        </TabLineFH.Item>
        <TabLineFH.HighlightedItem
          ref={secondRef}
          value={2}
          disabled={disabled}
          aria-describedby='tab-aria-desc'
          w={props.w}
        >
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={animatedSparkleCount} />
          <TabLineFH.HighlightedItem.Text {...ellipsis} hint:triggerRef={secondRef}>
            {secondTabText}
          </TabLineFH.HighlightedItem.Text>
          {showBadge && (
            <TabLineFH.HighlightedItem.Addon>
              <BadgeFH>{badgeText}</BadgeFH>
            </TabLineFH.HighlightedItem.Addon>
          )}
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item ref={thirdRef} value={3} disabled={disabled} w={props.w}>
          <TabLineFH.Item.Text {...ellipsis} hint:triggerRef={thirdRef}>
            {thirdTabText}
          </TabLineFH.Item.Text>
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
  ellipsis: {
    ellipsis: true,
  },
  w: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
