import InfoM from '@semcore/icon/Info/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Badge from '@semcore/ui/badge';
import type { NSBadge } from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { NSNotice } from '@semcore/ui/notice';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type SelectBasicValue = number | number[] | null;

export type SelectBasicProps = Omit<
  SelectProps<SelectBasicValue>,
  'value' | 'defaultValue' | 'onChange' | 'options' | 'tag'
> & {
  labelText?: string;
  showLabel?: boolean;
  optionCount?: number;

  // Trigger Addon props
  showLeftAddon?: boolean;
  leftAddonContent?: 'icon' | 'badge' | 'text';
  leftAddonText?: string;
  leftAddonBadgeType?: NSBadge.Type;

  showRightAddon?: boolean;
  rightAddonContent?: 'icon' | 'badge' | 'text';
  rightAddonText?: string;
  rightAddonBadgeType?: NSBadge.Type;

  showTriggerText?: boolean;
  triggerText?: string;
  size?: 'm' | 'l';

  // option addon props
  showOptionLeftAddon?: boolean;
  showOptionRightAddon?: boolean;

  // Notice props
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

const Demo = (props: SelectBasicProps) => {
  const {
    labelText = 'Select label',
    showLabel = true,
    optionCount = 6,
    placeholder = 'Select option',
    size = 'm',
    disabled = undefined,
    state = undefined,
    multiselect = undefined,
    interaction = undefined,
    scrollToSelected = undefined,

    // Trigger Addon
    showLeftAddon = false,
    leftAddonContent = 'icon',
    leftAddonText = 'Left',
    leftAddonBadgeType = 'alpha',

    showRightAddon = false,
    rightAddonContent = 'badge',
    rightAddonText = 'Right',
    rightAddonBadgeType = 'beta',

    triggerText = 'Trigger',
    showTriggerText = false,

    // option addon
    showOptionLeftAddon = false,
    showOptionRightAddon = false,

    // Notice
    showNotice = false,
    noticeTheme = 'info',
    noticeHidden = false,
    showNoticeLabel = true,
    noticeTitle = 'Notice title',
    noticeText = 'Additional information related to the available options.',
    showNoticeActions = true,
    noticeActionText = 'Action',
    showNoticeClose = false,

    ...restProps
  } = props;

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  const hasCustomTriggerOrOption = showLeftAddon || showRightAddon || showTriggerText || showOptionLeftAddon || showOptionRightAddon || showNotice;
  const [value, setValue] = React.useState<SelectBasicValue>(multiselect ? [] : null);

  React.useEffect(() => {
    setValue(multiselect ? [] : null);
  }, [multiselect]);

  const selectedTriggerText = options
    .filter((option) => Array.isArray(value) ? value.includes(option.value) : value === option.value)
    .map((option) => option.label)
    .join(', ');

  const renderOptions = () => options.map((option) => (
    <Select.Option key={option.value} value={option.value}>
      {showOptionLeftAddon && <Select.Option.Addon><LinkExternalM /></Select.Option.Addon>}
      <Select.Option.Text>{option.children}</Select.Option.Text>
      {showOptionRightAddon && <Select.Option.Addon><LinkExternalM /></Select.Option.Addon>}
    </Select.Option>
  ));

  const renderNotice = () => (
    <Select.Notice
      theme={noticeTheme}
      hidden={noticeHidden}
    >
      {showNoticeLabel && (
        <Select.Notice.Label>
          <InfoM />
        </Select.Notice.Label>
      )}
      <Select.Notice.Content>
        {noticeTitle && <Select.Notice.Title>{noticeTitle}</Select.Notice.Title>}
        {noticeText && <Select.Notice.Text>{noticeText}</Select.Notice.Text>}
        {showNoticeActions && (
          <Select.Notice.Actions>
            <Button use='primary'>{noticeActionText}</Button>
          </Select.Notice.Actions>
        )}
      </Select.Notice.Content>
      {showNoticeClose && <Select.Notice.Close />}
    </Select.Notice>
  );

  return (
    <Flex direction='column'>
      {showLabel && (
        <Text tag='label' size={200} htmlFor='configurable-select'>
          {labelText}
        </Text>
      )}
      {hasCustomTriggerOrOption
        ? (
            <Select
              value={value}
              onChange={setValue}
              size={size}
              multiselect={multiselect}
              interaction={interaction}
              scrollToSelected={scrollToSelected}
              {...restProps}
            >
              <Select.Trigger
                mt={showLabel ? 2 : 0}
                mr='auto'
                id='configurable-select'
                placeholder={placeholder}
                size={size}
                disabled={disabled}
                state={state}
              >
                {showLeftAddon && (
                  <Select.Trigger.Addon>
                    {leftAddonContent === 'icon' && <LinkExternalM />}
                    {leftAddonContent === 'badge' && (
                      <Badge type={leftAddonBadgeType} />
                    )}
                    {leftAddonContent === 'text' && leftAddonText}
                  </Select.Trigger.Addon>
                )}
                <Select.Trigger.Text>
                  {showTriggerText ? triggerText : selectedTriggerText}
                </Select.Trigger.Text>
                {showRightAddon && (
                  <Select.Trigger.Addon>
                    {rightAddonContent === 'icon' && <LinkExternalM />}
                    {rightAddonContent === 'badge' && (
                      <Badge type={rightAddonBadgeType} />
                    )}
                    {rightAddonContent === 'text' && rightAddonText}
                  </Select.Trigger.Addon>
                )}
              </Select.Trigger>
              {showNotice
                ? (
                    <Select.Popper aria-label='Select options with notice'>
                      <Select.List>{renderOptions()}</Select.List>
                      {renderNotice()}
                    </Select.Popper>
                  )
                : <Select.Menu>{renderOptions()}</Select.Menu>}
            </Select>
          )
        : (
            <Select
              mt={showLabel ? 2 : 0}
              mr='auto'
              id='configurable-select'
              options={options}
              placeholder={placeholder}
              size={size}
              disabled={disabled}
              state={state}
              multiselect={multiselect}
              interaction={interaction}
              scrollToSelected={scrollToSelected}
              {...restProps}
            />
          )}
    </Flex>
  );
};

export const defaultProps: SelectBasicProps = {
  labelText: 'Select label',
  showLabel: true,
  optionCount: 6,
  placeholder: 'Select option',
  size: 'm',
  disabled: undefined,
  state: undefined,
  multiselect: undefined,
  interaction: undefined,
  scrollToSelected: undefined,

  // Trigger Addon
  showLeftAddon: false,
  leftAddonContent: 'icon',
  leftAddonText: 'Left',
  leftAddonBadgeType: 'alpha',

  showRightAddon: false,
  rightAddonContent: 'badge',
  rightAddonText: 'Right',
  rightAddonBadgeType: 'beta',

  triggerText: 'Trigger',
  showTriggerText: false,

  // Notice
  showNotice: false,
  noticeTheme: 'info',
  noticeHidden: false,
  showNoticeLabel: false,
  noticeTitle: 'Notice title',
  noticeText: 'Additional information related to the available options.',
  showNoticeActions: true,
  noticeActionText: 'Action',
  showNoticeClose: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
