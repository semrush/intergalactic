import React, { useRef } from 'react';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';

declare const eventCalculate: any; // Глобальная переменная для расчетов

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
  mirror: HTMLDivElement | null = null;
  containerRef = React.createRef<HTMLDivElement>(); // Правильное объявление рефа

  handleScrollMain = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.mirror) {
      this.mirror.scrollTop =
        this.mirror.scrollHeight - this.mirror.clientHeight - e.currentTarget.scrollTop;
    }

    // Используем eventCalculate, если он глобально объявлен
    if (typeof eventCalculate === 'function') {
      eventCalculate(e);
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
        <h3 id='main-reverse-title'>Main ScrollArea</h3>
        <div id='main-reverse-title' ref={this.containerRef}>
          Main ScrollArea
          <ScrollArea
            w={300}
            h={300}
            shadow={true}
            container={this.containerRef} // Передаем ref, а не строку
            tabIndex={0}
            observeParentSize={true}
            topOffset={100}
            bottomOffset={100}
           
           
          >
            <ScrollArea.Container
              role='group'
              aria-labelledby='main-reverse-title'
              onScroll={this.handleScrollMain}
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

            {/* Горизонтальный скроллбар */}
            <ScrollArea.Bar  w = '40px'>
              <ScrollArea.Bar.Slider />
            </ScrollArea.Bar>
          </ScrollArea>
        </div>
      </Flex>
    );
  }
}

export default () => <Demo />;
