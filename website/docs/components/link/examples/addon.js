import React from 'react';
import Link from '@semcore/link';
import CheckXS from '@semcore/icon/lib/Check/m';
import ArrowRightXS from '@semcore/icon/lib/ArrowRight/m';

export default function() {
  return (
    <>
      <Link addonLeft={CheckXS} addonRight={ArrowRightXS}>
        Link
      </Link>
      <Link ml={2}>
        <Link.Addon tag={CheckXS} />
        <Link.Text>Link</Link.Text>
        <Link.Addon tag={ArrowRightXS} />
      </Link>
    </>
  );
}
