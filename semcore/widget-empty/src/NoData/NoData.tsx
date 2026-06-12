import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import WidgetEmpty, { getIconPath } from '../WidgetEmpty';
import type { NSWidgetEmptyNoData } from './NoData.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class NoData extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSWidgetEmptyNoData.Component>,
  typeof NoData.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSWidgetEmptyNoData.DefaultProps
> {
  static displayName = 'WidgetNoData';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    type: 'other-data',
  } as const;

  render() {
    const { Children, type, description, getI18nText } = this.asProps;

    return (
      <Root render={WidgetEmpty} icon={getIconPath(type)}>
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
 * WidgetEmpty NoData
 *
 * {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-api/|API} | {@link https://developer.semrush.com/intergalactic/components/widget-empty/widget-empty-code/|Examples}
 */
export default createComponent<NSWidgetEmptyNoData.Component, typeof NoData>(NoData);
