import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <>
    <Dropdown interaction='none'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        interaction="none"
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

    <Dropdown interaction='click'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        interaction="click"
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

    <Dropdown interaction='focus'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        interaction="focus"
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

    <Dropdown interaction='hover'>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2}>
        interaction="hover"
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
