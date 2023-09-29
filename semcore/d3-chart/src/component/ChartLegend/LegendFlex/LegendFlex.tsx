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
    const { onChangeTrendVisible, trendIsVisible, trendLabel } = this.asProps as TrendProps;

    return (
      <Checkbox
        checked={trendIsVisible}
        onChange={onChangeTrendVisible}
        theme={'gray-400'}
        label={trendLabel}
      />
    );
  }

  render() {
    const SLegendFlex = Root;
    const { styles, Children, direction, withTrend, suffix } = this.asProps;
    const orientation = direction === 'row' ? 'vertical' : 'horizontal';

    return sstyled(styles)(
      <SLegendFlex render={Flex}>
        {this.itemsAsList.map(({ id }) => {
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
