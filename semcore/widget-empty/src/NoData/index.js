import React from 'react';
import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import pt from './translations/pt.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';
import ko from './translations/ko.json';
import vi from './translations/vi.json';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

class NoData extends Component {
  static displayName = 'WidgetNoData';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n,
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
