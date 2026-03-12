import { Box } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  return (
    <Box ml={20} mt={10}>
      <Link
        href='#'
        title='Export to PDF'
      >
        <Link.Text>
          Long link with short hint. Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.
        </Link.Text>
      </Link>
      <br />
      <br />
      <Link
        href='#'
        title='Intergalactic is a constantly developing system of UI components, guidelines and UX patterns'
      >
        <Link.Text>
          Short link, long hint.
        </Link.Text>
      </Link>
    </Box>
  );
};

export default Demo;
