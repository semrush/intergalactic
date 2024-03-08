import React from 'react';
import Link from 'intergalactic/link';
import HomeM from 'intergalactic/icon/Home/m';
import ArrowRightM from 'intergalactic/icon/ArrowRight/m';

const Demo = () => {
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
};

export default Demo;
