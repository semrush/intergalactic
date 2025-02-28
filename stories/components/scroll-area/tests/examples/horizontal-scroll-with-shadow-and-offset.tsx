import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';

declare const eventCalculate: any; 

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
  containerRef = React.createRef<HTMLDivElement>(); 


  render() {
    return (
      <Flex>
        <div id='main-reverse-title' ref={this.containerRef}>
          Main ScrollArea
          <ScrollArea
            w={300}
            h={300}
            shadow={true}
            container={this.containerRef} 
            tabIndex={0}
            topOffset={100}
            bottomOffset={100}
            leftOffset={100}
            rightOffset={100}
            orientation='horizontal'
          >
            <ScrollArea.Container
              role='group'
              aria-labelledby='main-reverse-title'
            >
              {[...new Array(10)].map((_, index) => (
                <Box
                  key={index}
                  inline
                  m={2}
                  w={600}
                  h={50}
                  style={{ backgroundColor: getRandomColor() }}
                />
              ))}
            </ScrollArea.Container>

            <ScrollArea.Bar orientation='horizontal'>
              <ScrollArea.Bar.Slider />
            </ScrollArea.Bar>
          </ScrollArea>
        </div>
      </Flex>
    );
  }
}

export default () => <Demo />;
