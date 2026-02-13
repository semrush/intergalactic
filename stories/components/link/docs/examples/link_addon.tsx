import CheckM from '@semcore/icon/Check/m';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Link ml={4} href='#'>
        <Link.Addon>
          <CheckM />
        </Link.Addon>
        <Link.Text size={300}>Link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
