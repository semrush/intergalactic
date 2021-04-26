import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export interface ITimePickerFormatProps extends IBoxProps, IKeyboardFocusProps {}

class TimePickerFormat extends Component<ITimePickerFormatProps> {
  static enhance = [keyboardFocusEnhance()];
  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles } = this.asProps;
    const SPickerFormatText = 'span';

    return sstyled(styles)(
      <SPickerFormat render={Box} type="button" tag="button">
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
