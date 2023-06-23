import React from 'react';
import Link from '@semcore/ui/link';
import HomeM from '@semcore/ui/icon/Home/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

export default function () {
  return (
    <>
      <Link addonLeft={HomeM} aria-label='home page' href='#' />
      <Link ml={2} aria-label='go to the next page' href='#'>
        <Link.Addon>
          <ArrowRightM />
        </Link.Addon>
      </Link>
    </>
  );
}
