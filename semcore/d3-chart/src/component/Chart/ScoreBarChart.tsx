import { Box, Flex } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { BaseLegendProps, ObjectData } from './AbstractChart.type';
import styles from './scoreBarChart.shadow.css';
import type {
  ScoreBarChartData,
  ScoreBarChartProps,
  ScoreBarChartType,
  ScoreBarChartDefaultProps,
} from './ScoreBarChart.type';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class ScoreBarChartComponent extends AbstractChart<
  ScoreBarChartData,
  ScoreBarChartProps,
  typeof ScoreBarChartComponent.enhance,
  {},
  ChartState,
  ScoreBarChartDefaultProps
> {
  static displayName = 'Chart.ScoreBar';
  public static defaultProps = {
    direction: 'column',
    showXAxis: false,
    showYAxis: false,
    showTooltip: true,
    showLegend: false,
    locale: 'en',
  } as const;

  static enhance = [i18nEnhance(localizedMessages)] as const;

  get xScale() {
    return this.asProps.xScale ?? this.valueScale;
  }

  get yScale() {
    return this.asProps.yScale ?? this.categoryScale;
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {};
  }

  override render() {
    const SChart = Root;
    const { x, y, invertAxis, data } = this.asProps;

    return sstyled(styles)(
      <SChart
        render={Box}
        __excludeProps={['data', 'eventEmitter']}
        ref={this.chartRef}
        direction='column'
        invertAxis={invertAxis}
      >
        {data.map((item) => {
          return this.renderItem(item);
        })}
      </SChart>,
    );
  }

  renderItem(item: ScoreBarChartData[number]) {
    const { x, y, onClickHoverRect, onClickBar, data, invertAxis } = this.asProps;
    const SItem = 'div';
    const SCategory = Text;
    const SPercent = Text;
    const SValue = Text;
    const SBar = 'div';
    const SBarValue = 'div';
    const SBarBackground = 'div';

    const percent = (100 * (item[x] / this.totalValue())).toFixed(0);
    const bg = 100 - percent;

    return sstyled(styles)(
      <SItem key={item[y]} invertAxis={invertAxis}>
        <SCategory>
          {item[y]}
        </SCategory>
        <SPercent use='secondary'>
          {percent}%
        </SPercent>
        <SValue>
          {item[x]}
        </SValue>
        <SBar invertAxis={invertAxis}>
          <SBarValue style={{ width: `${percent}%` }} />
          <SBarBackground style={{ width: `${bg}%` }} />
        </SBar>
      </SItem>,
    );
  }

  protected renderChart(): React.ReactNode {
    return null;
  }

  protected renderTooltip(): React.ReactNode {
    return null;
  }

  protected getLegendAriaLabel(): string {
    return '';
  }

  protected override totalValue(): number {
    const { totalValue } = this.asProps;

    return totalValue ?? [...super.flatValues.values()].reduce((acc, d) => acc + d, 0);
  }

  private get categoryScale() {
    const { marginY = 40, data, y } = this.asProps;
    const { plotHeight } = this;

    return scaleBand()
      .range([plotHeight - marginY, marginY])
      .domain([...data].reverse().map((d) => d[y]) as any)
      .paddingInner(0.6)
      .paddingOuter(0.2);
  }

  private get valueScale() {
    const { marginY = 0 } = this.asProps;
    const { plotWidth } = this;

    return scaleLinear().range([marginY, plotWidth]).domain([marginY, this.totalValue()]);
  }
}

/**
 * ScoreBarChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/???/|API} | {@link https://developer.semrush.com/intergalactic/data-display/???/|Examples}
 */
export const ScoreBarChart = createComponent<
  ScoreBarChartType,
  typeof ScoreBarChartComponent
>(
  ScoreBarChartComponent,
);
