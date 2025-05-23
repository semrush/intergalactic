import React from 'react';
import Button from '@semcore/button';
import Dropdown from '@semcore/dropdown';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import FileExportM from '@semcore/icon/FileExport/m';

const Demo = () => (
  <>
  <Dropdown timeout = {1000} >
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}	data-testid='timeout'>
    timeout
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

  <Dropdown defaultVisible>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='defaultVisible'>
    defaultVisible
    </Dropdown.Trigger>
    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' >
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

  <Dropdown visible = {false}>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='visible'>
    visible
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

  <Dropdown disabled={true}>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='disabled' >
    disabled    </Dropdown.Trigger>
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

  <Dropdown disableEnforceFocus={true}>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='disableEnforceFocus'>
    disableEnforceFocus    </Dropdown.Trigger>
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

  <Dropdown explicitTriggerSet={true}>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='explicitTriggerSet'>
    explicitTriggerSet    </Dropdown.Trigger>
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

  <Dropdown popperMargin={100}>
    <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='popperMargin'>
    popperMargin    </Dropdown.Trigger>
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

  <Dropdown
  strategy="absolute"
  modifiers={[]}
  onVisibleChange={(visible, e) => {
    console.log('Dropdown visibility changed:', visible, e);
  }}
  offset={[0, 8]}
  preventOverflow={{ boundary: 'clippingParents', padding: 8 }}
  arrow={{ element: '[data-popper-arrow]', padding: 5 }}
  flip={{ fallbackPlacements: ['top', 'bottom'] }}
  computeStyles={{ adaptive: true }}
  eventListeners={{ scroll: true, resize: true }}
  onFirstUpdate={(state) => {
    console.log('Popper first update', state);
  }}
>
  <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} data-testid='onVisibleChange onFirstUpdate'>
  onVisibleChange onFirstUpdate
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
