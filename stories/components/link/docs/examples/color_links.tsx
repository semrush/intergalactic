import React from 'react';
import Link from '@semcore/link';

const Demo = () => {
  return (
    <div>
      <Link color='text-critical' href='#' size={300}>
        Critical link
      </Link>
      <br />
      <br />
      <Link color='text-success' href='#' size={300}>
        Success link
      </Link>
    </div>
  );
};

export default Demo;
