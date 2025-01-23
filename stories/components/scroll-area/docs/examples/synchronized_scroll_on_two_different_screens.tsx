import React from 'react';
import { Box, Flex } from 'intergalactic/flex-box';
import ScrollArea from 'intergalactic/scroll-area';

let randomIndex = 1;
const stableRandom = () => {
  if (randomIndex > 20) randomIndex = 1;
  return Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
};
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

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
                  style={{ backgroundColor: getRandomColor() }}
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
                  style={{ backgroundColor: getRandomColor() }}
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

export default Demo;
