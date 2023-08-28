---
title: Example
fileSource: textarea
tabs: Textarea('textarea'), A11y('textarea-a11y'), API('textarea-api'), Example('textarea-code'), Changelog('textarea-changelog')
---

## Textarea with auto height

The component can automatically adjust its height as the user types text.

To control the automatic stretching, you can set limits on the number of lines using `maxRows` and `minRows`. This way, the area will stretch until a scrollbar appears inside it.

::: sandbox

<script lang="tsx">
import React from 'react';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => (
  <div>
    <Text tag='label' size={200} htmlFor='autoscalable-textarea'>
      Textarea with automatic height
    </Text>
    <Box mt={2}>
      <Textarea
        w={500}
        minRows={4}
        maxRows={10}
        id='autoscalable-textarea'
        placeholder='Try typing a really big message'
      />
    </Box>
  </div>
);


</script>

:::
