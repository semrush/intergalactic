import React from 'react';
import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class NoData extends Component {
  static displayName = 'WidgetNoData';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    type: 'other-data',
  };

  render() {
    const { Children, type, description, getI18nText } = this.asProps;

    return (
      <Root render={WidgetEmpty} icon={getIconPath(type)}>
        <WidgetEmpty.Title>{getI18nText('title')}</WidgetEmpty.Title>
        <WidgetEmpty.Description>
          {description || getI18nText('description')}
        </WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

export default createComponent(NoData);
