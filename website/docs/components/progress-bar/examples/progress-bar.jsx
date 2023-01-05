import React, { useState, useEffect } from 'react';
import { Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import ProgressBar from '@semcore/ui/progress-bar';

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
      <ProgressBar value={value} />
      <Box mt={1}>
        <Text>{value ? `${20 * value}/2000` : 'progress...'}</Text>
      </Box>
    </div>
  );
};

export default Demo;
