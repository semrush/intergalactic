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

