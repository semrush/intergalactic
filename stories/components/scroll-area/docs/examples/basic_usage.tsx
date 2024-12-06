import React from 'react';
import Scroll from 'intergalactic/scroll-area';
import { Box } from '@semcore/flex-box';

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
      <Scroll h={300}>
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
      </Scroll>
    );
  }
}

export default Demo;
