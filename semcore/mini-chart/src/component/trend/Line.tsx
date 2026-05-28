import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, assignProps, Root, sstyled } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import { Trend, type CommonTrendProps } from './Trend';
import style from '../skeleton/skeleton.shadow.css';

export type TrendLineProps = CommonTrendProps & {
  /**
   * List of values
   */
  data: number[];

  /**
   * Color of line
   */
  color?: string;

  /**
   * Color of last point in chart
   */
  lastPointColor?: string;

  /**
   * Radius for last point item
   */
  lastPointRadius?: number;
};

type TrendLineComponent = Intergalactic.Component<'svg', TrendLineProps, {}, typeof TrendLineRoot.enhance>;

type TrendLineDefaultProps = {
  animate: true;
};

class TrendLineRoot extends Trend<TrendLineProps, typeof TrendLineRoot.enhance, TrendLineDefaultProps> {
  static enhance = [resolveColorEnhance(), uniqueIDEnhancement()] as const;

  static style = style;

  static defaultProps = {
    animate: true,
  } as const;

  get defaultData(): number[] {
    return [15, 70, 20, 85, 20];
  }

  get lastPointRadius(): number {
    return this.asProps.lastPointRadius ?? 6;
  }

  get data(): number[] {
    const { data, loading } = this.asProps;

    if (loading) {
      return this.defaultData;
    }

    return data;
  }

  override get svgWidth(): number {
    return this.asProps.lastPointColor
      ? this.defaultWidth + this.lastPointRadius
      : this.defaultWidth;
  }

  override get svgHeight(): number {
    return this.asProps.lastPointColor
      ? this.defaultHeight + this.lastPointRadius
      : this.defaultHeight;
  }

  get color() {
    const { resolveColor, color = 'chart-palette-order-1', loading } = this.asProps;

    if (loading) {
      return resolveColor('skeleton-bg');
    }

    return resolveColor(color);
  }

  render() {
    const STrendLine = Root;
    const { uid, withArea, animate, lastPointColor, resolveColor, loading, styles } = this.asProps;

    const points: string[] = [];
    const length = this.data.length;
    const step = this.defaultWidth / (length - 1);

    for (let i = 0; i < length; i++) {
      points.push(`${step * i},${this.defaultHeight - this.data[i]}`);
    }
    const { __excludeProps, extractedAriaProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <STrendLine render={Box} ref={this.containerRef} __excludeProps={['data', ...__excludeProps]}>
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${this.svgWidth} ${this.svgHeight}`}
          role='img'
          {...extractedAriaProps}
        >
          <polyline
            points={points.join(' ')}
            stroke={this.color}
            strokeWidth='4'
            fill='none'
            clipPath={`url(#${uid})`}
          />
          {withArea && (
            <polyline
              points={`0,${this.defaultHeight} ${points.join(' ')} ${this.defaultWidth},${
                this.defaultHeight
              }`}
              fill={this.color}
              fillOpacity={0.2}
              clipPath={`url(#${uid})`}
            />
          )}
          {lastPointColor && !loading && (
            <circle
              cx={step * (length - 1)}
              cy={this.defaultHeight - this.data[length - 1]}
              r={this.lastPointRadius}
              fill={resolveColor(lastPointColor)}
              stroke={resolveColor('chart-grid-border')}
              strokeWidth={4}
              clipPath={`url(#${uid})`}
            />
          )}

          {animate && !loading && (
            <clipPath id={uid}>
              <rect x='0' y='0' width='100%' height='100%' fill='black'>
                <animate dur='500ms' attributeName='width' values='0;100%' />
              </rect>
            </clipPath>
          )}
        </svg>
      </STrendLine>,
    );
  }
}

export const TrendLine = createComponent<TrendLineComponent, typeof TrendLineRoot>(TrendLineRoot);

TrendLine.displayName = 'MiniChart.TrendLine';

export const TrendArea = createComponent<TrendLineComponent, typeof TrendLineRoot>(
  TrendLineRoot,
  {},
  {
    enhancements: [
      () => {
        return {
          wrapperProps: (props: TrendLineProps) => {
            return assignProps(props, { withArea: true });
          },
        };
      },
    ],
  },
);

TrendArea.displayName = 'MiniChart.TrendArea';
