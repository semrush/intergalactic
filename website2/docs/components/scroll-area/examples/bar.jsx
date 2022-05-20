import React, { useRef } from 'react';
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

function Demo() {
  const containerRef = useRef();
  return (
    <Flex>
      <Box style={{ position: 'relative' }}>
        <ScrollArea w={600} hMax={400} shadow>
          <ScrollArea.Container ref={containerRef}>
            <Box w={1200}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </Box>
          </ScrollArea.Container>
          <ScrollArea.Bar orientation="vertical" />
        </ScrollArea>
        <br />
        <br />
        <br />
        <br />
        <br />
        <ScrollArea.Bar
          container={containerRef}
          orientation="horizontal"
          w={200}
          h={40}
          style={{ background: 'rgba(0,0,0,0.1)' }}
        >
          <ScrollArea.Bar.Slider h={30} />
        </ScrollArea.Bar>
      </Box>
    </Flex>
  );
}

export default Demo;
