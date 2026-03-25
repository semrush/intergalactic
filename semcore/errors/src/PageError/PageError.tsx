import Button from '@semcore/button';
import { createComponent, Component } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import Error, { getIconPath } from '../Error';
import type { PageErrorComponent, PageErrorProps } from './PageError.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootPageError extends Component<PageErrorProps, typeof RootPageError.enhance> {
  static displayName = 'PageError';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('page_error'),
    titleTag: 'h2',
  };

  handleReload = () => {
    if (canUseDOM()) {
      location.reload();
    }
  };

  render() {
    const { Children, getI18nText, onClick, titleTag, ...other } = this.asProps;

    return (
      <Error {...other}>
        <Error.Title tag={titleTag}>{getI18nText('title')}</Error.Title>
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

export default createComponent(RootPageError) as PageErrorComponent;
