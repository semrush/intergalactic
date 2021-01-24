import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
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
  handleScrollMaster = (e) => {
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
          <h2>Master</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container onScroll={this.handleScrollMaster}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h2>Reverse mirror</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container ref={(node) => (this.mirror = node)}>
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
