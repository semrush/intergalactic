import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
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

  // option addon props
  showOptionLeftAddon?: boolean;
  showOptionRightAddon?: boolean;
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

    // option addon
    showOptionLeftAddon = false,
    showOptionRightAddon = false,

    ...restProps
  } = props;

  const options = Array(optionCount)
    .fill('')
    .map((_, index) => ({
      value: index,
      label: `Option ${index}`,
      children: `Option ${index}`,
    }));

  const hasCustomTriggerOrOption = showLeftAddon || showRightAddon || showTriggerText || showOptionLeftAddon || showOptionRightAddon;
  const [value, setValue] = React.useState<SelectBasicValue>(multiselect ? [] : null);

  React.useEffect(() => {
    setValue(multiselect ? [] : null);
  }, [multiselect]);

  const selectedTriggerText = options
    .filter((option) => Array.isArray(value) ? value.includes(option.value) : value === option.value)
    .map((option) => option.label)
    .join(', ');

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
                      <Badge bg={leftAddonBadgeBg}>{leftAddonBadgeText}</Badge>
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
                      <Badge bg={rightAddonBadgeBg}>{rightAddonBadgeText}</Badge>
                    )}
                    {rightAddonContent === 'text' && rightAddonText}
                  </Select.Trigger.Addon>
                )}
              </Select.Trigger>
              <Select.Menu>
                {options.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {showOptionLeftAddon && <Select.Option.Addon><LinkExternalM /></Select.Option.Addon>}
                    <Select.Option.Text>{option.children}</Select.Option.Text>
                    {showOptionRightAddon && <Select.Option.Addon><LinkExternalM /></Select.Option.Addon>}
                  </Select.Option>
                ))}
              </Select.Menu>
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
