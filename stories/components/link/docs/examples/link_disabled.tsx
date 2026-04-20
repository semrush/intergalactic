import ChevronRightM from '@semcore/icon/ChevronRight/m';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Link ml={4} href='#' size={300} disabled>
        <Link.Text>Disabled link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
