import { Hint } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={ref}>
        <Button.Addon tag={FileExportM} />
      </Button>
      <Hint triggerRef={ref}>Export to PDF</Hint>
    </>
  );
};

export default Demo;
