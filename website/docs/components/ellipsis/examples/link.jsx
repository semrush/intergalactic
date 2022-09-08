import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';
import Link from '@semcore/link';

export default function () {
  return (
    <Box w={220}>
      <Link inline>
        <Link.Text tag={Ellipsis}>https://developer.semrush.com/intergalactic/</Link.Text>
      </Link>
    </Box>
  );
}
