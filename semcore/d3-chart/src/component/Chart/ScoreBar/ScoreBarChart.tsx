import { Box } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import colorResolverEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import type { ChartState } from '../AbstractChart';
import { AbstractChart } from '../AbstractChart';
import type { BaseLegendProps } from '../AbstractChart.type';
import style from './scoreBarChart.shadow.css';
import type {
  ScoreBarChartData,
  ScoreBarChartProps,
  ScoreBarChartType,
  ScoreBarChartDefaultProps, ScoreBarEvents,
} from './ScoreBarChart.type';
import { ScoreBarItem } from './ScoreBarItem';
// @ts-ignore
import { Tooltip } from '../../../';
import { localizedMessages } from '../../../translations/__intergalactic-dynamic-locales';

class ScoreBarChartComponent extends AbstractChart<
  ScoreBarChartData,
  ScoreBarChartProps,
  typeof ScoreBarChartComponent.enhance,
  {},
  ChartState,
  ScoreBarChartDefaultProps
> {
  static style = style;

  static displayName = 'Chart.ScoreBar';

  static defaultProps = {
    showTooltip: true,
    locale: 'en',
  } as const;

  static enhance = [
    i18nEnhance(localizedMessages),
    uniqueIDEnhancement(),
    colorResolverEnhance(),
    cssVariableEnhance({
      variable: '--intergalactic-duration-medium',
      fallback: '300',
      map: (value: string) => `${Number.parseInt(value)}`,
      prop: 'duration',
    }),
  ] as const;

  private readonly eventEmitter: EventEmitter<ScoreBarEvents>;

  constructor(props: ScoreBarChartProps) {
    super(props);

    this.eventEmitter = props.eventEmitter || new EventEmitter();
  }

  override render() {
    const SChart = Root;
    const { mode, data, styles, onClickItem, uid, duration, valueFormatter, titleFormatter, resolveColor, locale } = this.asProps;

    return sstyled(styles)(
      <SChart
        render={Box}
        tag='ul'
        __excludeProps={['data', 'eventEmitter']}
        ref={this.chartRef}
        mode={mode}
      >
        {data.map((item, index) => {
          const color = this.resolveColor(item.category);

          return (
            <ScoreBarItem
              key={item.category}
              onClick={onClickItem}
              index={index}
              item={item}
              totalValue={this.totalValue()}
              mode={mode}
              eventEmitter={this.eventEmitter}
              uid={uid}
              duration={duration}
              valueFormatter={valueFormatter ?? this.valueFormatter}
              titleFormatter={titleFormatter}
              locale={locale}
              color={resolveColor(color)}
            />
          );
        })}
        {this.renderTooltip()}
      </SChart>,
    );
  }

  protected override resolveColor(id: string) {
    return this.props.colorMap?.[id] ?? `chart-palette-order-1`;
  }

  protected renderTooltip(): React.ReactNode {
    const { data, uid, showTooltip } = this.asProps;

    if (showTooltip === false) {
      return null;
    }

    return (
      <Tooltip eventEmitter={this.eventEmitter} plotId={uid}>
        {({ index }: { index: number }) => {
          return {
            children: (
              <>
                <Tooltip.Title>
                  {data[index].category}
                </Tooltip.Title>

                <Tooltip.Dot>
                  {this.tooltipValueFormatter(data[index].value)}
                </Tooltip.Dot>
              </>
            ),
          };
        }}
      </Tooltip>
    );
  }

  protected override totalValue(): number {
    const { totalValue } = this.asProps;

    return totalValue ?? [...super.flatValues.values()].reduce((acc, d) => acc + d, 0);
  }

  /**
   * ===== not used; simply implementations of stubs for abstract methods
   */
  get xScale() {
    return scaleLinear();
  }

  get yScale() {
    return scaleLinear();
  }

  protected renderChart(): React.ReactNode {
    return null;
  }

  protected defaultLegendProps(): Partial<BaseLegendProps> {
    return {};
  }

  protected getLegendAriaLabel(): string {
    return '';
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
