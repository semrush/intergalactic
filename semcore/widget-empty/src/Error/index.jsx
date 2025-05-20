import React from 'react';
import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class Error extends Component {
  static displayName = 'WidgetError';
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };
  static enhance = [i18nEnhance(localizedMessages)];

  render() {
    const { Children, description, getI18nText } = this.asProps;

    return (
      <Root render={WidgetEmpty} icon={getIconPath('warning')}>
        <WidgetEmpty.Title>{getI18nText('title')}</WidgetEmpty.Title>
        <WidgetEmpty.Description>
          {description || getI18nText('description')}
        </WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

export default createComponent(Error);
