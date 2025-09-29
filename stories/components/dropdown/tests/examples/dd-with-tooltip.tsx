import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
      About export
    </Dropdown.Trigger>
    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
      <Tooltip
        title='Default tooltip contains short text explaining something about the trigger'
        tag={Button}
        aria-label='Export to PDF'
        addonLeft={FileExportM}
      />
    </Dropdown.Popper>
  </Dropdown>
);

export default Demo;
