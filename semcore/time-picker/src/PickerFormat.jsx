import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

class TimePickerFormat extends Component {
  static enhance = [keyboardFocusEnhance(), uniqueIDEnhancement()];

  render() {
    const SPickerFormat = Root;
    const { Children, meridiem, styles, getI18nText, uid } = this.asProps;
    const SPickerFormatText = 'span';

    return sstyled(styles)(
      <>
        <SPickerFormat render={Box} type='button' tag='button' aria-describedby={`${uid}_describe`}>
          {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
        </SPickerFormat>
        <ScreenReaderOnly role={'status'} aria-live={'polite'}>
          {getI18nText('changedFormatNotice', { meridiem })}
        </ScreenReaderOnly>
        <ScreenReaderOnly aria-hidden={'true'} id={`${uid}_describe`}>
          {getI18nText('formatToggler')}
        </ScreenReaderOnly>
      </>,
    );
  }
}

export default TimePickerFormat;
