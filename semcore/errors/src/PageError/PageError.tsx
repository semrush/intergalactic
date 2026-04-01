import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import Error, { getIconPath } from '../Error';
import type { PageErrorComponent } from './PageError.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
class RootPageError extends Component<
  Intergalactic.InternalTypings.InferComponentProps<PageErrorComponent>,
  typeof RootPageError.enhance
> {
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

    type A = typeof other['ref'];

    return (
      <Root render={Error} {...other}>
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
      </Root>
    );
  }
}

export default createComponent(RootPageError) as PageErrorComponent;
