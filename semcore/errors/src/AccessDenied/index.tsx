import React, { ComponentProps } from 'react';
import Button from '@semcore/button';
import createComponent, { Component, Merge } from '@semcore/core';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import Error, { getIconPath } from '../Error';

import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import pt from './translations/pt.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';

export interface IAccessDeniedProps extends IWithI18nEnhanceProps {
  /**
   * href of the link home
   * @default /
   */
  homeLink?: string;
}

class RootAccessDenied extends Component<IAccessDeniedProps> {
  static displayName = 'AccessDenied';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    homeLink: '/',
    icon: getIconPath('access_denied'),
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

  render() {
    const { Root } = this;
    const { Children, getI18nText, homeLink } = this.asProps;
    const { title, text, btnHome } = getI18nText();
    return (
      <Root render={Error}>
        <Error.Title>{title}</Error.Title>
        <Error.Description wMax="640px">{text}</Error.Description>
        <Children />
        <Error.Controls>
          <Button tag="a" type="none" size="xl" use="primary" theme="info" href={homeLink}>
            {btnHome}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent<Merge<IAccessDeniedProps, ComponentProps<typeof Error>>>(
  RootAccessDenied,
);
