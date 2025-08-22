import { Hint } from '@semcore/base-components';
import Button from '@semcore/button';
import FileExportM from '@semcore/icon/FileExport/m';
import React from 'react';

const Demo = () => {
  const ref = React.useRef();

  return (
    <>
      <Button ref={ref} addonLeft={FileExportM} />
      <Hint triggerRef={ref} placement='bottom-start'>
        Bottom-start placement
      </Hint>
    </>
  );
};

export default Demo;
