import FileExportM from '@semcore/icon/FileExport/m';
import type { PopperProps, PopperTriggerProps, PopperPopperProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import type { DropdownProps } from '@semcore/ui/dropdown';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type DropdownExampleProps = PopperPopperProps & PopperTriggerProps & PopperProps & DropdownProps & { autofocus?: boolean };
const Demo = (props: DropdownExampleProps) => (
  <Flex p={30}>
    <Dropdown
      stretch={props.stretch}
      placement={props.placement}
      timeout={props.timeout}
      interaction={props.interaction}
      visible={props.visible}
      defaultVisible={props.defaultVisible}
      offset={props.offset}
      disabled={props.disabled}
      disableEnforceFocus={props.disableEnforceFocus}
      focusLoop={props.focusLoop}
      explicitTriggerSet={props.explicitTriggerSet}
      cursorAnchoring={props.cursorAnchoring}
      popperMargin={props.popperMargin}
    >
      <Dropdown.Trigger
        id='dropdown-basic'
        tag={Button}
        ml={2}
        data-testid='test'
        disableEnforceFocus={props.disableEnforceFocus}
      >
        Dropdown Props
      </Dropdown.Trigger>
      <Dropdown.Popper
        p={4}
        wMax={260}
        aria-labelledby='dropdown-basic'
        disableEnforceFocus={props.disableEnforceFocus}
      >
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

  </Flex>
);

export const defaultDropdownExampleProps: DropdownExampleProps = {
  stretch: false,
  timeout: undefined,
  placement: undefined,
  interaction: undefined,
  visible: undefined,
  defaultVisible: false,
  offset: undefined,
  disabled: undefined,
  disableEnforceFocus: undefined,
  focusLoop: undefined,
  explicitTriggerSet: undefined,
  cursorAnchoring: undefined,
  popperMargin: undefined,
};

Demo.defaultProps = defaultDropdownExampleProps;

export default Demo;
