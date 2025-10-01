import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} disableEnforceFocus={true}>
        disableEnforceFocus trigger
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

    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        disableEnforceFocus popper
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' disableEnforceFocus={true}>
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

    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        keyboardFocused popper
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' keyboardFocused={true}>
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

    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        autoFocus='enforced'
        {' '}
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' autoFocus='enforced'>
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

    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        autoFocus=false
        {' '}
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' autoFocus={false}>
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

    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        autoFocus=true
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' autoFocus={true}>
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
