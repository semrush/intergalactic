import React from 'react';
import Textarea from '@semcore/textarea';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

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
        name='autoscalable-textarea'
        placeholder='Try typing a really big message'
      />
    </Box>
  </div>
);

export default Demo;
