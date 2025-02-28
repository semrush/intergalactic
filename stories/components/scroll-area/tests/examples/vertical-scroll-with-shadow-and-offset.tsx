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

class Demo extends React.PureComponent {


  render() {
    return (
      <Flex>
          <ScrollArea
            w={300}
            h={300}
            shadow={true}
            tabIndex={0}
            observeParentSize={true}
            topOffset={100}
            bottomOffset={100}
           
           
          >
            <ScrollArea.Container
              role='group'
              focusRingTopOffset="40px"
              focusRingRightOffset="40px"
              focusRingBottomOffset="40px"
              focusRingLeftOffset="40px"
            >
              {[...new Array(1)].map((_, index) => (
                <Box
                  key={index}
                  inline
                  m={2}
                  w={600}
                  h={500}
                  style={{ backgroundColor: getRandomColor() }}
                />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar  w = '40px'>
              <ScrollArea.Bar.Slider />
            </ScrollArea.Bar>
          </ScrollArea>
      </Flex>
    );
  }
}

export default () => <Demo />;
