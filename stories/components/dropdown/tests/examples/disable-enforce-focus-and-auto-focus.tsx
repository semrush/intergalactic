import FileExportM from '@semcore/icon/FileExport/m';
import type { NSPopper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import type { DropdownProps } from '@semcore/ui/dropdown';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type DisableEnforceAndAutoFocusExampleProps =
  & NSPopper.Popper.Props
  & NSPopper.Trigger.Props
  & NSPopper.Props
  & DropdownProps;

const Demo = (props: DisableEnforceAndAutoFocusExampleProps) => (
  <>
    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} disableEnforceFocus={props.disableEnforceFocus}>
        disableEnforceFocus trigger
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' autoFocus={props.autoFocus}>
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
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic' disableEnforceFocus={props.disableEnforceFocus} autoFocus={props.autoFocus}>
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

export const defaultDisableEnforceAndAutoFocusExampleProps: DisableEnforceAndAutoFocusExampleProps = {
  disableEnforceFocus: undefined,
  autoFocus: undefined,

};

Demo.defaultProps = defaultDisableEnforceAndAutoFocusExampleProps;

export default Demo;
