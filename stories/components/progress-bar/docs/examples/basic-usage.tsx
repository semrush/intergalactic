import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import ProgressBar from '@semcore/ui/progress-bar';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const maxValue = 2000;

const Demo = () => {
  const barRef = React.useRef<HTMLDivElement | null>(null);
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
