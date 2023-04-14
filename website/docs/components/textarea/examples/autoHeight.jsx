import React from 'react';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => (
  <div>
    <Text tag="label" htmlFor="autoscalable-textarea">
      Textarea with automatic height
    </Text>
    <Box mt={2}>
      <Textarea
        w={500}
        minRows={4}
        maxRows={10}
        id="autoscalable-textarea"
        placeholder="Try type something really big"
      />
    </Box>
  </div>
);

export default Demo;
