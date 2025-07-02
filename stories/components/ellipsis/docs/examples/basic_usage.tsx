import { Box } from '@semcore/base-components';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';
import React from 'react';

const Demo = () => {
  return (
    <Box w={220}>
      <Link inline href='https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis'>
        <Link.Text tag={Ellipsis}>
          https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis
        </Link.Text>
      </Link>
    </Box>
  );
};

export default Demo;
