import { Hint } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  return (
    <>
      <Link href='#' ref={ref}>
        <Link.Text>Hint with 200ms/150ms timeout</Link.Text>
      </Link>
      <Hint triggerRef={ref} timeout={[200, 150]}>Export to PDF</Hint>
    </>
  );
};

export default Demo;
