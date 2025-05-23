import React from 'react';
import { createComponent, sstyled, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import style from './legend-flex.shadow.css';
import { LegendFlexType, LegendFlexProps, TrendProps } from './LegendFlex.type';
import { LegendItemComponent } from '../LegendItem/LegendItem';
import Divider from '@semcore/divider';
import Checkbox from '@semcore/checkbox';
import { BaseLegend } from '../BaseLegend';
import { localizedMessages } from '../../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class LegendFlexRoot extends BaseLegend<LegendFlexProps> {
  static displayName = 'LegendFlex';
  static style = style;

  static enhance = [i18nEnhance(localizedMessages)];

  static defaultProps = () => ({
    direction: 'row',
    children: <LegendFlex.LegendItem />,
  });

  renderTrend() {
    const { onTrendIsVisibleChange, trendIsVisible, trendLabel, size, getI18nText } = this
      .asProps as TrendProps & LegendFlexProps & { getI18nText: (s: string) => string };

    return (
      <Checkbox
        checked={trendIsVisible}
        onChange={onTrendIsVisibleChange}
        theme={'gray-400'}
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
      <SLegendFlex render={Flex} role={'group'}>
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

export const LegendFlex: LegendFlexType = createComponent(LegendFlexRoot, {
  LegendItem: LegendItemComponent,
});
