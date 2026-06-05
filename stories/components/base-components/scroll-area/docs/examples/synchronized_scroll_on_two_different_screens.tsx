import { Box, Flex, ScrollArea } from '@semcore/ui/base-components';
import React from 'react';

const CHART_PALETTE_ORDER_COUNT = 24;

class Demo extends React.PureComponent {
  controlled: HTMLDivElement | null = null;
  handleMainScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.controlled) {
      this.controlled.scrollTop = e.currentTarget.scrollTop;
    }
  };

  componentDidMount() {
    if (this.controlled) {
      this.controlled.scrollTop = 0;
    }
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h3 id='main-title'>Main ScrollArea</h3>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              role='group'
              aria-labelledby='main-title'
              onScroll={this.handleMainScroll}
            >
              {[...new Array(100)].map((_, index) => (
                <Box
                  key={index}
                  inline
                  m={2}
                  w={120}
                  h={120}
                  borderRadius='surface-rounded'
                  bg={`chart-palette-order-${(index % CHART_PALETTE_ORDER_COUNT) + 1}`}
                />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h3 id='control-title'>Controlled ScrollArea</h3>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              role='group'
              aria-labelledby='control-title'
              ref={(node: HTMLDivElement | null) => {
                this.controlled = node;
              }}
            >
              {[...new Array(100)].map((_, index) => (
                <Box
                  key={index}
                  inline
                  m={2}
                  w={120}
                  h={120}
                  borderRadius='surface-rounded'
                  bg={`chart-palette-order-${(index % CHART_PALETTE_ORDER_COUNT) + 1}`}
                />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>
      </Flex>
    );
  }
}

export default () => <Demo />;
