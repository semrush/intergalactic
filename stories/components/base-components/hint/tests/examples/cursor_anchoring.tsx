import { Hint } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  return (
    <>
      <Link href='#' ref={ref}>
        <Link.Text>Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.</Link.Text>
      </Link>
      <Hint triggerRef={ref}>Export to PDF</Hint>
    </>
  );
};

export default Demo;
