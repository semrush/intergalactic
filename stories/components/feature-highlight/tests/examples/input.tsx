import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { InputFH, BadgeFH } from '@semcore/ui/feature-highlight';
import type { NSInput } from '@semcore/ui/input';
import React from 'react';

export type InputFHAdvancedProps = NSInput.Props & {
  placeholder?: string;
  showBadge?: boolean;
  badgeText?: string;
  size?: 'm' | 'l';
  width?: number;
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  ariaLabel?: string;
};

const Demo = (props: InputFHAdvancedProps) => {
  const {
    placeholder = 'Your domain',
    showBadge = false,
    badgeText = 'AI powered',
    size = 'm',
    width = 250,
    disabled = false,
    state = undefined,
    ariaLabel = 'Highlighted input',
  } = props;

  return (
    <Flex direction='column' gap={4}>
      <InputFH w={width} disabled={disabled} size={size} state={state}>
        <InputFH.Addon />
        <InputFH.Value
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-describedby='input-aria-desc'
        />
        {showBadge && (
          <InputFH.Addon>
            <BadgeFH>{badgeText}</BadgeFH>
          </InputFH.Addon>
        )}
      </InputFH>
      <ScreenReaderOnly id='input-aria-desc'>Powered by AI</ScreenReaderOnly>
    </Flex>
  );
};

export const defaultProps: InputFHAdvancedProps = {
  placeholder: 'Your domain',
  showBadge: false,
  badgeText: 'AI powered',
  size: 'm',
  width: 250,
  disabled: false,
  state: undefined,
  ariaLabel: 'Highlighted input',
};

Demo.defaultProps = defaultProps;

export default Demo;
