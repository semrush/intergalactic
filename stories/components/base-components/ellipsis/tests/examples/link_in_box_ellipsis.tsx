import { Box } from '@semcore/base-components';
import Link from '@semcore/link';
import React from 'react';

const Demo = () => {
  return (
    <Box w={120}>
      <Link
        href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'
        ellipsis={true}
        w={120}
      >
        <Link.Text>
          https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
        </Link.Text>
      </Link>
    </Box>
  );
};

export default Demo;
