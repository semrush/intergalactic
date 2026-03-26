import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SelectBasicProps = SelectProps & {
  labelText?: string;
  showLabel?: boolean;
  optionCount?: number;

  // Trigger Addon props
  showLeftAddon?: boolean;
  leftAddonContent?: 'icon' | 'badge' | 'text';
  leftAddonText?: string;
  leftAddonBadgeText?: string;
  leftAddonBadgeBg?: string;

  showRightAddon?: boolean;
  rightAddonContent?: 'icon' | 'badge' | 'text';
  rightAddonText?: string;
  rightAddonBadgeText?: string;
  rightAddonBadgeBg?: string;

  showTriggerText?: boolean;
  triggerText?: string;
  size?: 'm' | 'l';
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
    leftAddonBadgeText = 'alpha',
    leftAddonBadgeBg = 'red-400',

    showRightAddon = false,
    rightAddonContent = 'badge',
    rightAddonText = 'Right',
    rightAddonBadgeText = 'beta',
    rightAddonBadgeBg = 'blue-400',

    triggerText = 'Trigger',
    showTriggerText = false,

    ...restProps
  } = props;

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  const hasCustomTrigger = showLeftAddon || showRightAddon || showTriggerText;

  return (
    <Flex direction='column'>
      {showLabel && (
        <Text tag='label' size={200} htmlFor='configurable-select'>
          {labelText}
        </Text>
      )}
      <Select
        mt={showLabel ? 2 : 0}
        mr='auto'
        options={!hasCustomTrigger ? options : undefined}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        state={state}
        multiselect={multiselect}
        interaction={interaction}
        scrollToSelected={scrollToSelected}
        {...restProps}
      >
        {hasCustomTrigger
          ? (
              <>
                <Select.Trigger id='configurable-select'>
                  {showLeftAddon && (
                    <Select.Trigger.Addon>
                      {leftAddonContent === 'icon' && <LinkExternalM />}
                      {leftAddonContent === 'badge' && (
                        <Badge bg={leftAddonBadgeBg}>{leftAddonBadgeText}</Badge>
                      )}
                      {leftAddonContent === 'text' && leftAddonText}
                    </Select.Trigger.Addon>
                  )}
                  {showTriggerText && <Select.Trigger.Text>{triggerText}</Select.Trigger.Text>}
                  {showRightAddon && (
                    <Select.Trigger.Addon>
                      {rightAddonContent === 'icon' && <LinkExternalM />}
                      {rightAddonContent === 'badge' && (
                        <Badge bg={rightAddonBadgeBg}>{rightAddonBadgeText}</Badge>
                      )}
                      {rightAddonContent === 'text' && rightAddonText}
                    </Select.Trigger.Addon>
                  )}
                </Select.Trigger>
                <Select.Menu>
                  {options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.children}
                    </Select.Option>
                  ))}
                </Select.Menu>
              </>
            )
          : (
              <Select.Trigger id='configurable-select' />
            )}
      </Select>
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
  leftAddonBadgeText: 'alpha',
  leftAddonBadgeBg: 'red-400',

  showRightAddon: false,
  rightAddonContent: 'badge',
  rightAddonText: 'Right',
  rightAddonBadgeText: 'beta',
  rightAddonBadgeBg: 'blue-400',

  triggerText: 'Trigger',
  showTriggerText: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
