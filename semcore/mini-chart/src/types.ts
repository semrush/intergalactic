import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

declare namespace NSMiniChart {
  namespace Score {
    type CommonProps = {
      /**
       * Value of score (in percents from 0 to 100) or count of selected segments (for Line with segments)
       */
      value: number;

      /**
       * Color of value
       */
      color?: string;

      /**
       * Color of background
       */
      baseBgColor?: string;

      /**
       * Flag to enable skeleton
       * @default false
       */
      loading?: boolean;

      /**
       * Flag to enable animate of charts
       * @default true
       */
      animate?: boolean;
    };

    namespace Donut {
      type Props = NSBox.Props & NSMiniChart.Score.CommonProps;
      type DefaultProps = {
        animate: true;
      };

      type Component = Intergalactic.Component<'svg', Props>;
    }

    namespace Line {
      type Props = NSBox.Props &
        Intergalactic.InternalTypings.EfficientOmit<NSMiniChart.Score.CommonProps, 'value' | 'color'> &
        (
          | {
            /**
               * Value of score (in percents from 0 to 100) or count of selected segments (for Line with segments)
               */
            value: number;
            /**
               * Color of value
               */
            color?: NSMiniChart.Score.Line.Segment.Color;
            /**
               * Count of line segments
               */
            segments?: number;
            /**
               * We don't accept children in this way
               */
            children?: never;
          }
          | {
            value?: never;
            segments?: never;
            color?: never;
            children: React.ReactNode;
          }
        );
      type DefaultProps = {
        animate: true;
      };

      namespace Segment {
        type Color = `chart-palette-order-${Range<1, 24>}`;
        type Props = {
          value: number;
          /**
           * Color of value
           */
          color: NSMiniChart.Score.Line.Segment.Color;
        };

        type Component = Intergalactic.Component<NSBox.Component, Props>;
      }

      type Component = ((
        props: Props,
      ) => Intergalactic.InternalTypings.ComponentRenderingResults &
        Intergalactic.InternalTypings.ComponentAdditive<'svg', 'svg', Props>) & {
          Segment: Segment.Component;
        };
    }
  }

  namespace Trend {
    type CommonProps = NSBox.Props & {
      /**
       * Flag to enable animate of charts
       * @default true
       */
      animate?: boolean;

      /**
       * Flag to enable skeleton
       * @default false
       */
      loading?: boolean;

      /**
       * Data for chart
       */
      data: any[];
    };
    type CommonState = { width: number; height: number };

    namespace Line {
      type Props = NSMiniChart.Trend.CommonProps & {
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
      type DefaultProps = {
        animate: true;
      };

      type Component = Intergalactic.Component<'svg', Props>;
    }

    namespace Bar {
      type Item = {
        /**
         * Value
         */
        value: number;
        /**
         * Color of value
         */
        color?: string;
      };
      type Props = NSMiniChart.Trend.CommonProps & {
        /**
         * Data to bar chart
         */
        data: NSMiniChart.Trend.Bar.Item[];
      };
      type DefaultProps = {
        animate: true;
      };

      type Component = Intergalactic.Component<'svg', Props>;
    }
  }
}

export type { NSMiniChart };

/** @deprecated It will be removed in v19. */
export type SegmentColor = NSMiniChart.Score.Line.Segment.Color;
