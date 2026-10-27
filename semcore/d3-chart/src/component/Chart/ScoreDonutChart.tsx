import { Flex } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { Text } from '@semcore/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

// @ts-ignore
import { Donut, Plot } from '../..';
import type { ChartState } from './AbstractChart';
import { NOT_A_VALUE, AbstractChart } from './AbstractChart';
import type { ScoreDonutChartData, ScoreDonutChartDefaultProps, ScoreDonutChartProps, ScoreDonutChartType } from './ScoreDonutChart.type';
import { DefaultStrokePattern } from '../../Pattern';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import { interpolateValue } from '../../utils';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

class ScoreDonutChartComponent extends AbstractChart<
  ScoreDonutChartData,
  ScoreDonutChartProps,
  typeof ScoreDonutChartComponent.enhance,
  {},
  ChartState,
  ScoreDonutChartDefaultProps
> {
  static displayName = 'Chart.ScoreDonut';
  static defaultProps = {
    direction: 'row-reverse',
    alignItems: 'flex-start',
    marginX: 0,
    marginY: 0,
    locale: 'en',
  } as const;

  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()] as const;

  protected override getDefaultDataDefinitions(): Array<LegendItem & ({ columns: React.ReactNode[] } | { rows: React.ReactNode[] })> {
    const { data, legendProps } = this.props;

    const legendData = legendProps?.legendMap?.value;

    // @ts-expect-error will fill columns or rows later
    const dataDefinition: LegendItem & ({ columns: Array<React.ReactNode> } | { rows: Array<React.ReactNode> }) = {
      id: 'value',
      label: legendData?.label ?? 'value',
      icon: legendData?.icon ?? undefined,
      checked: legendData?.defaultChecked ?? true,
      color: this.resolveColor('value', 0),
    };

    if (legendData?.additionalInfo || legendData?.count) {
      dataDefinition.additionalInfo = legendData.additionalInfo
        ? { label: legendData.additionalInfo }
        : legendData.count
          ? { count: legendData.count }
          : undefined;
    }

    if (legendData && 'rows' in legendData && !('columns' in dataDefinition)) {
      dataDefinition.rows = legendData.rows || [];
    } else if (legendData && 'columns' in legendData && !('rows' in dataDefinition)) {
      dataDefinition.columns = legendData.columns || [];
    } else if (!('rows' in dataDefinition)) {
      const value = data.value;
      const percent = value.toFixed(2);

      dataDefinition.columns = [
        <Text key='percent' use='secondary'>
          {percent !== undefined ? `${percent}%` : ''}
        </Text>,
        <Text key='value' use='primary'>
          {value}
        </Text>,
      ];
    }

    return [dataDefinition];
  }

  get xScale() {
    const { xScale } = this.asProps;

    if (xScale) {
      return xScale;
    }

    return scaleLinear();
  }

  get yScale() {
    const { yScale } = this.asProps;

    if (yScale) {
      return yScale;
    }

    return scaleLinear();
  }

  defaultLegendProps() {
    return {
      legendType: 'Table' as const,
    };
  }

  renderChart() {
    const { innerRadius, halfsize, innerLabel, onClickPie, uid } = this.asProps;
    const { dataDefinitions, highlightedItem } = this.state;

    const checkedLegendItems = dataDefinitions.filter((item) => item.checked);

    return (
      <Donut onClick={onClickPie} halfsize={halfsize} innerRadius={innerRadius}>
        {checkedLegendItems.length === 0 && <Donut.EmptyData />}
        {checkedLegendItems.map((item, index) => {
          return (
            <Donut.Pie
              key={item.id}
              dataKey={item.id}
              name={item.label}
              color={item.color}
              active={highlightedItem === index}
            />
          );
        })}
        <DefaultStrokePattern id={`${uid}-mask`} halfsize={halfsize} />
        <Donut.Pie
          dataKey='other'
          color='chart-data-other-value'
          mask={`url(#${uid}-mask)`}
          uid={uid}
        />
        {innerLabel && <Donut.Label>{innerLabel}</Donut.Label>}
      </Donut>
    );
  }

  renderTooltip() {
    const { data } = this.asProps;
    const { dataDefinitions } = this.state;

    return (
      <Donut.Tooltip>
        {({ dataKey }: any) => {
          const title = dataDefinitions.find((item) => item.id === dataKey);

          if (!title) {
            return {
              visible: false,
            };
          }

          return {
            children: (
              <>
                <Donut.Tooltip.Title>{this.tooltipTitleFormatter(title?.label || dataKey)}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <Text bold>{this.tooltipValueFormatter(data.value)}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Donut.Tooltip>
    );
  }

  public override render() {
    const SChart = Root;
    const { styles, data, patterns, a11yAltTextConfig, duration, eventEmitter, showTooltip, locale } =
      this.asProps;
    const { plotWidth, plotHeight } = this;

    const { extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SChart render={Flex} gap={5} __excludeProps={['data', 'eventEmitter']} role='group' ref={this.chartRef}>
        {this.renderLegend()}
        <Plot
          data={this.data}
          scale={[this.xScale, this.yScale]}
          width={plotWidth}
          height={plotHeight}
          dataHints={this.dataHints}
          a11yAltTextConfig={a11yAltTextConfig}
          patterns={patterns}
          duration={duration}
          eventEmitter={eventEmitter}
          locale={locale}
          {...extractedAriaProps}
        >
          {this.renderAxis()}
          {!showTooltip ? null : this.renderTooltip()}
          {this.renderChart()}
        </Plot>
      </SChart>,
    );
  }

  private get data() {
    return {
      value: this.asProps.data.value,
      other: 100 - this.asProps.data.value,
    };
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'ScoreDonut' });
  }
}

/**
   * ScoreDonutChart
   *
   * {@link https://developer.semrush.com/intergalactic/data-display/score-donut-chart/score-donut-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/score-donut-chart/score-donut-chart-code/|Examples}
   */
export const ScoreDonutChart = createComponent<
  ScoreDonutChartType,
  typeof ScoreDonutChartComponent
>(ScoreDonutChartComponent);
