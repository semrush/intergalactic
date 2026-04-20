import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import Error, { getIconPath } from '../Error';
import type { NSMaintenance } from './Maintenance.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootMaintenance extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSMaintenance.Component>,
  typeof RootMaintenance.enhance
> {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    homeLink: '/',
    icon: getIconPath('maintenance'),
    titleTag: 'h2',
  };

  render() {
    const { Children, getI18nText, homeLink, toolName, titleTag } = this.asProps;

    return (
      <Root render={Error}>
        <Error.Title tag={titleTag}>{`${toolName} ${getI18nText('title')}`}</Error.Title>
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

export default createComponent(RootMaintenance) as NSMaintenance.Component;
