import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
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
