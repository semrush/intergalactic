import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

class TimePickerFormat extends Component {
  static enhance = [keyboardFocusEnhance(), uniqueIDEnhancement()];

  state = {
    ariaLabel: undefined,
  };

  handleClick = () => {
    if (this.ariaLabelTimer) {
      clearTimeout(this.ariaLabelTimer);
    }

    this.ariaLabelTimer = setTimeout(() => {
      const { meridiem, getI18nText } = this.asProps;
      this.setState({ ariaLabel: getI18nText('changedFormatNotice', { meridiem }) });
    }, 0);
  };

  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles, getI18nText, uid } = this.asProps;
    const SPickerFormatText = 'span';
    const describedby = getI18nText('formatToggler');
    const { ariaLabel } = this.state;

    return sstyled(styles)(
      <>
        <SPickerFormat
          render={Box}
          type='button'
          tag='button'
          aria-describedby={`${uid}_describe`}
          onClick={this.handleClick}
        >
          <ScreenReaderOnly role={'status'} aria-live={'polite'}>
            {ariaLabel}
          </ScreenReaderOnly>
          {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
          <ScreenReaderOnly aria-hidden={'true'} id={`${uid}_describe`}>
            {describedby}
          </ScreenReaderOnly>
        </SPickerFormat>
      </>,
    );
  }
}

export default TimePickerFormat;
