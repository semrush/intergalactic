import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';

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

const Demo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <Flex>
      <Box style={{ position: 'relative' }}>
        <ScrollArea w={600} hMax={400} shadow>
          <ScrollArea.Container ref={containerRef} id='custom-container-id'>
            <Box w={1200}>
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
            </Box>
          </ScrollArea.Container>
          <ScrollArea.Bar orientation='vertical' aria-controls='custom-container-id' />
        </ScrollArea>
        <br />
        <br />
        <br />
        <br />
        <br />
        <ScrollArea.Bar
          container={containerRef}
          orientation='horizontal'
          w={200}
          h={40}
          style={{ background: 'rgba(0,0,0,0.1)' }}
          aria-controls='custom-container-id'
        >
          <ScrollArea.Bar.Slider h={30} />
        </ScrollArea.Bar>
      </Box>
    </Flex>
  );
};

export default Demo;
