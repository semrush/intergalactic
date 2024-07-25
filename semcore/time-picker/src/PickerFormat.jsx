import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

class TimePickerFormat extends Component {
  static enhance = [keyboardFocusEnhance()];

  state = {
    ariaLabel: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.meridiem !== this.props.meridiem) {
      if (this.ariaLabelTimer) {
        clearTimeout(this.ariaLabelTimer);
      }

      const { meridiem, getI18nText } = this.asProps;
      this.setState({ ariaLabel: getI18nText('changedFormatNotice', { meridiem }) });
      this.ariaLabelTimer = setTimeout(() => {
        this.setState({ ariaLabel: undefined });
      }, 2000);
    }
  }

  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles, getI18nText } = this.asProps;
    const SPickerFormatText = 'span';
    const describedby = getI18nText('formatToggler');
    const { ariaLabel } = this.state;

    return sstyled(styles)(
      <SPickerFormat
        render={Box}
        type='button'
        tag='button'
        aria-describedby={describedby}
        aria-label={ariaLabel}
      >
        {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
      </SPickerFormat>,
    );
  }
}

export default TimePickerFormat;
