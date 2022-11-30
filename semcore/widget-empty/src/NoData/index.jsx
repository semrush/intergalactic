import React from 'react';
import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class NoData extends Component {
  static displayName = 'WidgetNoData';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n: localizedMessages,
    type: 'other-data',
  };

  render() {
    const { Children, type, description, getI18nText } = this.asProps;
    const { title, description: descriptionText } = getI18nText();
    return (
      <Root render={WidgetEmpty} icon={getIconPath(type)}>
        <WidgetEmpty.Title>{title}</WidgetEmpty.Title>
        <WidgetEmpty.Description>{description || descriptionText}</WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

export default createComponent(NoData);
