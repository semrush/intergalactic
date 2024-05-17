import React from 'react';
import Link from 'intergalactic/link';
import HomeM from 'intergalactic/icon/Home/m';
import LinkExternalM from 'intergalactic/icon/LinkExternal/m';

const Demo = () => {
  return (
    <>
      <Link addonLeft={HomeM} aria-label='home page' href='#' />
      <Link ml={4} aria-label='go to the next page' href='#'>
        <Link.Addon>
          <LinkExternalM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
