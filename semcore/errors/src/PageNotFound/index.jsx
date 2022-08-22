import React from 'react';
import Button from '@semcore/button';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
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
import ko from './translations/ko.json';
import vi from './translations/vi.json';
import tr from './translations/tr.json';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi, tr };

class RootPageNotFound extends Component {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n,
    icon: getIconPath('page_not_found'),
    homeLink: '/',
  };

  render() {
    const { Children, getI18nText, homeLink } = this.asProps;
    const { title, text, btnHome } = getI18nText();
    return (
      <Root render={Error}>
        <Error.Title>{title}</Error.Title>
        <Error.Description>{text}</Error.Description>
        <Children />
        <Error.Controls>
          <Button tag="a" type="none" size="l" use="primary" theme="info" href={homeLink}>
            {btnHome}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent(RootPageNotFound);
