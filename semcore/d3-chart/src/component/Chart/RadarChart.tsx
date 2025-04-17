import React from 'react';
import { createComponent } from '@semcore/core';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { AbstractChart } from './AbstractChart';
import { RadarChartData, RadarChartProps, RadarChartType } from './RadarChart.type';
// @ts-ignore
import { Radar } from '../..';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

class RadarChartComponent extends AbstractChart<
  RadarChartData,
  RadarChartProps,
  typeof RadarChartComponent.enhance
> {
  static enhance = [i18nEnhance(localizedMessages)] as const;

  protected renderChart(): React.ReactNode {
    const { groupKey, showDots, circle } = this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    return (
      <Radar scale={this.xScale} type={circle ? 'circle' : undefined}>
        <Radar.Axis dataKey={groupKey}>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        {this.renderRadarTooltip()}
        {dataDefinitions.map((item) => {
          return (
            item.checked && (
              <Radar.Polygon dataKey={item.id} key={item.id} color={item.color}>
                <Radar.Polygon.Line />
                {showDots && <Radar.Polygon.Dots />}
              </Radar.Polygon>
            )
          );
        })}
      </Radar>
    );
  }

  protected renderRadarTooltip(): React.ReactNode {
    const { data, groupKey, showTooltip } = this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <Radar.Tooltip wMin={100}>
        {({ index }: any) => {
          return {
            children: (
              <>
                <Radar.Tooltip.Title>{data[groupKey]?.[index]}</Radar.Tooltip.Title>

                {dataDefinitions.map((item) => {
                  const value = data[item.id]?.[index];

                  return (
                    item.checked && (
                      <Radar.Tooltip.Dot color={item.color} key={item.id}>
                        {this.tooltipValueFormatter(value)}
                      </Radar.Tooltip.Dot>
                    )
                  );
                })}
              </>
            ),
          };
        }}
      </Radar.Tooltip>
    );
  }

  // By default, tooltip will render in Plot component.
  // In RadarChart, we need to render it in Radar component, so we use renderRadarTooltip method
  protected renderTooltip(): React.ReactNode {
    return null;
  }

  protected get dataKeys(): string[] {
    const { data, groupKey } = this.props;

    const legendKeys: string[] = Object.keys(data).filter((key) => key !== groupKey);

    return legendKeys;
  }

  protected get xScale(): ScaleLinear<any, any> {
    return this.asProps.scale ?? scaleLinear().domain(this.domain);
  }

  protected get yScale(): ScaleLinear<any, any> {
    return this.asProps.scale ?? scaleLinear().domain(this.domain);
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Radar' });
  }

  private get domain(): [number, number] {
    return [Math.min(...super.flatValues), Math.max(...super.flatValues)];
  }
}

export const RadarChart: RadarChartType = createComponent(RadarChartComponent);
