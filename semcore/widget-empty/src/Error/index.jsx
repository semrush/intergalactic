import React from 'react';
import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class Error extends Component {
  static displayName = 'WidgetError';
  static defaultProps = {
    i18n: localizedMessages,
  };
  static enhance = [i18nEnhance()];

  render() {
    const { Children, description, getI18nText } = this.asProps;
    const { title, description: descriptionText } = getI18nText();

    return (
      <Root render={WidgetEmpty} icon={getIconPath('warning')}>
        <WidgetEmpty.Title>{title}</WidgetEmpty.Title>
        <WidgetEmpty.Description>{description || descriptionText}</WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

export default createComponent(Error);
