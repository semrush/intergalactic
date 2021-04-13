import React from 'react';
import { Component, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export interface ITimePickerFormatProps extends IBoxProps, IKeyboardFocusProps {}

class TimePickerFormat extends Component<ITimePickerFormatProps> {
  static enhance = [keyboardFocusEnhance()];
  render() {
    const { Root: SPickerFormat } = this;
    const { Children, meridiem, size, disabled, styles, keyboardFocused } = this.asProps;
    const SPickerFormatText = 'span';

    return styled(styles)(
      <SPickerFormat
        render={Box}
        type="button"
        tag="button"
        size={size}
        disabled={disabled}
        keyboardFocused={keyboardFocused}
      >
        {Children.origin ? (
          <Children />
        ) : (
          <>
            <SPickerFormatText>{meridiem}</SPickerFormatText>
          </>
        )}
      </SPickerFormat>,
    );
  }
}

export default TimePickerFormat;
