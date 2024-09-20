import React from 'react';
import Link from 'intergalactic/link';
import HomeM from 'intergalactic/icon/Home/m';
import LinkExternalM from 'intergalactic/icon/LinkExternal/m';
import { Hint } from 'intergalactic/tooltip';

const Demo = () => {
  return (
    <>
      <Link addonLeft={HomeM} aria-label='home page' href='#' />
      <Link ml={4} href='#' tag={Hint} title={'go to the next page'}>
        <Link.Addon>
          <LinkExternalM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
