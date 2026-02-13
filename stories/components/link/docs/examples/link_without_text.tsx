import HomeM from '@semcore/icon/Home/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Link from '@semcore/ui/link';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Link addonLeft={HomeM} aria-label='Home page' href='#' />
      <Link ml={4} href='#' tag={Hint} title='Go to the next page'>
        <Link.Addon>
          <LinkExternalM />
        </Link.Addon>
      </Link>
    </>
  );
};

export default Demo;
