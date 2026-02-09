import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Hint } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  return (
    <>
      <Link href='https://semrush.com' ref={ref}>
        <Link.Addon tag={LinkExternalM} />
      </Link>
      <Hint triggerRef={ref} timeout={[200, 150]}>
        Hint with custom animation timeouts
      </Hint>
    </>
  );
};

export default Demo;
