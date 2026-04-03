import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => (
  <Link>
    <Link.Text
      ellipsis
      w={100}
      hint:placement='right'
    >
      Long link text with hint on the right
    </Link.Text>
  </Link>
);

export default Demo;
