import React from 'react';
import Tooltip from '@semcore/tooltip';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Tooltip interaction="click">
    <Tooltip.Trigger>
      <Button>Click me</Button>
    </Tooltip.Trigger>
    <Tooltip.Popper>
      {(props, handlers) => (
        <div>
          <Text size={300} tag="h6" mb={1} mt={0}>
            Help the tooltip!
          </Text>
          <Text tag="p" mb={4}>
            Do I look like a tooltip? 🤔
          </Text>
          <Button
            use="primary"
            theme="success"
            mr={2}
            onClick={() => {
              alert('Bingo!');
              handlers.visible(false);
            }}
          >
            Yes
          </Button>
          <Button use="secondary" theme="muted" onClick={() => alert('You did not guess :(')}>
            No
          </Button>
        </div>
      )}
    </Tooltip.Popper>
  </Tooltip>
);

export default Demo;
