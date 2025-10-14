import { Box, ScrollArea } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

let randomIndex = 1;
const stableRandom = () => {
  if (randomIndex > 20) randomIndex = 1;
  return Math.abs(
    Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))),
  );
};
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

export const Demo = () => {
  const scrollAreaEl = React.useRef(null);

  return (
    <>
      Press TAB to focus scroll container, then try to click button by mouse
      <ScrollArea h={300} ref={scrollAreaEl}>
        <Button onClick={() => alert('test')}>Click me</Button>
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
      </ScrollArea>
    </>
  );
};
export default () => <Demo />;
