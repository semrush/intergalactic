import React from 'react';
import Link from '@semcore/ui/link';
import CheckM from '@semcore/ui/icon/Check/m';
import ChevronRightM from '@semcore/ui/icon/ChevronRight/m';

const Demo = () => {
  return (
    <>
      <Link ml={4} href='#' size={300}>
        <Link.Addon>
          <CheckM />
        </Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
