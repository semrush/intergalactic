import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import type { NSWidgetEmptyError } from './Error.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class Error extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSWidgetEmptyError.Component>,
  typeof Error.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSWidgetEmptyError.DefaultProps
> {
  static displayName = 'WidgetError';
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  static enhance = [i18nEnhance(localizedMessages)] as const;

  render() {
    const { Children, description, getI18nText } = this.asProps;

    return (
      <Root render={WidgetEmpty} icon={getIconPath('warning')}>
        <WidgetEmpty.Title>{getI18nText('title')}</WidgetEmpty.Title>
        <WidgetEmpty.Description>
          {description || getI18nText('description')}
        </WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

/**
 * WidgetEmpty Error
 *
 * {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-api#error|API} | {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-code/|Examples}
 */
export default createComponent<NSWidgetEmptyError.Component, typeof Error>(Error);
