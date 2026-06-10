import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import type { SelectProps } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type SelectAdvancedConfigProps = SelectProps & {
  // Main Select props
  size?: 'm' | 'l';
  labelText?: string;
  showLabel?: boolean;
  triggerPlaceholder?: string;
  visible?: boolean;
  disablePortal?: boolean;

  // Option 1 - Default option
  option1Value?: string | number;
  option1Text?: string;
  option1Disabled?: boolean;
  option1Selected?: boolean;

  // Option 2 - Checkbox option
  option2Value?: string | number;
  option2Text?: string;
  option2Disabled?: boolean;
  option2Selected?: boolean;
  option2ShowCheckbox?: boolean;
  option2CheckboxTheme?: string;
  option2CheckboxIndeterminate?: boolean;

  // Option 3 - Option with hint
  option3Value?: string | number;
  option3Text?: string;
  option3Disabled?: boolean;
  option3Selected?: boolean;
  option3ShowCheckbox?: boolean;
  option3CheckboxIndeterminate?: boolean;
  option3HintText?: string;

  // Option 4 - Simple option
  option4Value?: string | number;
  option4Text?: string;
  option4Disabled?: boolean;
  option4Selected?: boolean;

  // Group
  showGroup?: boolean;
  groupTitle?: string;
  groupSubTitle?: string;
  groupOption1Value?: string | number;
  groupOption1Text?: string;
  groupOption2Value?: string | number;
  groupOption2Text?: string;

  // Bulk options control
  disabledAll?: boolean;
};

const Demo = (props: SelectAdvancedConfigProps) => {
  const {
    labelText = 'Select with configurable options',
    showLabel = true,
    triggerPlaceholder = 'Select an option',
    size = 'm',
    disabled = undefined,
    state = undefined,
    visible = undefined,
    disablePortal = undefined,

    // Option 1
    option1Value = 1,
    option1Text = 'Default option',
    option1Disabled = false,
    option1Selected = false,

    // Option 2
    option2Value = 2,
    option2Text = 'Checkbox option',
    option2Disabled = false,
    option2Selected = false,
    option2ShowCheckbox = true,
    option2CheckboxTheme = undefined,
    option2CheckboxIndeterminate = false,

    // Option 3
    option3Value = 3,
    option3Text = 'Option with hint',
    option3Disabled = false,
    option3Selected = false,
    option3ShowCheckbox = true,
    option3CheckboxIndeterminate = true,
    option3HintText = 'This is a hint for the option',

    // Option 4
    option4Value = 4,
    option4Text = 'Simple option',
    option4Disabled = false,
    option4Selected = false,

    // Group
    showGroup = true,
    groupTitle = 'Group title',
    groupSubTitle = 'Group subtitle',
    groupOption1Value = 5,
    groupOption1Text = '1st option in group',
    groupOption2Value = 6,
    groupOption2Text = '2nd option in group',

    // Bulk control
    disabledAll = false,

    ...restProps
  } = props;

  return (
    <Flex direction='column'>
      {showLabel && (
        <Text tag='label' size={200} htmlFor='advanced-select'>
          {labelText}
        </Text>
      )}
      <Select
        size={size}
        disabled={disabled}
        state={state}
        visible={visible}
        disablePortal={disablePortal}
        {...restProps}
      >
        <Select.Trigger
          placeholder={triggerPlaceholder}
          mr='auto'
          mt={showLabel ? 2 : 0}
          id='advanced-select'
        />
        <Select.Menu hMax='none'>
          <Select.Option
            value={option1Value}
            disabled={disabledAll || option1Disabled}
            selected={option1Selected}
          >
            {option1Text}
          </Select.Option>

          <Select.Option
            value={option2Value}
            disabled={disabledAll || option2Disabled}
            selected={option2Selected}
          >
            {option2ShowCheckbox && (
              <Select.Option.Checkbox
                theme={option2CheckboxTheme}
                indeterminate={option2CheckboxIndeterminate}
                selected={option2Selected}
              />
            )}
            {option2Text}
          </Select.Option>

          <Select.Option
            value={option3Value}
            disabled={disabledAll || option3Disabled}
            selected={option3Selected}
          >
            <Select.Option.Content>
              {option3ShowCheckbox && (
                <Select.Option.Checkbox
                  indeterminate={option3CheckboxIndeterminate}
                  selected={option3Selected}
                />
              )}
              {option3Text}
            </Select.Option.Content>
            <Select.Option.Hint>{option3HintText}</Select.Option.Hint>
          </Select.Option>

          <Select.Option
            value={option4Value}
            disabled={disabledAll || option4Disabled}
            selected={option4Selected}
          >
            {option4Text}
          </Select.Option>

          {showGroup && (
            <Select.Group title={groupTitle} subTitle={groupSubTitle}>
              <Select.Option
                value={groupOption1Value}
                disabled={disabledAll}
              >
                {groupOption1Text}
              </Select.Option>
              <Select.Option
                value={groupOption2Value}
                disabled={disabledAll}
              >
                {groupOption2Text}
              </Select.Option>
            </Select.Group>
          )}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export const defaultProps: SelectAdvancedConfigProps = {
  labelText: 'Select with configurable options',
  showLabel: true,
  triggerPlaceholder: 'Select an option',
  size: 'm',
  disabled: undefined,
  state: undefined,

  // Option 1
  option1Value: 1,
  option1Text: 'Default option',
  option1Disabled: false,
  option1Selected: false,

  // Option 2
  option2Value: 2,
  option2Text: 'Checkbox option',
  option2Disabled: false,
  option2Selected: false,
  option2ShowCheckbox: true,
  option2CheckboxTheme: undefined,
  option2CheckboxIndeterminate: false,

  // Option 3
  option3Value: 3,
  option3Text: 'Option with hint',
  option3Disabled: false,
  option3Selected: false,
  option3ShowCheckbox: true,
  option3CheckboxIndeterminate: true,
  option3HintText: 'This is a hint for the option',

  // Option 4
  option4Value: 4,
  option4Text: 'Simple option',
  option4Disabled: false,
  option4Selected: false,

  // Group
  showGroup: true,
  groupTitle: 'Group title',
  groupSubTitle: 'Group subtitle',
  groupOption1Value: 5,
  groupOption1Text: '1st option in group',
  groupOption2Value: 6,
  groupOption2Text: '2nd option in group',
};

Demo.defaultProps = defaultProps;

export default Demo;
