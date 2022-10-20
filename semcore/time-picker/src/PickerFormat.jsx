import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

class TimePickerFormat extends Component {
  static enhance = [keyboardFocusEnhance()];
  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles } = this.asProps;
    const SPickerFormatText = 'span';

    const label = `Time format ${meridiem}`;

    return sstyled(styles)(
      <SPickerFormat render={Box} type="button" tag="button" role="switch" aria-label={label}>
        {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
      </SPickerFormat>,
    );
  }
}

export default TimePickerFormat;
