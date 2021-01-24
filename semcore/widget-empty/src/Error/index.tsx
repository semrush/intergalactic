import React, { HTMLAttributes } from 'react';
import WidgetEmpty, { getIconPath, IWidgetEmptyProps } from '../WidgetEmpty';
import createComponent, { Component, Merge } from '@semcore/core';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import pt from './translations/pt.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';

export interface IWidgetErrorProps extends IWidgetEmptyProps, IWithI18nEnhanceProps {
  /** Error description. If it is absent, use the local default one */
  description?: React.ReactNode;
}

class Error extends Component<IWidgetErrorProps> {
  static displayName = 'WidgetError';
  static defaultProps = {
    i18n: {
      de,
      en,
      es,
      fr,
      it,
      ja,
      pt,
      ru,
      zh,
    },
  };
  static enhance = [i18nEnhance()];

  render() {
    const Root = this.Root;
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

export default createComponent<Merge<IWidgetEmptyProps, HTMLAttributes<HTMLDivElement>>>(Error);
