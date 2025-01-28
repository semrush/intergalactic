import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ProgressBar from '@semcore/progress-bar';
import Button from '@semcore/button';

const maxValue = 2000;

const Demo = () => {
  const barRef = React.useRef(null);
  const [value, setValue] = React.useState(0);

  const restart = () => {
    setValue(0);
    barRef.current?.focus();
  };

  React.useEffect(() => {
    if (value < maxValue) {
      const timerFetch = setInterval(() => {
        setValue((value) => value + 400);
      }, 2000);
      return () => {
        clearInterval(timerFetch);
      };
    }
  }, [value]);

  return (
    <Flex gap={2} direction='column' alignItems='start'>
      <Text size={200}>{value ? `${value}/${maxValue}` : 'Starting...'}</Text>
      <ProgressBar
        tabIndex={0}
        value={(value / maxValue) * 100}
        aria-valuetext={`${value} of ${maxValue}`}
        aria-label='Basic ProgressBar example'
        ref={barRef}
      />
      <Button onClick={restart} mt={2}>
        Restart progress
      </Button>
    </Flex>
  );
};

export default Demo;
