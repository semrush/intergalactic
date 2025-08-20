import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <div>
      <p>
        <Box w={50}>
          <Text ellipsis={true}>Segment 2sfdsf</Text>
        </Box>
      </p>
      <p>
        <Box w={111}>
          <Text ellipsis={{ trim: 'middle' }}>Segment 2sfdsf</Text>
        </Box>
      </p>
      <p>
        <Box w={120}>
          <Text ellipsis={true}>Lorem bbjips</Text>
        </Box>
      </p>
      <p>
        <Box w={120}>
          <Text ellipsis={{ trim: 'middle' }}>Lorem bbjips</Text>
        </Box>
      </p>
      <p>
        <Box w={220}>
          <Text ellipsis={{ maxLine: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
            voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
            ullam voluptate? Aperiam distinctio minus possimus quasi.

          </Text>
        </Box>
      </p>
      <p>
        <Text display='block' w={111} mb={3} ellipsis={true}>
          Segment 2sfdsf
        </Text>
      </p>
      <p>
        <Text display='block' w={111} mb={3} ellipsis={{ trim: 'middle' }}>
          Segment 2sfdsf
        </Text>
      </p>
      <p>
        <Text
          display='block'
          w={150}
          h={150}
          mb={3}
          size={700}
          tag='p'
          mt={0}
          style={{ outline: '1px solid red' }}
          ellipsis={{ trim: 'end', maxLine: 2 }}
        >
          Word WordWor
        </Text>
      </p>
    </div>
  );
};

export default Demo;
