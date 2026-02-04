import { createComponent, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Divider from '@semcore/divider';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { scaleBand, scaleLinear } from 'd3-scale';
import React, { Fragment } from 'react';

import type { CigaretteChartData, CigaretteChartProps, CigaretteChartType } from './CigaretteChart.type';
// @ts-ignore
import { HoverRect, Plot } from '../..';
import { AbstractChart } from './AbstractChart';
// @ts-ignore
import AnimatedClipPath from '../../AnimatedClipPath';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import { interpolateValue, scaleToBand } from '../../utils';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import Cigarette from '../Cigarette/Cigarette';

const wMin = 2;

class CigaretteChartComponent extends AbstractChart<
  CigaretteChartData,
  CigaretteChartProps,
  typeof CigaretteChartComponent.enhance
> {
  static displayName = 'Cigarette.Bar';

  static defaultProps: any = (props: CigaretteChartProps) => {
    const invertAxis = props.invertAxis ?? true;
    return {
      invertAxis: invertAxis,
      showXAxis: false,
      showYAxis: false,
      showTooltip: true,
      showLegend: false,
      marginX: 0,
      marginY: 0,
      duration: 500,
      plotWidth: !invertAxis && !props.plotWidth ? 44 : props.plotWidth,
      plotHeight: invertAxis && !props.plotHeight ? 28 : props.plotHeight,
    };
  };

  static enhance = [
    resolveColorEnhance(),
    uniqueIDEnhancement(),
    i18nEnhance(localizedMessages),
  ] as const;

  protected override plotPadding = 0;

  private offset = 0;

  protected override resolveColor(id: string, index: number) {
    return this.props.colorMap?.[id] ?? `blue-${5 - index}00`;
  }

  protected override getDefaultDataDefinitions(): Array<
    LegendItem & { columns: React.ReactNode[] }
  > {
    const dataDefinitions = super.getDefaultDataDefinitions();

    return dataDefinitions.map((dataDef) => {
      dataDef.columns = dataDef.columns.slice(1);
      return dataDef;
    });
  }

  protected override defaultLegendProps() {
    return {
      legendType: 'Table' as const,
      w: 'fit-content',
    };
  }

  protected override percentValue(data: CigaretteChartData, key: string): string {
    const value = data[key];

    /*
      TODO: for some hictorical reasons we have to handle 'null' values as 0.
      Changing this behavior could cause BREAKING CHANGES.
      Leave it as it is.
    */
    if (value === null) {
      return '0%';
    }

    return super.percentValue(data, key);
  }

  get xScale() {
    const { invertAxis } = this.asProps;

    return invertAxis ? this.valueScale : this.categoryScale;
  }

  get yScale() {
    const { invertAxis } = this.asProps;

    return invertAxis ? this.categoryScale : this.valueScale;
  }

  renderChart() {
    const { invertAxis, data, uid, duration, patterns, plotHeight, plotWidth, onClick } =
      this.asProps;
    const { dataDefinitions, highlightedLine } = this.state;

    this.offset = 0;

    return (
      <>
        {(invertAxis ? dataDefinitions : [...dataDefinitions].reverse()).map((item, index) => {
          const value = data[item.id];

          if (!item.checked || value === interpolateValue || value === null) {
            return null;
          }

          const absWidth = Math.abs(
            this.valueScale(value) -
            Math.max(this.valueScale(this.valueScale.domain()[0]), this.valueScale(0)),
          );
          const height = scaleToBand(this.categoryScale).bandwidth() - 4;
          const width = value === 0 ? 0 : Math.max(absWidth, wMin * 2) - wMin;
          const y = 2;
          const x = index === 0 ? 0 : this.offset;
          const r = height < 28 ? 2 : 4;

          this.offset = this.offset + width + wMin;

          return (
            <Cigarette
              key={item.id}
              dataKey={item.id}
              index={index}
              y={invertAxis ? y : x}
              x={invertAxis ? x : y}
              width={invertAxis ? width : height}
              height={invertAxis ? height : width}
              uid={uid}
              hide={!item.checked}
              duration={duration}
              r={index === 0 || index === dataDefinitions.length - 1 ? r : 0}
              color={item.color}
              patterns={patterns}
              direction={invertAxis ? 'horizontal' : 'vertical'}
              onClick={onClick}
              hovered={
                highlightedLine === index ? true : highlightedLine === -1 ? undefined : false
              }
            />
          );
        })}

        <AnimatedClipPath
          aria-hidden
          duration={duration}
          id={uid}
          x='0'
          y='0'
          width={invertAxis ? 0 : plotWidth}
          height={invertAxis ? plotHeight : 0}
        />
      </>
    );
  }

  renderTooltip(): React.ReactNode {
    const { data, showTotalInTooltip, showTooltip, invertAxis, tooltipTitle, tooltipViewType, showPercentValueInTooltip } =
      this.asProps;
    const { dataDefinitions } = this.state;

    if (!showTooltip) {
      return null;
    }

    return (
      <HoverRect.Tooltip
        x={invertAxis ? '' : undefined}
        y={invertAxis ? undefined : ''}
        wMin={100}
        hideHoverLine={true}
      >
        {(tooltipProps: any) => {
          const dataKey = invertAxis ? tooltipProps.xIndex : tooltipProps.yIndex;

          let content: React.JSX.Element | null = null;

          if (tooltipViewType === 'single') {
            const item = dataDefinitions.find((dataDefItem) => dataDefItem.id === dataKey);

            if (!item) {
              return null;
            }

            content = (
              <>
                <HoverRect.Tooltip.Dot mr={2} color={item.color}>
                  {item.label}
                </HoverRect.Tooltip.Dot>
                { showPercentValueInTooltip && <Text textAlign='end' color='text-secondary'>{this.percentValue(data, dataKey)}</Text> }
                <Text textAlign='end' bold>{this.tooltipValueFormatter(data[dataKey])}</Text>
              </>
            );

            return {
              children: this.getTooltipChildren({
                title: tooltipTitle,
                Tooltip: HoverRect.Tooltip,
                content,
                dataItem: item,
                showTotal: false,
              }),
            };
          }

          content = (
            <>
              {dataDefinitions.map((item) => {
                const style = { opacity: item.id === dataKey ? 1 : 0.3 };

                return (
                  item.checked && (
                    <Fragment key={item.id}>
                      <HoverRect.Tooltip.Dot style={style} mr={2} color={item.color}>
                        {item.label}
                      </HoverRect.Tooltip.Dot>
                      { showPercentValueInTooltip && <Text style={style} textAlign='end' color='text-secondary'>{this.percentValue(data, item.id)}</Text> }
                      <Text style={style} textAlign='end' bold>{this.tooltipValueFormatter(data[item.id])}</Text>
                    </Fragment>
                  )
                );
              })}
            </>
          );

          return {
            children: this.getTooltipChildren({
              title: tooltipTitle,
              Tooltip: HoverRect.Tooltip,
              content,
              dataItem: data,
            }),
          };
        }}
      </HoverRect.Tooltip>
    );
  }

  renderHeader() {
    return this.asProps.header ?? null;
  }

  override render() {
    const SChart = Root;
    const { styles, plotWidth, plotHeight, data, patterns, invertAxis, a11yAltTextConfig } =
      this.asProps;

    const header = this.renderHeader();

    if (invertAxis) {
      return sstyled(styles)(
        <SChart render={Flex} gap={6} direction='column' __excludeProps={['onClick', 'data']}>
          <Flex direction='column'>
            {header}
            <Plot
              data={data}
              scale={[this.xScale, this.yScale]}
              width={plotWidth}
              height={plotHeight}
              dataHints={this.dataHints}
              patterns={patterns}
              a11yAltTextConfig={a11yAltTextConfig}
            >
              {this.renderTooltip()}
              {this.renderChart()}
            </Plot>
          </Flex>
          {this.renderLegend()}
        </SChart>,
      );
    }

    return sstyled(styles)(
      <SChart render={Flex} gap={6} __excludeProps={['onClick', 'data']}>
        <Plot
          data={data}
          scale={[this.xScale, this.yScale]}
          width={plotWidth}
          height={plotHeight}
          dataHints={this.dataHints}
          patterns={patterns}
          a11yAltTextConfig={a11yAltTextConfig}
        >
          {this.renderTooltip()}
          {this.renderChart()}
        </Plot>
        <Flex direction='column' gap={2}>
          {header && (
            <>
              <Box>{header}</Box>
              <Divider />
            </>
          )}
          {this.renderLegend()}
        </Flex>
      </SChart>,
    );
  }

  protected getLegendAriaLabel(): string {
    return this.asProps.getI18nText('legendForChart', { chartType: 'Cigarette' });
  }

  private get selectedData() {
    const { data } = this.asProps;
    const { dataDefinitions } = this.state;

    const result = new Map<string, number>();

    dataDefinitions.forEach((dataDefItem) => {
      const value = data[dataDefItem.id];
      if (dataDefItem.checked && value !== interpolateValue) {
        result.set(dataDefItem.id, value);
      }
    });

    return result;
  }

  private get categoryScale() {
    const { plotWidth, plotHeight, invertAxis } = this.asProps;

    const range = invertAxis ? [plotHeight, 0] : [0, plotWidth];

    return scaleBand<{}>([0], range);
  }

  private get valueScale() {
    const { plotWidth, plotHeight, invertAxis } = this.asProps;

    let max = 0;

    this.selectedData.forEach((value) => {
      max = max + value;
    });

    return scaleLinear()
      .range(invertAxis ? [0, plotWidth] : [plotHeight, 0])
      .domain([0, max]);
  }
}

export const CigaretteChart: CigaretteChartType = createComponent(CigaretteChartComponent);
