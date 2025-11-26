import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { SelectFH, BadgeFH } from '@semcore/ui/feature-highlight';
import type { SelectProps } from '@semcore/ui/select';
import React from 'react';

export type SelectFHAdvancedProps = SelectProps & {
  placeholder?: string;
  showBadge?: boolean;
  badgeText?: string;
  size?: 'm' | 'l';
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  option1?: string;
  option2?: string;
  option3?: string;
  ariaLabel?: string;
  width?: number;
};

const Demo = (props: SelectFHAdvancedProps) => {
  const {
    placeholder = 'Select option',
    showBadge = false,
    badgeText = 'AI-powered',
    size = 'm',
    disabled = false,
    state = undefined,
    option1 = 'One',
    option2 = 'Two',
    option3 = 'Three',
    ariaLabel = 'Highlighted select',
    width = 200,
  } = props;

  const [selectValue, setSelectValue] = React.useState('');

  return (
    <Flex direction='column' gap={4} alignItems='start'>
      <SelectFH
        onChange={setSelectValue}
        disabled={disabled}
        size={size}
        state={state}
      >
        <SelectFH.Trigger
          aria-label={ariaLabel}
          aria-describedby='select-aria-desc'
          wMax={width}
          wMin={width}
        >
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>
            {selectValue || placeholder}
          </SelectFH.Trigger.Text>
          {showBadge && (
            <SelectFH.Trigger.Addon ml={2}>
              <BadgeFH>{badgeText}</BadgeFH>
            </SelectFH.Trigger.Addon>
          )}
        </SelectFH.Trigger>
        <SelectFH.Menu>
          <SelectFH.Option value={option1}>{option1}</SelectFH.Option>
          <SelectFH.Option value={option2}>{option2}</SelectFH.Option>
          <SelectFH.Option value={option3}>{option3}</SelectFH.Option>
        </SelectFH.Menu>
      </SelectFH>
      <ScreenReaderOnly id='select-aria-desc'>Powered by AI</ScreenReaderOnly>
    </Flex>
  );
};

export const defaultProps: SelectFHAdvancedProps = {
  placeholder: 'Select option',
  showBadge: false,
  badgeText: 'AI-powered',
  size: 'm',
  disabled: false,
  state: undefined,
  option1: 'One',
  option2: 'Two',
  option3: 'Three',
  ariaLabel: 'Highlighted select',
  width: 200,
};

Demo.defaultProps = defaultProps;

export default Demo;
