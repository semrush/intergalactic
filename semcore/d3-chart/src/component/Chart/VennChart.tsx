import React from 'react';
import { createComponent } from '@semcore/core';
import { BaseChartProps } from './AbstractChart.type';
import { scaleLinear } from 'd3-scale';
// @ts-ignore
import { Venn } from '../..';
import { AbstractChart } from './AbstractChart';
import { Text } from '@semcore/typography';
import { VennChartData, VennChartProps, VennChartType } from './VennChart.type';
import { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class VennChartComponent extends AbstractChart<
  VennChartData,
  VennChartProps,
  typeof VennChartComponent.enhance
> {
  static displayName = 'Chart.Venn';

  static defaultProps: Partial<BaseChartProps<VennChartData>> = {
    direction: 'row-reverse',
    alignItems: 'flex-start',
    marginY: 0,
    marginX: 0,
  };

  static enhance = [i18nEnhance(localizedMessages)] as const;

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

  protected get dataKeys(): string[] {
    const { data } = this.props;

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
    const { dataDefinitions, highlightedLine } = this.state;

    const checkedLegendItems = dataDefinitions.filter((item) => item.checked);
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
              return dataDefinitions.find((legendItem) => legendItem.id === id)?.label || '';
            })
            .join(' & ');

          return <Venn.Intersection key={intersectionKey} dataKey={intersectionKey} name={name} />;
        })}
      </Venn>
    );
  }

  renderTooltip() {
    const { showTooltip } = this.asProps;

    if (!showTooltip) {
      return null;
    }

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

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Venn' });
  }
}

export const VennChart: VennChartType = createComponent(VennChartComponent);
