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
      <Hint triggerRef={ref} timeout={[100, 50]}>
        Hint with 100ms/50ms timeout
      </Hint>
    </>
  );
};

export default Demo;
