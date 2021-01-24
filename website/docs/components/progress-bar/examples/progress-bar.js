import React, { useState, useEffect } from 'react';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ProgressBar from '@semcore/progress-bar';

const Demo = () => {
  const [value, updateValue] = useState(0);

  useEffect(() => {
    const timerFetch = setInterval(() => {
      updateValue((value) => {
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
        <Text>{value ? `${20 * value}/2000` : 'progress...'}</Text>
      </Box>
      <ProgressBar value={value} />
    </div>
  );
};

export default Demo;
