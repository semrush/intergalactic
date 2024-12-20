import React from 'react';
import Ellipsis from 'intergalactic/ellipsis';
import { Box } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

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
