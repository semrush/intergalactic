import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import { bisector } from 'd3-array';
import React from 'react';

import type { AbstractAxisChartProps } from './AbstractAxisChart.type';
import type { ChartState } from './AbstractChart';
import { AbstractChart } from './AbstractChart';
import type { ListData } from './AbstractChart.type';
// @ts-ignore
import { Plot } from '../../..';
import { invert, scaleOfBandwidth } from '../../../utils';
import { XAxis } from '../../Axis/XAxis';
import { YAxis } from '../../Axis/YAxis';
import { Grid } from '../../Grid/Grid';
import { HoverLine } from '../../Hover/HoverLine';

export abstract class AbstractAxisChart<
  Data extends ListData,
  Props extends AbstractAxisChartProps<Data>,
  Enhancers extends readonly ((...args: any[]) => any)[] = [],
  InnerProps = {},
  State extends ChartState = ChartState,
  DefaultProps extends Intergalactic.InternalTypings.ValidDefaultProps<DefaultProps, Props & InnerProps> = never,
> extends AbstractChart<Data, Props, Enhancers, InnerProps, State, DefaultProps> {
  protected xAxisRef = React.createRef<HTMLDivElement>();
  protected yLeftAxisRef = React.createRef<HTMLDivElement>();
  protected yRightAxisRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.axisValueFormatter = this.axisValueFormatter.bind(this);
    this.handleMouseMoveChartContainer = this.handleMouseMoveChartContainer.bind(this);
    this.handleMouseLeaveChartContainer = this.handleMouseLeaveChartContainer.bind(this);
    this.preventPlotMoveEvents = this.preventPlotMoveEvents.bind(this);
  }

  protected get xTicks(): number[] | Date[] | undefined {
    const { invertAxis, xTicksCount, yTicksCount } = this.asProps;

    const scale = this.xScale;

    if ('ticks' in scale) {
      if (invertAxis && yTicksCount) {
        return scale.ticks(yTicksCount);
      } else if (xTicksCount) {
        return scale.ticks(xTicksCount);
      }

      return undefined;
    }

    return undefined;
  }

  protected get yTicks(): number[] | Date[] | undefined {
    const { invertAxis, xTicksCount, yTicksCount } = this.asProps;

    const scale = this.yScale;

    if ('ticks' in scale) {
      if (invertAxis && xTicksCount) {
        return scale.ticks(xTicksCount);
      } else if (yTicksCount) {
        return scale.ticks(yTicksCount);
      }

      return undefined;
    }

    return undefined;
  }

  protected axisValueFormatter(value?: unknown): string {
    const { locale } = this.asProps;

    if (value instanceof Date) {
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
      }).format(value);
    }

    return this.valueFormatter(value);
  }

  protected renderXAxisLine() {
    const {
      showXAxis,
      styles,
    } = this.asProps;

    if (showXAxis === false) {
      return null;
    }

    const SXAxis = 'line';
    const xRange = this.xScale.range();
    const yRange = this.yScale.range();

    return sstyled(styles)(
      <SXAxis
        x1={xRange[0]}
        x2={xRange[1]}
        y1={yRange[0]}
        y2={yRange[0]}
      />,
    );
  }

  protected renderGrid(): React.ReactNode {
    const {
      showYAxis,
      groupKey,
      styles,
    } = this.asProps;

    const yTicks = this.yTicks;

    return sstyled(styles)(
      <>
        {showYAxis && (
          <Grid scale={[this.xScale, this.yScale]} orientation='horizontal' dataHintsHandler={this.dataHintsHandlers} ticksCount={yTicks?.length} />
        )}
        {this.renderXAxisLine()}
        <HoverLine
          data={this.data}
          scale={[this.xScale, this.yScale]}
          eventEmitter={this.eventEmitter}
          keyX={groupKey}
        />
      </>,
    );
  }

  protected renderYAxis(yAxisPosition: 'left' | 'right'): React.ReactNode {
    const { yTicksCount, showYAxis, axisYValueFormatter, groupKey } = this.asProps;

    if (!showYAxis || !groupKey) {
      return null;
    }

    return (
      <YAxis
        ref={yAxisPosition === 'left' ? this.yLeftAxisRef : this.yRightAxisRef}
        data={this.data}
        dataKey={groupKey}
        plotWidth={this.plotWidth}
        plotHeight={this.plotHeight}
        scale={this.yScale}
        ticksCount={yTicksCount}
        valueFormatter={axisYValueFormatter ?? this.axisValueFormatter}
        yAxisPosition={yAxisPosition}
        eventEmitter={this.eventEmitter}
        onMouseMove={() => false}
      />
    );
  }

  protected renderXAxis(): React.ReactNode {
    const { xTicksCount, showXAxis, axisXValueFormatter, groupKey } = this.asProps;

    if (!showXAxis || !groupKey) {
      return null;
    }

    return (
      <XAxis
        ref={this.xAxisRef}
        data={this.data}
        dataKey={groupKey}
        plotWidth={this.plotWidth}
        plotHeight={this.plotHeight}
        scale={this.xScale}
        ticksCount={xTicksCount}
        valueFormatter={axisXValueFormatter ?? this.axisValueFormatter}
        eventEmitter={this.eventEmitter}
      />
    );
  }

  public override render() {
    const SChart = Root;
    const SChartContainer = Box;
    const { styles, patterns, a11yAltTextConfig, duration, showTooltip, locale, yAxisPosition = 'left', showYAxis } = this.asProps;
    const { plotWidth, plotHeight } = this;

    const resolvedYAxisPosition = showYAxis !== true ? undefined : yAxisPosition;

    const { extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <SChart render={Flex} gap={5} __excludeProps={['data']} role='group' ref={this.chartRef}>
        {this.renderLegend()}
        <SChartContainer
          onMouseMove={this.handleMouseMoveChartContainer}
          onMouseLeave={this.handleMouseLeaveChartContainer}
          // @ts-expect-error for css only
          yAxisPosition={resolvedYAxisPosition}
        >
          {this.renderXAxis()}
          {(resolvedYAxisPosition === 'left' || resolvedYAxisPosition === 'both') && this.renderYAxis('left')}
          <Plot
            uid={this.plotId}
            data={this.data}
            scale={[this.xScale, this.yScale]}
            width={plotWidth}
            height={plotHeight}
            dataHints={this.dataHints}
            dataHintsHandlers={this.dataHintsHandlers}
            a11yAltTextConfig={a11yAltTextConfig}
            patterns={patterns}
            duration={duration}
            eventEmitter={this.eventEmitter}
            locale={locale}
            {...extractedAriaProps}
            ref={this.plotRef}
            onMouseMove={this.preventPlotMoveEvents}
            onMouseLeave={this.preventPlotMoveEvents}
          >
            {this.renderGrid()}
            {this.renderReference()}
            {!showTooltip ? null : this.renderTooltip()}
            {this.renderChart()}
          </Plot>
          {(resolvedYAxisPosition === 'right' || resolvedYAxisPosition === 'both') && this.renderYAxis('right')}
        </SChartContainer>
      </SChart>,
    );
  }

  protected handleMouseMoveChartContainer(event: React.MouseEvent<HTMLElement | SVGElement>) {
    const target = event.target;
    const plotElement = this.plotRef.current;

    if (!plotElement || !(target instanceof Element)) {
      return;
    }

    const rect = plotElement.getBoundingClientRect();
    const point = [event.clientX - rect.left - target.clientLeft, event.clientY - rect.top - target.clientTop];

    if (hasParent(target, plotElement)) {
      const { invertAxis } = this.asProps;
      const value = invertAxis ? invert(this.yScale, point[1]) : invert(this.xScale, point[0]);
      const index = this.getIndexByValue(value);

      this.eventEmitter.emit(`hoverPosition`, point[0] + rect.x, event.clientY);
      this.eventEmitter.emit(`hoverListItem`, index, Boolean(invertAxis));
      this.eventEmitter.emit(`setTooltipVisible`, index !== -1);
    }

    this.eventEmitter.emit('onMouseMoveChart', event);
  };

  protected handleMouseLeaveChartContainer() {
    this.eventEmitter.emit('onMouseLeaveChart');
    this.eventEmitter.emit('leaveChart');
    this.eventEmitter.emit(`setTooltipVisible`, false);
  };

  protected preventPlotMoveEvents() {
    return false;
  };

  protected getIndexByValue(value: unknown): number {
    const { groupKey, invertAxis } = this.asProps;
    const scale = invertAxis ? this.yScale : this.xScale;

    if (!groupKey) {
      return -1;
    }

    if ('invert' in scale && typeof scale.invert === 'function') { // detect line chart
      const bisect = bisector((d: { [key: string]: number }) => d[groupKey]).center;
      // @ts-expect-error difficult to type it because of history  reasons
      return bisect(this.data, value);
    } else if ('step' in scale && typeof scale.step !== 'undefined') { // detect bar chart
      const index = this.data.findIndex((d) => {
        return d[groupKey] === value;
      });

      return index;
    }

    return -1;
  }
}
