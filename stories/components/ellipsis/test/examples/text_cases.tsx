import { Box } from '@semcore/ui/base-components';
import Ellipsis from '@semcore/ui/ellipsis';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <div>
      <p>
        <Box w={111}>
          <Ellipsis>Segment 2sfdsf</Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={111}>
          <Ellipsis trim='middle'>Segment 2sfdsf</Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={120}>
          <Ellipsis trim='end'>Lorem bbjips</Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={120}>
          <Ellipsis trim='middle'>Lorem bbjips</Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={220}>
          <Ellipsis maxLine={3}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
            voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
            ullam voluptate? Aperiam distinctio minus possimus quasi.
          </Ellipsis>
        </Box>
      </p>
      <p>
        <Text display='block' w={111} mb={3}>
          <Ellipsis trim='end'>Segment 2sfdsf</Ellipsis>
        </Text>
      </p>
      <p>
        <Text display='block' w={111} mb={3}>
          <Ellipsis trim='middle'>Segment 2sfdsf</Ellipsis>
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
        >
          <Ellipsis maxLine={2}>Word WordWor</Ellipsis>
        </Text>
      </p>
    </div>
  );
};

export default Demo;
