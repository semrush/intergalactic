import React from 'react';
import Button from '@semcore/button';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import Error, { getIconPath } from '../Error';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootPageNotFound extends Component {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('page_not_found'),
    homeLink: '/',
  };

  render() {
    const { Children, getI18nText, homeLink } = this.asProps;

    return (
      <Root render={Error}>
        <Error.Title>{getI18nText('title')}</Error.Title>
        <Error.Description>{getI18nText('text')}</Error.Description>
        <Children />
        <Error.Controls>
          <Button tag='a' type='none' size='l' use='primary' theme='info' href={homeLink}>
            {getI18nText('btnHome')}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent(RootPageNotFound);
