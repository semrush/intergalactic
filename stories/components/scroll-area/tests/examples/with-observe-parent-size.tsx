import React, { Component, createRef } from 'react';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import Button from '@semcore/button';

interface State {
  width: number;
  height: number;
}

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

class Demo extends Component<{}, State> {
  mirror: HTMLDivElement | null = null;
  state: State = {
    width: 300,
    height: 300,
  };

  handleIncreaseSize = () => {
    this.setState((prev) => ({
      width: prev.width + 50,
      height: prev.height + 50,
    }));
  };

  handleDecreaseSize = () => {
    this.setState((prev) => ({
      width: Math.max(prev.width - 50, 150),
      height: Math.max(prev.height - 50, 150),
    }));
  };

  componentDidMount() {
    if (this.mirror) {
      this.mirror.scrollTop = this.mirror.scrollHeight - this.mirror.clientHeight;
    }
  }

  containerRef = createRef<HTMLDivElement>();

  render() {
    return (
      <Flex direction="column" gap={4}>
        <Flex gap={2}>
          <Button onClick={this.handleIncreaseSize}>Increase size</Button>
          <Button onClick={this.handleDecreaseSize}>Decrease size</Button>
        </Flex>

        <div
          aria-label="main-title"
          ref={this.containerRef}
          style={{
            border: '2px solid black',
            width: this.state.width,
            height: this.state.height,
            transition: 'width 0.3s, height 0.3s',
          }}
        >
          <ScrollArea
            w="100%"
            h="100%"
            shadow={true}
            container={this.containerRef}
            tabIndex={0}
            observeParentSize={true}
            topOffset={100}
            bottomOffset={100}
            leftOffset={100}
            rightOffset={100}
            orientation="horizontal"
          >
            <ScrollArea.Container role="group" aria-labelledby="main-reverse-title">
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
            <ScrollArea.Bar h="40px" orientation="horizontal"></ScrollArea.Bar>
          </ScrollArea>
        </div>
      </Flex>
    );
  }
}

export default () => <Demo />;
