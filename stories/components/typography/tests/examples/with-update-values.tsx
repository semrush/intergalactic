import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const Demo = () => {
  const [text, setText] = useState('Short text');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: 200 }}>
        <Text ellipsis>{text}</Text>
      </div>
      <div>Actual text: {text}</div>
      <Button onClick={() => setText(`Updated text ${Math.random()}`)}>
        Update text
      </Button>
    </div>
  );
};
export default Demo;
