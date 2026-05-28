import { Flex } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { createComponent, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import Divider from '@semcore/divider';
import React from 'react';

import style from './legend-flex.shadow.css';
import type { LegendFlexType, LegendFlexProps, TrendProps, LegendFlexDefaultProps } from './LegendFlex.type';
import { localizedMessages } from '../../../translations/__intergalactic-dynamic-locales';
import { BaseLegend } from '../BaseLegend';
import { LegendItemComponent } from '../LegendItem/LegendItem';

class LegendFlexRoot extends BaseLegend<
  LegendFlexProps,
  typeof LegendFlexRoot.enhance,
  LegendFlexDefaultProps
> {
  static displayName = 'LegendFlex';
  static style = style;

  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = () => ({
    direction: 'row',
    children: <LegendFlex.LegendItem />,
  } as const);

  renderTrend() {
    const { onTrendIsVisibleChange, trendIsVisible, trendLabel, size, getI18nText } = this
      .asProps as unknown as TrendProps & LegendFlexProps & { getI18nText: (s: string) => string };

    return (
      <Checkbox
        checked={trendIsVisible}
        onChange={onTrendIsVisibleChange}
        theme='gray-400'
        label={trendLabel ?? getI18nText('trend')}
        size={size}
      />
    );
  }

  render() {
    const SLegendFlex = Root;
    const { styles, Children, direction, withTrend, suffix, items } = this.asProps;
    const orientation = direction === 'row' ? 'vertical' : 'horizontal';

    return sstyled(styles)(
      <SLegendFlex render={Flex} role='group'>
        {items.map(({ id }) => {
          return <Children key={id} />;
        })}
        {(withTrend || suffix) && <Divider orientation={orientation} />}
        {withTrend && this.renderTrend()}
        {suffix ? suffix : null}
      </SLegendFlex>,
    );
  }
}

export const LegendFlex = createComponent<
  LegendFlexType,
  typeof LegendFlexRoot
>(LegendFlexRoot, {
  LegendItem: LegendItemComponent,
});
