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
  handleScrollMain = (e) => {
    this.mirror.scrollTop =
      this.mirror.scrollHeight - this.mirror.clientHeight - e.currentTarget.scrollTop;
  };

  componentDidMount() {
    this.mirror.scrollTop = this.mirror.scrollHeight - this.mirror.clientHeight;
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h2>Main</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container onScroll={this.handleScrollMain}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h2>Reversed mirror</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              ref={(node) => {
                this.mirror = node;
              }}
            >
              <Flex flexWrap reverse>
                {[...new Array(100)].map((_, index) => (
                  <Block ind={index} key={index} />
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

export default Demo;
