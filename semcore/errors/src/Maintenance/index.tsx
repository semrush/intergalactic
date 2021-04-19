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
import ko from './translations/ko.json';
import vi from './translations/vi.json';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

export interface IMaintenanceProps extends IWithI18nEnhanceProps {
  /**
   * Tool name
   */
  toolName: string;
  /**
   * href of the link home
   * @default /
   */
  homeLink?: string;
}

class RootMaintenance extends Component<IMaintenanceProps> {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n,
    homeLink: '/',
    icon: getIconPath('maintenance'),
  };

  render() {
    const { Root } = this;
    const { Children, getI18nText, homeLink, toolName } = this.asProps;
    const { title, text, btnHome } = getI18nText();
    return (
      <Root render={Error}>
        <Error.Title>{`${toolName} ${title}`}</Error.Title>
        <Error.Description>{text}</Error.Description>
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

export default createComponent<Merge<IMaintenanceProps, ComponentProps<typeof Error>>>(
  RootMaintenance,
);
