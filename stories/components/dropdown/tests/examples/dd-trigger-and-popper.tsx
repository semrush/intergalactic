import React from 'react';
import Button from '@semcore/button';
import Dropdown from '@semcore/dropdown';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import FileExportM from '@semcore/icon/FileExport/m';

const Demo = () => (
  <>
  <Dropdown  >
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} disableEnforceFocus	={true}	>
    disableEnforceFocus	 trigger
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
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
    disableEnforceFocus	 popper
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

  <Dropdown >
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
    keyboardFocused popper
    </Dropdown.Trigger>
    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' keyboardFocused ={true}>
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
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
    autoFocus='enforced'    </Dropdown.Trigger>
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
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
    autoFocus=false    </Dropdown.Trigger>
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

  <Dropdown >
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
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
