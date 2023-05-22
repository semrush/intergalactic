import React from 'react';
import Link from '@semcore/ui/link';
import CheckXS from '@semcore/ui/icon/Check/m';
import ArrowRightXS from '@semcore/ui/icon/ArrowRight/m';

export default function () {
  return (
    <>
      <Link addonLeft={CheckXS} addonRight={ArrowRightXS} href="#">
        Link
      </Link>
      <Link ml={2} href="#">
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
