import HomeM from '@semcore/icon/Home/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Hint } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);
  return (
    <>
      <Link addonLeft={HomeM} aria-label='Home page' href='#' />
      <Link ml={4} href='#' ref={linkRef} title='Go to the next page'>
        <Link.Addon>
          <LinkExternalM />
        </Link.Addon>
      </Link>
      <Hint triggerRef={linkRef}>Go to the next page</Hint>
    </>
  );
};

export default Demo;
