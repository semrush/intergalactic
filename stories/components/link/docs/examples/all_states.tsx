import { Box } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <Box>
      <Link use='primary' href='#'>Primary link</Link>
      <br />
      <Link use='secondary' href='#'>Secondary link</Link>
      <br />
      <Link use='accent' href='#'>Accent link</Link>
      <br />
      <br />
      <Link use='primary' href='https://some.lin'>Primary external link</Link>
      <br />
      <Link use='secondary' href='https://some.lin'>Secondary external link</Link>
      <br />
      <Link use='accent' href='https://some.lin'>Accent external link</Link>
    </Box>
  );
};

export default Demo;
