import React from 'react';
import Link from '@semcore/link';
import HomeM from '@semcore/icon/Home/m';
import ArrowRightM from '@semcore/icon/ArrowRight/m';

export default function () {
  return (
    <>
      <Link addonLeft={HomeM} aria-label="home page" />
      <Link ml={2} aria-label="go to the next page">
        <Link.Addon>
          <ArrowRightM />
        </Link.Addon>
      </Link>
    </>
  );
}
