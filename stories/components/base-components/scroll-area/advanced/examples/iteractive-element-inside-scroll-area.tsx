import { Box, ScrollArea } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

export const Demo = () => {
  const scrollAreaEl = React.useRef(null);

  const boxColor = '#00AEEF';

  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <>
      <ScrollArea h={300} ref={scrollAreaEl}>
        <Button onClick={handleClick}>Click me</Button>
        {[...new Array(100)].map((_, index) => (
          <Box
            key={index}
            inline
            m={2}
            w={120}
            h={120}
            style={{ backgroundColor: boxColor }}
          />
        ))}
      </ScrollArea>
    </>
  );
};

export default () => <Demo />;
