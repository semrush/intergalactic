import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Hint } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  return (
    <>
      <a href='https://www.semrush.com/' ref={ref}>
        <LinkExternalM />
      </a>
      <Hint triggerRef={ref} timeout={[200, 150]}>
        Hint with custom animation timeouts
      </Hint>
    </>
  );
};

export default Demo;
