import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

class TimePickerFormat extends Component {
  static enhance = [keyboardFocusEnhance(), uniqueIDEnhancement()];

  state = {
    changedFormatNotice: '',
  };

  handleClick = () => {
    setTimeout(() => {
      const { meridiem, getI18nText } = this.asProps;
      this.setState({ changedFormatNotice: getI18nText('changedFormatNotice', { meridiem }) });
    }, 0);

    setTimeout(() => {
      this.setState({ changedFormatNotice: '' });
    }, 2000);
  };

  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles, getI18nText, uid } = this.asProps;
    const { changedFormatNotice } = this.state;
    const SPickerFormatText = 'span';

    return sstyled(styles)(
      <>
        <SPickerFormat
          render={Box}
          type='button'
          tag='button'
          onClick={this.handleClick}
          aria-describedby={`${uid}_describe`}
        >
          {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
        </SPickerFormat>
        {changedFormatNotice && (
          <ScreenReaderOnly role={'status'} aria-live={'polite'}>
            {changedFormatNotice}
          </ScreenReaderOnly>
        )}
        <ScreenReaderOnly aria-hidden={'true'} id={`${uid}_describe`}>
          {getI18nText('formatToggler')}
        </ScreenReaderOnly>
      </>,
    );
  }
}

export default TimePickerFormat;
