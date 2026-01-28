import { Box, ScreenReaderOnly } from '@semcore/base-components';
import { Component, sstyled, Root } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import style from './picker-format.shadow.css';
import type { TimePickerFormatProps, TimePickerFormatPropsInternal } from './PickerFormat.type';

class TimePickerFormat extends Component<TimePickerFormatProps, typeof TimePickerFormat.enhance, {}, TimePickerFormatPropsInternal> {
  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;

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
          tabIndex={0}
          onClick={this.handleClick}
          aria-describedby={`${uid}_describe`}
        >
          {Children.origin ? <Children /> : <SPickerFormatText>{meridiem}</SPickerFormatText>}
        </SPickerFormat>
        <ScreenReaderOnly role='status' aria-live='polite'>
          {changedFormatNotice}
        </ScreenReaderOnly>
        <ScreenReaderOnly aria-hidden='true' id={`${uid}_describe`}>
          {getI18nText('formatToggler')}
        </ScreenReaderOnly>
      </>,
    );
  }
}

export default TimePickerFormat;
