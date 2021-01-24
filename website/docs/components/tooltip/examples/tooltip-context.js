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
            Помогите тултипу!
          </Text>
          <Text tag="p" mb={4}>
            Я выгляжу как popover? 🤔
          </Text>
          <Button
            use="primary"
            theme="success"
            mr={2}
            onClick={() => {
              alert('В яблочко!');
              handlers.visible(false);
            }}
          >
            Да
          </Button>
          <Button use="secondary" theme="muted" onClick={() => alert('Не угадал!')}>
            Нет
          </Button>
        </div>
      )}
    </Tooltip.Popper>
  </Tooltip>
);

export default Demo;
