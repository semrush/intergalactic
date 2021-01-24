import React from 'react';
import styled from 'styled-components';
import Scroll from '@semcore/scroll-area';

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class Demo extends React.PureComponent {
  render() {
    return (
      <Scroll h={300}>
        {[...new Array(100)].map((_, index) => (
          <Block ind={index} key={index} />
        ))}
      </Scroll>
    );
  }
}

export default Demo;
