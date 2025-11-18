import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Flex direction='column'>
      <RadioGroup aria-label='RadioGroup example' size='m'>
        <Tooltip visible={isVisible} theme='warning'>
          <Tooltip.Trigger>
            <Radio
              label='Value 1'
              state={isVisible ? 'invalid' : 'normal'}
              value='1'
            />
          </Tooltip.Trigger>
          <Tooltip.Popper>Choose option!</Tooltip.Popper>
        </Tooltip>
        <Radio label='Value 2' mb={3} state='normal' value='2' />
      </RadioGroup>
      <Button onClick={() => setIsVisible(!isVisible)}>
        Show validation error
      </Button>
    </Flex>
  );
};

export default Demo;

export const App = () => <Demo />;
