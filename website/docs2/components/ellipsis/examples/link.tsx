import React from 'react';
import Ellipsis from '@semcore/ui/ellipsis';
import { Box } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

const Demo = () => {
  return (
    <Box w={220}>
      <Link inline href='https://developer.semrush.com/intergalactic/'>
        <Link.Text tag={Ellipsis}>https://developer.semrush.com/intergalactic/</Link.Text>
      </Link>
    </Box>
  );
}