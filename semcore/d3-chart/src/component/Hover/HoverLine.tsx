import { Component, sstyled } from '@semcore/core';
import React from 'react';

import style from './hover.shadow.css';
import { HoveredTick } from './HoveredTick';
import type { HoverLineProps } from './HoverLine.type';
import createElement from '../../createElement';
import { scaleOfBandwidth } from '../../utils';

const STROKE_WIDTH = 1;
const NOTCH_WIDTH = 9;
const NOTCH_DELTA = NOTCH_WIDTH / 2 - STROKE_WIDTH / 4;

class HoverLineComponent extends Component<HoverLineProps> {
  static displayName = 'HoverLine';
  static style = style;

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  isEquals(a: number | Date, b: number | Date) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a === b;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    return false;
  }

  render() {
    const SHoverLine = this.Element;
    const { meta, xIndex, yIndex, styles, x, y, data, scale, dataHints, hideTickHover, formatValue } = this.asProps;
    const [xScale, yScale] = scale;
    const [xFormatValue, yFormatValue] = Array.isArray(formatValue) ? formatValue : [formatValue, formatValue];

    const xRange = xScale.range();
    const yRange = yScale.range();
    const xRawValue = xIndex !== null ? data[xIndex]?.[x] : undefined;
    const yRawValue = yIndex !== null ? data[yIndex]?.[y] : undefined;
    const xValue = typeof xRawValue === 'number' || xRawValue instanceof Date ? xRawValue : undefined;
    const yValue = typeof yRawValue === 'number' || yRawValue instanceof Date ? yRawValue : undefined;

    const x1 = xValue ? scaleOfBandwidth(xScale, xValue) : undefined;
    const y1 = yValue ? scaleOfBandwidth(yScale, yValue) : undefined;

    const xTicks = xScale.domain?.() ?? [];
    const yTicks = yScale.domain?.() ?? [];

    return sstyled(styles)(
      <>
        {xIndex !== null && typeof x1 === 'number'
          ? (
              <>
                <SHoverLine render='g' stroke-width={STROKE_WIDTH} aria-hidden>
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[0]} y2={yRange[0]} />
                  <line x1={x1} y1={yRange[0]} x2={x1} y2={yRange[1]} />
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[1]} y2={yRange[1]} />
                </SHoverLine>
                {!hideTickHover && xValue !== undefined && (
                  <HoveredTick
                    size={meta.getTicksSize('horizontal')}
                    position={meta.getTicksPosition('horizontal')}
                    tickFormatter={dataHints.titles.getHorizontalAxesTitle ?? xFormatValue}
                    value={xValue}
                    isFirstTick={this.isEquals(xValue, xTicks.at(0))}
                    isLastTick={this.isEquals(xValue, xTicks.at(-1))}
                    x={x1}
                    xRange={xRange}
                    yRange={yRange}
                  />
                )}
              </>
            )
          : null}
        {yIndex !== null && typeof y1 === 'number'
          ? (
              <>
                <SHoverLine render='g' stroke-width={STROKE_WIDTH} aria-hidden>
                  <line x1={xRange[0]} y1={y1 - NOTCH_DELTA} x2={xRange[0]} y2={y1 + NOTCH_DELTA} />
                  <line x1={xRange[0]} y1={y1} x2={xRange[1]} y2={y1} />
                  <line x1={xRange[1]} y1={y1 - NOTCH_DELTA} x2={xRange[1]} y2={y1 + NOTCH_DELTA} />
                </SHoverLine>
                {!hideTickHover && yValue !== undefined && (
                  <HoveredTick
                    size={meta.getTicksSize('vertical')}
                    position={meta.getTicksPosition('vertical')}
                    tickFormatter={dataHints.titles.getVerticalAxesTitle ?? yFormatValue}
                    value={yValue}
                    isFirstTick={this.isEquals(yValue, yTicks.at(0))}
                    isLastTick={this.isEquals(yValue, yTicks.at(-1))}
                    y={y1}
                    xRange={xRange}
                    yRange={yRange}
                  />
                )}
              </>
            )
          : null}
      </>,
    );
  }
}

export const HoverLine = createElement(HoverLineComponent);
