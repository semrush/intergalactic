import React from 'react';
import Link from '@semcore/link';
import CheckXS from '@semcore/icon/Check/m';
import ArrowRightXS from '@semcore/icon/ArrowRight/m';

export default function () {
  return (
    <>
      <Link addonLeft={CheckXS} addonRight={ArrowRightXS}>
        Link
      </Link>
      <Link ml={2}>
        <Link.Addon>
          <CheckXS />
        </Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>
          <ArrowRightXS />
        </Link.Addon>
      </Link>
    </>
  );
}
