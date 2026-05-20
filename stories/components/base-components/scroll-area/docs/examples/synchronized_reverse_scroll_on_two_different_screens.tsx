import { Box, Flex, ScrollArea } from '@semcore/ui/base-components';
import React from 'react';

const CHART_PALETTE_ORDER_COUNT = 24;

const chartPaletteBackground = (index: number) =>
  `var(--intergalactic-chart-palette-order-${(index % CHART_PALETTE_ORDER_COUNT) + 1})`;

class Demo extends React.PureComponent {
  mirror: HTMLDivElement | null = null;
  handleScrollMain = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.mirror) {
      this.mirror.scrollTop =
        this.mirror.scrollHeight - this.mirror.clientHeight - e.currentTarget.scrollTop;
    }
  };

  componentDidMount() {
    if (this.mirror) {
      this.mirror.scrollTop = this.mirror.scrollHeight - this.mirror.clientHeight;
    }
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h3 id='main-reverse-title'>Main ScrollArea</h3>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              role='group'
              aria-labelledby='main-reverse-title'
              onScroll={this.handleScrollMain}
            >
              {[...new Array(100)].map((_, index) => (
                <Box
                  key={index}
                  inline
                  m={2}
                  w={120}
                  h={120}
                  style={{ backgroundColor: chartPaletteBackground(index), borderRadius: 'var(--intergalactic-surface-rounded)' }}
                />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h3 id='control-reverse-title'>Reversed ScrollArea</h3>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              role='group'
              aria-labelledby='control-reverse-title'
              ref={(node: HTMLDivElement | null) => {
                this.mirror = node;
              }}
            >
              <Flex flexWrap reverse>
                {[...new Array(100)].map((_, index) => (
                  <Box
                    key={index}
                    inline
                    m={2}
                    w={120}
                    h={120}
                    style={{ backgroundColor: chartPaletteBackground(index), borderRadius: 'var(--intergalactic-surface-rounded)' }}
                  />
                ))}
              </Flex>
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>
      </Flex>
    );
  }
}

export default () => <Demo />;
