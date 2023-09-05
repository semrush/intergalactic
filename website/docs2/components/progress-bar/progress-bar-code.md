---
title: Example
fileSource: progress-bar
tabs: ProgressBar('index'), A11y('progress-bar-a11y'), API('progress-bar-api'), Example('progress-bar-code'), Changelog('progress-bar-changelog')
---

## Complex usage example

::: sandbox

<script lang="tsx">
import React, { useState, useEffect } from 'react';
import { Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
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
      <ProgressBar value={value} aria-label='Infinite emails processing' />
    </div>
  );
};
</script>

:::

## Customizing the bar

By default, you should use `<ProgressBar/>`. However, if you need to customize the progress bar using the `ProgressBar.Value` element, you can achieve it in the following manner:

::: sandbox

<script lang="tsx">
import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <ProgressBar value={80} theme='#EDD9FF' aria-label='Email processing'>
      <ProgressBar.Value theme='violet' />
    </ProgressBar>
  );
};
</script>

:::
