import Button from '@semcore/ui/button';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import React from 'react';

const Demo = () => {
  return (
    <Button
      addonLeft={FileExportM}
      title='Bottom-start placement'
      hintPlacement='bottom-start'
    />
  );
};

export default Demo;
