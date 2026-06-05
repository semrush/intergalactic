import { Box, Flex } from '@semcore/base-components';
import { createComponent, Root, sstyled } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Divider from '@semcore/divider';
import { Text } from '@semcore/typography';
import { scaleThreshold, scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import type { CigaretteChartData, CigaretteChartDataKey, CigaretteChartDefaultProps, CigaretteChartProps, CigaretteChartType } from './CigaretteChart.type';
// @ts-ignore
import { HoverRect, Plot } from '../..';
import type { ChartState } from './AbstractChart';
import { AbstractChart, NOT_A_VALUE } from './AbstractChart';
import type { ObjectData } from './AbstractChart.type';
// @ts-ignore
import AnimatedClipPath from '../../AnimatedClipPath';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import { eventToPoint, interpolateValue } from '../../utils';
import type { LegendItem } from '../ChartLegend/LegendItem/LegendItem.type';
import Cigarette from '../Cigarette/Cigarette';

const DEFAULT_MINIMAL_BAR_WIDTH = 2;
const DEFAULT_GAP = 2;

type ScaleThresholdConfig = { range: Array<CigaretteChartDataKey>; domain: Array<number> };

type CigaretteChartState = ChartState & {
  pX: number | null;
  pY: number | null;
};

class CigaretteChartComponent extends AbstractChart<
  CigaretteChartData,
  CigaretteChartProps,
  typeof CigaretteChartComponent.enhance,
  {},
  CigaretteChartState,
  CigaretteChartDefaultProps
> {
  static displayName = 'Cigarette.Bar';

  static defaultProps = (props: CigaretteChartProps) => {
    const invertAxis = props.invertAxis ?? true;
    return {
      invertAxis,
      showXAxis: false,
      showYAxis: false,
      showTooltip: true,
      showLegend: false,
      marginX: 0,
      marginY: 0,
      duration: 500,
      plotWidth: !invertAxis && !props.plotWidth ? 44 : props.plotWidth,
      plotHeight: invertAxis && !props.plotHeight ? 28 : props.plotHeight,
      showPercentValueInTooltip: false,
      minimalBarWidth: DEFAULT_MINIMAL_BAR_WIDTH,
    } as const;
  };

  static enhance = [
    resolveColorEnhance(),
    uniqueIDEnhancement(),
    i18nEnhance(localizedMessages),
  ] as const;

  constructor(props: CigaretteChartProps) {
    super(props);

    this.state = {
      ...this.state,
      pX: null,
      pY: null,
    };
  }

  private plotRef = React.createRef<SVGElement>();

  protected override plotPadding = 0;

  private offset = 0;

  private get activeDataDefinitions() {
    const { dataDefinitions } = this.state;

    return dataDefinitions.filter(({ checked }) => checked);
  }

  private get activePositiveDataDefinitions() {
    const { data } = this.asProps;

    return this.activeDataDefinitions.filter(({ id }) => {
      const itemValue = data[id];

      return typeof itemValue === 'number' && itemValue > 0;
    });
  }

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

  private onPlotMouseMove = trottle((event: React.MouseEvent<HTMLElement>) => {
    if (!this.plotRef.current) return;

    const [pX, pY] = eventToPoint(event, this.plotRef.current);

    this.setState(() => ({ pX, pY }));
  });

  private onPlotMouseLeave = trottle(() => {
    this.setState(() => ({ pX: null, pY: null }));
  });

  protected override totalValue() {
    const { data } = this.asProps;

    return this.activeDataDefinitions.reduce((acc, { id }) => {
      const itemValue = data[id];

      if (typeof itemValue === 'number') {
        acc += itemValue;
      }

      return acc;
    }, 0);
  }

  private computeCigaretteItems() {
    const { data, invertAxis, minimalBarWidth } = this.asProps;
    const { plotWidth, plotHeight } = this.state;

    const dataDefinitions = invertAxis
      ? this.activeDataDefinitions
      : [...this.activeDataDefinitions].reverse();

    const count = this.activePositiveDataDefinitions.length;
    const totalGapWidth = DEFAULT_GAP * Math.max(0, count - 1);
    const availableSpace = Math.max(0, (invertAxis ? plotWidth : plotHeight) - totalGapWidth);

    const totalValue = this.totalValue();

    const dataDefinitionsItemSize = dataDefinitions.map(({ id }) => {
      if (totalValue === 0) {
        return 0;
      }

      const itemValue = data[id];

      if (typeof itemValue !== 'number') return 0;

      return (itemValue / totalValue) * availableSpace;
    });

    const result = dataDefinitions.map((dd, index) => ({
      ...dd,
      value: data[dd.id],
      dataWidth: dataDefinitionsItemSize[index],
      visualWidth: dataDefinitionsItemSize[index],
      isMinVisible: false,
    }));

    const smallItems = result.filter((r) => {
      const { value, dataWidth } = r;

      if (typeof value !== 'number') return false;

      return value > 0 && dataWidth < minimalBarWidth;
    });

    if (smallItems.length === 0) return result;

    let extraNeeded = 0;

    for (const smallItem of smallItems) {
      extraNeeded += minimalBarWidth - smallItem.dataWidth;
      smallItem.visualWidth = minimalBarWidth;
      smallItem.isMinVisible = true;
    }

    const donors = result.filter((r) => !r.isMinVisible && r.dataWidth > minimalBarWidth);
    const donorCapacity = donors.reduce(
      (s, d) => s + (d.dataWidth - minimalBarWidth),
      0,
    );

    for (const donor of donors) {
      const available = donor.dataWidth - minimalBarWidth;
      const share = available / donorCapacity;
      const taken = share * extraNeeded;
      donor.visualWidth = donor.dataWidth - taken;
    }

    return result;
  };

  get xScale() {
    const { plotWidth } = this.state;

    return scaleLinear([0, plotWidth]);
  }

  get yScale() {
    const { plotHeight } = this.state;

    return scaleLinear([plotHeight, 0]);
  }

  renderChart() {
    const { invertAxis, data, uid, duration, patterns, onClick } =
      this.asProps;
    const { plotWidth, plotHeight } = this.state;
    const { dataDefinitions, highlightedLine } = this.state;

    this.offset = 0;

    const items = this.computeCigaretteItems();

    return (
      <>
        {items.map((item, index) => {
          const { visualWidth, id } = item;
          const value = data[id];

          if (value === interpolateValue || value === null) {
            return null;
          }

          const height = invertAxis ? plotHeight - DEFAULT_GAP * 2 : plotWidth - DEFAULT_GAP * 2;
          const width = visualWidth;
          const y = DEFAULT_GAP;
          const x = this.offset;
          const r = height < 28 ? 2 : 4;

          this.offset += visualWidth;

          if (index < items.length - 1) {
            this.offset += DEFAULT_GAP;
          }

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
    const { data, invertAxis, tooltipTitle, tooltipViewType, showPercentValueInTooltip, styles, showTooltip } =
      this.asProps;
    const { dataDefinitions, pX, pY } = this.state;
    const STooltipChildrenWrapper = Root;

    if (!showTooltip) {
      return null;
    }

    return (
      <HoverRect.Tooltip
        x={invertAxis ? '' : undefined}
        y={invertAxis ? undefined : ''}
        wMin={100}
        hideHoverLine={true}
        xIndex={pX !== null ? this.visualScale(pX) : undefined}
        yIndex={pY !== null ? this.visualScale(pY) : undefined}
      >
        {(tooltipProps: any) => {
          const dataKey = invertAxis ? tooltipProps.xIndex : tooltipProps.yIndex;
          const showPercentColumn = showPercentValueInTooltip && this.totalValue() !== 0;

          if (tooltipViewType === 'single') {
            const item = dataDefinitions.find((dataDefItem) => dataDefItem.id === dataKey);
            if (!item) {
              return {
                children: null,
              };
            }

            return {
              children: sstyled(styles)(
                <STooltipChildrenWrapper render={Box} columnsCount={showPercentColumn ? '3' : '2'} __excludeProps={['data']}>
                  <HoverRect.Tooltip.Dot mr={2} color={item.color}>
                    {item.label}
                  </HoverRect.Tooltip.Dot>
                  { showPercentColumn && <Text textAlign='end' color='text-secondary'>{this.percentValue(data, item.id)}</Text> }
                  <Text textAlign='end' bold>{this.tooltipValueFormatter(data[item.id])}</Text>
                </STooltipChildrenWrapper>,
              ),
            };
          }

          return {
            children: sstyled(styles)(
              <Flex direction='column'>
                {tooltipTitle && (
                  <HoverRect.Tooltip.Title>Some tooltip title</HoverRect.Tooltip.Title>
                )}

                <STooltipChildrenWrapper render={Box} columnsCount={showPercentColumn ? '3' : '2'} __excludeProps={['data']}>
                  {dataDefinitions.map((item) => {
                    const style = { opacity: item.id === dataKey ? 1 : 0.3 };
                    return (
                      item.checked && (
                        <React.Fragment key={item.id}>
                          <HoverRect.Tooltip.Dot mr={2} color={item.color} style={style}>
                            {item.label}
                          </HoverRect.Tooltip.Dot>
                          { showPercentColumn && <Text textAlign='end' color='text-secondary' style={style}>{this.percentValue(data, item.id)}</Text> }
                          <Text textAlign='end' bold style={style}>{this.tooltipValueFormatter(data[item.id])}</Text>
                        </React.Fragment>
                      )
                    );
                  })}

                  {this.renderTooltipTotalLine(data)}
                </STooltipChildrenWrapper>
              </Flex>,
            ),
          };
        }}
      </HoverRect.Tooltip>
    );
  }

  protected percentValue(data: ObjectData, key: string): string {
    const { percentFormatter } = this.asProps;

    const total = this.totalValue();

    const value = data[key];

    if (typeof value === 'number' && total !== 0) {
      const rawPercent = (100 * value) / total;
      const formattedPercent = percentFormatter ? percentFormatter(rawPercent) : Math.round(rawPercent);

      return `${formattedPercent}%`;
    }

    if (value === null) {
      return `0%`;
    }

    return NOT_A_VALUE;
  }

  protected override renderTooltipTotalLine<D extends ObjectData>(dataItem: D) {
    const { showTotalInTooltip, showPercentValueInTooltip } = this.asProps;

    if (!showTotalInTooltip) {
      return null;
    }

    const total = this.totalValue();

    return (
      <>
        <Box mt={2} mr={2}>Total</Box>
        { showPercentValueInTooltip && total !== 0 && <Text mt={2} textAlign='end' color='text-secondary'>{Number.isNaN(total) ? NOT_A_VALUE : '100%'}</Text> }
        <Text mt={2} textAlign='end' bold>{Number.isNaN(total) ? NOT_A_VALUE : total}</Text>
      </>
    );
  }

  renderHeader() {
    return this.asProps.header ?? null;
  }

  override render() {
    const SChart = Root;
    const { styles, data, patterns, invertAxis, a11yAltTextConfig } = this.asProps;
    const { plotWidth, plotHeight } = this.state;

    const header = this.renderHeader();

    if (invertAxis) {
      return sstyled(styles)(
        <SChart render={Flex} gap={6} direction='column' __excludeProps={['onClick', 'data']} ref={this.chartRef}>
          <Flex direction='column'>
            {header}
            <Plot
              ref={this.plotRef}
              data={data}
              scale={[this.xScale, this.yScale]}
              width={plotWidth}
              height={plotHeight}
              dataHints={this.dataHints}
              patterns={patterns}
              a11yAltTextConfig={a11yAltTextConfig}
              onMouseMove={this.onPlotMouseMove}
              onMouseLeave={this.onPlotMouseLeave}
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
      <SChart render={Flex} gap={6} __excludeProps={['onClick', 'data']} ref={this.chartRef}>
        <Plot
          ref={this.plotRef}
          data={data}
          scale={[this.xScale, this.yScale]}
          width={plotWidth}
          height={plotHeight}
          dataHints={this.dataHints}
          patterns={patterns}
          a11yAltTextConfig={a11yAltTextConfig}
          onMouseMove={this.onPlotMouseMove}
          onMouseLeave={this.onPlotMouseLeave}
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

  private get visualScale() {
    const cigaretteItems = this.computeCigaretteItems();

    const { range, domain } = cigaretteItems.reduce<ScaleThresholdConfig>((acc, { id, visualWidth }, index) => {
      const { range, domain } = acc;

      if (visualWidth) {
        range.push(id);

        if (domain.length === 0) {
          domain.push(visualWidth + DEFAULT_GAP);

          return acc;
        }

        if (index !== cigaretteItems.length - 1) {
          const lastAddedDomain = domain[domain.length - 1];
          domain.push(lastAddedDomain + visualWidth + DEFAULT_GAP);
        }
      }

      return acc;
    }, { range: [], domain: [] });

    return scaleThreshold(domain, range);
  }
}

/**
 * CigaretteChart
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/cigarette-chart/cigarette-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/cigarette-chart/cigarette-chart-code/|Examples}
 */
export const CigaretteChart = createComponent<
  CigaretteChartType,
  typeof CigaretteChartComponent
>(CigaretteChartComponent);
