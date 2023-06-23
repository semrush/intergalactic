import React from 'react';
import Button from '@semcore/button';
import createComponent, { Component } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import Error, { getIconPath } from '../Error';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootPageError extends Component {
  static displayName = 'PageError';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('page_error'),
  };

  handleReload = () => {
    if (canUseDOM()) {
      location.reload();
    }
  };

  render() {
    const { Children, getI18nText, onClick, ...other } = this.asProps;

    return (
      <Error {...other}>
        <Error.Title>{getI18nText('title')}</Error.Title>
        <Error.Description>{getI18nText('text')}</Error.Description>
        <Children />
        <Error.Controls>
          <Button
            onClick={callAllEventHandlers(onClick, this.handleReload)}
            size='l'
            use='primary'
            theme='info'
          >
            {getI18nText('btnRetry')}
          </Button>
        </Error.Controls>
      </Error>
    );
  }
}

export default createComponent(RootPageError);
