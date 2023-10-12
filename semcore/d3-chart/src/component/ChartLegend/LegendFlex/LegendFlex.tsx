import React from 'react';
import createComponent, { sstyled, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';

import style from './legend-flex.shadow.css';
import { LegendFlexType, LegendFlexProps, TrendProps } from './LegendFlex.type';
import { LegendItemComponent } from '../LegendItem/LegendItem';
import Divider from '@semcore/divider';
import Checkbox from '@semcore/checkbox';
import { BaseLegend } from '../BaseLegend';

class LegendFlexRoot extends BaseLegend<LegendFlexProps> {
  static displayName = 'LegendFlex';
  static style = style;

  static defaultProps = () => ({
    direction: 'row',
    children: (
      // @ts-ignore
      <LegendFlex.LegendItem />
    ),
  });

  renderTrend() {
    const { onTrendIsVisibleChange, trendIsVisible, trendLabel, size } = this
      .asProps as TrendProps & LegendFlexProps;

    return (
      <Checkbox
        checked={trendIsVisible}
        onChange={onTrendIsVisibleChange}
        theme={'gray-400'}
        label={trendLabel}
        size={size}
      />
    );
  }

  render() {
    const SLegendFlex = Root;
    const { styles, Children, direction, withTrend, suffix, items } = this.asProps;
    const orientation = direction === 'row' ? 'vertical' : 'horizontal';

    return sstyled(styles)(
      <SLegendFlex render={Flex}>
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
