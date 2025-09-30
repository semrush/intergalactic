import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <Dropdown stretch='min' placement='right-end'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        Right stretch="min"
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>
          Hello there! I'm Dropdown's content
        </Text>
        <Tooltip
          title='Default tooltip contains short text explaining something about the trigger'
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Dropdown.Popper>
    </Dropdown>

    <Dropdown stretch='fixed' placement='left-end'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        Left stretch="fixed"
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>
          Hello there! I'm Dropdown's content
        </Text>
        <Tooltip
          title='Default tooltip contains short text explaining something about the trigger'
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Dropdown.Popper>
    </Dropdown>

    <Dropdown stretch='fixed' placement='bottom-start'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        Bottom stretch="fixed"
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>
          Hello there! I'm Dropdown's content
        </Text>
        <Tooltip
          title='Default tooltip contains short text explaining something about the trigger'
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Dropdown.Popper>
    </Dropdown>

    <Dropdown stretch={false} placement='left-end'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        Left stretch="false"
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>
          Hello there! I'm Dropdown's content
        </Text>
        <Tooltip
          title='Default tooltip contains short text explaining something about the trigger'
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Dropdown.Popper>
    </Dropdown>

  </>
);

export default Demo;
