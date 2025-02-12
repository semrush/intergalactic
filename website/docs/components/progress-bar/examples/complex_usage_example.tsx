import React from 'react';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ProgressBar from '@semcore/progress-bar';

const maxValue = 2000;

const Demo = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timerFetch = setInterval(() => {
      setValue((value) => (value < maxValue ? value + 400 : 0));
    }, 2000);
    return () => {
      clearInterval(timerFetch);
    };
  }, []);

  return (
    <div>
      <Box mb={1}>
        <Text size={200}>{value ? `${value}/${maxValue}` : 'Starting...'}</Text>
      </Box>
      <ProgressBar
        tabIndex={0}
        value={(value / maxValue) * 100}
        aria-valuetext={`${value} of ${maxValue}`}
        aria-label='Infinite emails processing'
      />
    </div>
  );
};

export default Demo;
