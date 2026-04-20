import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState('Short text');

  const changeText = () => {
    const newText =
      'This is a very long text that was changed directly in DOM and should be automatically truncated with ellipsis. Hover to see full text in hint!';

    setText(newText);
  };

  const resetText = () => {
    const shortText = 'Short text';

    setText(shortText);
  };

  return (
    <Box ref={divRef}>
      <Text ellipsis:cropPosition='middle' ellipsis:observeChildrenMutations w={200} mb={3}>
        {text}
      </Text>

      <Box mb={2}>
        <Button onClick={changeText} mr={2}>
          Change text (via DOM)
        </Button>
        <Button onClick={resetText}>Reset</Button>
      </Box>
    </Box>
  );
};

export default Demo;
