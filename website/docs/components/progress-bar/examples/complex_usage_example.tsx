import React from 'react';
import { Box } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import ProgressBar from 'intergalactic/progress-bar';

const Demo = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timerFetch = setInterval(() => {
      setValue((value) => {
        if (value < 100) {
          return value + 20;
        }
        return 0;
      });
    }, 1000);
    return () => {
      clearInterval(timerFetch);
    };
  }, []);

  return (
    <div>
      <Box mb={1}>
        <Text size={200}>{value ? `${20 * value}/2000` : 'progress...'}</Text>
      </Box>
      <ProgressBar tabIndex={0} value={value} aria-label='Infinite emails processing' />
    </div>
  );
};

export default Demo;
