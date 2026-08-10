import { ScrollArea, Box, Flex } from '@semcore/ui/base-components';
import type { NSScrollArea } from '@semcore/ui/base-components';
import React from 'react';

export type ScrollAreaExampleProps = NSScrollArea.Props & {
  shadow?: boolean;
  orientation?: 'horizontal' | 'vertical';
  topOffset?: number;
  bottomOffset?: number;
  leftOffset?: number;
  rightOffset?: number;
  shadowSize?: number;
  itemsCount: number;
  shadowTheme?: 'dark' | 'light';
};

export const defaultProps: ScrollAreaExampleProps = {
  shadow: true,
  orientation: 'vertical',
  topOffset: 100,
  bottomOffset: 100,
  leftOffset: 100,
  rightOffset: 100,
  shadowSize: 10,
  itemsCount: 1,
  shadowTheme: 'dark',
  focusRingTopOffset: '40px',
  focusRingRightOffset: '40px',
  focusRingBottomOffset: '40px',
  focusRingLeftOffset: '40px',
};

const ScrollAreaDemo = ({
  shadow = true,
  orientation,
  topOffset = 100,
  bottomOffset = 100,
  leftOffset = 100,
  rightOffset = 100,
  shadowSize,
  itemsCount = 1,
  shadowTheme,
  focusRingTopOffset,
  focusRingRightOffset,
  focusRingBottomOffset,
  focusRingLeftOffset,
  ...rest
}: ScrollAreaExampleProps) => {
  return (
    <Flex p={4} bg='#F5F6FA' hMin={360}>
      <ScrollArea
        w={300}
        h={300}
        shadow={shadow}
        tabIndex={0}
        orientation={orientation}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
        leftOffset={leftOffset}
        rightOffset={rightOffset}
        shadowSize={shadowSize}
        shadowTheme={shadowTheme}
        {...rest}
      >
        <ScrollArea.Container
          role='group'
          aria-label='scroll-area-demo'
          focusRingTopOffset={focusRingTopOffset}
          focusRingRightOffset={focusRingRightOffset}
          focusRingBottomOffset={focusRingBottomOffset}
          focusRingLeftOffset={focusRingLeftOffset}
        >
          {Array.from({ length: itemsCount }).map((_, index) => (
            <Box
              key={index}
              inline
              m={2}
              w={600}
              h={500}
              style={{ backgroundColor: '#4D96FF' }}
            />
          ))}
        </ScrollArea.Container>

        <ScrollArea.Bar
          orientation={orientation}
          w={orientation === 'vertical' ? '40px' : undefined}
        >
          <ScrollArea.Bar.Slider />
        </ScrollArea.Bar>
      </ScrollArea>
    </Flex>
  );
};

ScrollAreaDemo.defaultProps = defaultProps;
export default ScrollAreaDemo;
