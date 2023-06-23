import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

let randomIndex = 1;
const stableRandom = () =>
  Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

class Demo extends React.PureComponent {
  handleMainScroll = (e) => {
    this.controlled.scrollTop = e.currentTarget.scrollTop;
  };

  componentDidMount() {
    this.controlled.scrollTop = 0;
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h2>Main</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container onScroll={this.handleMainScroll}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h2>Controlled</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              ref={(node) => {
                this.controlled = node;
              }}
            >
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
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
