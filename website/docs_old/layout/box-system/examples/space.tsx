import React from 'react';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

const Demo = () => (
  <div>
    <Button>Button</Button>
    <Box inline w={8} />
    <Button>Button</Button>
    <Box inline w={8} />
    <Button>Button</Button>
    <Box inline w={8} />
    <Button>Button</Button>
  </div>
);

export default Demo;
