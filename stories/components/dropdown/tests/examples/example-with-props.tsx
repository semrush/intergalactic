import FileExportM from '@semcore/icon/FileExport/m';
import InfoM from '@semcore/icon/Info/m';
import type { NSPopper } from '@semcore/ui/base-components';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import type { DropdownProps } from '@semcore/ui/dropdown';
import type { NSNotice } from '@semcore/ui/notice';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type DropdownExampleProps =
  & NSPopper.Popper.Props
  & NSPopper.Trigger.Props
  & NSPopper.Props
  & DropdownProps
  & {
    autofocus?: boolean;
    showNotice?: boolean;
    noticeTheme?: NSNotice.Theme;
    noticeHidden?: boolean;
    showNoticeLabel?: boolean;
    noticeTitle?: string;
    noticeText?: string;
    showNoticeActions?: boolean;
    noticeActionText?: string;
    showNoticeClose?: boolean;
  };
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
        wMax={260}
        aria-labelledby='dropdown-basic'
        disableEnforceFocus={props.disableEnforceFocus}
      >
        <Box p={4}>
          <Text size={200}>
            Hello there! I'm Dropdown's content
          </Text>
          <Tooltip
            title='Default tooltip contains short text explaining something about the trigger'
            tag={Button}
            aria-label='Export to PDF'
            addonLeft={FileExportM}
          />
        </Box>
        {props.showNotice && (
          <Dropdown.Notice
            theme={props.noticeTheme}
            hidden={props.noticeHidden}
          >
            {props.showNoticeLabel && (
              <Dropdown.Notice.Label>
                <InfoM />
              </Dropdown.Notice.Label>
            )}
            <Dropdown.Notice.Content>
              {props.noticeTitle && (
                <Dropdown.Notice.Title>{props.noticeTitle}</Dropdown.Notice.Title>
              )}
              {props.noticeText && <Dropdown.Notice.Text>{props.noticeText}</Dropdown.Notice.Text>}
              {props.showNoticeActions && (
                <Dropdown.Notice.Actions>
                  <Button use='primary'>{props.noticeActionText}</Button>
                </Dropdown.Notice.Actions>
              )}
            </Dropdown.Notice.Content>
            {props.showNoticeClose && <Dropdown.Notice.Close />}
          </Dropdown.Notice>
        )}
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
  showNotice: false,
  noticeTheme: 'info',
  noticeHidden: false,
  showNoticeLabel: false,
  noticeTitle: 'Notice title',
  noticeText: 'Additional information related to the dropdown content.',
  showNoticeActions: true,
  noticeActionText: 'Action',
  showNoticeClose: false,
};

Demo.defaultProps = defaultDropdownExampleProps;

export default Demo;
