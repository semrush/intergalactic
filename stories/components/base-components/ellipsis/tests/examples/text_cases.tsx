import { Box, Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <div>
      <p>

        <Text w={50} ellipsis={true}>Segment 2sfdsf</Text>

      </p>
      <p>

        <Text w={111} display='block' ellipsis:cropPosition='middle'>Segment 2sfdsf</Text>

      </p>
      <p>

        <Text w={120} ellipsis={true}>Lorem bbjips</Text>

      </p>
      <p>

        <Text w={50} display='block' ellipsis:cropPosition='middle'>Lorem bbjips</Text>

      </p>

      <p>

        <Box w={200}>
          <Flex py={2} px={3} h={48} w='100%' alignItems='center'>
            <Text ellipsis:maxLine={2} size={100}>
              Website is better optimized for AI search engines
            </Text>
          </Flex>
        </Box>

      </p>
      <p>
        <Box w={220}>
          <Text ellipsis:maxLine={3}>
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
        <Text w={111} mb={3} ellipsis:cropPosition='middle'>
          Segment 2sfdsf
        </Text>
      </p>
      <p>
        <Text
          display='block'
          w={150}
          mb={3}
          size={700}
          tag='p'
          mt={0}
          style={{ outline: '1px solid red' }}
          ellipsis:cropPosition='end'
          ellipsis:maxLine={2}
        >
          Word WordWor
        </Text>
      </p>
    </div>
  );
};

export default Demo;
