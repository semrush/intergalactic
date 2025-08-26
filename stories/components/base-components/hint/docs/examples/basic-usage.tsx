import { Hint } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';
import React from 'react';

const Demo = () => {
  const ref = React.useRef();

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
