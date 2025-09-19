import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Box w='240px'>
      <Text tag={[Ellipsis, 'h2']} size={400} bold noWrap>
        2. Very long text Very long text Very long text
      </Text>
    </Box>
  );
};

export default Demo;
