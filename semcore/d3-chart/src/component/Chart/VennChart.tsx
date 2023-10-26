import React from 'react';
import createComponent from '@semcore/core';
import { BaseChartProps, ChartMap } from './AbstractChart.type';
import { scaleLinear } from 'd3-scale';
// @ts-ignore
import { Venn } from '../..';
import { AbstractChart } from './AbstractChart';
import { Text } from '@semcore/typography';
import { VennChartData, VennChartProps } from './VennChart.type';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';

class VennChartComponent extends AbstractChart<VennChartData, VennChartProps> {
  static displayName = 'Chart.Venn';

  static defaultProps: Partial<BaseChartProps<VennChartData>> = {
    direction: 'row-reverse',
    alignItems: 'center',
    marginY: 0,
    marginX: 0,
  };

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

  protected get legendKeys(): string[] {
    const { data, groupKey } = this.props;

    const legendKeys: string[] = Object.keys(data).filter((item) => {
      const isIntersection = /\//.test(item);

      return !isIntersection;
    });

    return legendKeys;
  }

  defaultLegendProps() {
    return {
      legendType: 'Table' as const,
    };
  }

  renderChart() {
    const { data } = this.asProps;
    const { legendItems, highlightedLine } = this.state;

    const checkedLegendItems = legendItems.filter((item) => item.checked);
    const checkedLegendItemsMap = checkedLegendItems.reduce<Record<string, LegendItem>>(
      (result, item) => {
        result[item.id] = item;

        return result;
      },
      {},
    );

    const intersections = Object.keys(data).reduce<string[]>((result, dataKey) => {
      const isIntersection = /\//.test(dataKey);

      if (isIntersection) {
        result.push(dataKey);
      }

      return result;
    }, []);

    return (
      <Venn>
        {checkedLegendItems.map((item, index) => {
          return (
            <Venn.Circle
              key={item.id}
              dataKey={item.id}
              name={item.label}
              color={item.color}
              transparent={highlightedLine !== -1 && highlightedLine !== index}
            />
          );
        })}

        {intersections.map((intersectionKey) => {
          const intersectionKeys = intersectionKey.split('/');

          const hasDisabledItems = intersectionKeys.some((key) => {
            return checkedLegendItemsMap[key] === undefined;
          });

          if (hasDisabledItems) {
            return null;
          }

          const name = intersectionKeys
            .map((id) => {
              return legendItems.find((legendItem) => legendItem.id === id)?.label || '';
            })
            .join(' & ');

          return <Venn.Intersection key={intersectionKey} dataKey={intersectionKey} name={name} />;
        })}
      </Venn>
    );
  }

  renderTooltip() {
    return (
      <Venn.Tooltip>
        {({ name, dataKey, data }: any) => {
          return {
            children: (
              <>
                <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                <Text bold>{data[dataKey]}</Text>
              </>
            ),
          };
        }}
      </Venn.Tooltip>
    );
  }
}

export const VennChart: ChartMap['Venn'] = createComponent(VennChartComponent);
