import React from 'react';
import Link from '@semcore/ui/link';
import CheckM from '@semcore/ui/icon/Check/m';
import ChevronRightM from '@semcore/ui/icon/ChevronRight/m';

export default function () {
  return (
    <>
      <Link addonLeft={CheckM} addonRight={ChevronRightM} href="#" size="300">
        Link
      </Link>
      <Link ml={4} href="#" size="300">
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
}
