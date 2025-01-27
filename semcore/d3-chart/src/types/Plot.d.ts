import type { BoxProps } from '@semcore/flex-box';
import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { Context } from './context';
import type { DataStructureHints } from './a11y/hints';
import type { PatternsConfig } from './Pattern';
import type { PlotEventEmitter } from './utils';

/** @deprecated */
export interface IPlotProps extends PlotProps, UnknownProperties {}
export type PlotProps = Context &
  BoxProps & {
    /** Width of the svg element
     * @default 0*/
    width?: number;
    /** Height of the svg element
     * @default 0*/
    height?: number;
    /** Human readable chart name (e.g "Last market trends") */
    label?: string;
    /**
     * Locale for displaying the days of a week and months, to be transferred to `Intl`
     * @default en
     * */
    locale?: NavigatorLanguage['language'];
    /**
     * Optional container for data hints (use it if you have a legend component upper in tree)
     */
    dataHints?: DataStructureHints;
    /** Optional prop to tune up alt text generating for charts */
    a11yAltTextConfig?: PlotSummarizerConfig;

    /** Enables charts patterns that enhances charts accessibility */
    patterns?: PatternsConfig;

    eventEmitter?: InstanceType<typeof PlotEventEmitter>;
  };

export type PlotSummarizerConfig = {
  /** Totally disable automatic data summarization */
  disable?: boolean;
  /** Disable automatic data summarization and use provided text */
  override?: string;
  /** Tuning up time series trends analyzing. Represents angle tangens of time series change of different strength */
  trendTangens?: {
    /** Angle tangens of time series that have meaningful trending change
     * @default 1/15
     */
    static?: number;
    /** Angle tangens of time series that have weak trending change
     * @default 1/10
     */
    weak?: number;
    /** Angle tangens of time series that have medium trending change
     * @default 1/5
     */
    medium?: number;
    /** Angle tangens of time series that have strong trending change
     * @default Infinity
     */
    strong?: number;
  };
  /** Tuning up time series local trends detection based on moving averages */
  movingAverage?: {
    /** Frame size of long moving average
     * @default Math.sqrt(data.length)
     */
    longSize?: number;
    /** Frame size of short moving average
     * @default Math.sqrt(data.length)/2
     */
    shortSize?: number;
    /** Absolute difference between values on moving averages crossing to
     * be handled as local trend change.
     * @default StandardDeviation/10
     */
    notableDiff?: number;
  };
  /** The way data to be interpreted as. By default is based on used used Plot elements and data structure.
   */
  dataType?: 'time-series' | 'points-cloud' | 'values-set';
  /** Grid size to split data of point clouds into clusters.
   */
  clustersGridSize?: number;
  /** Limits some output lists in chart alt text
   * @default 100
   * **/
  maxListSymbols?: number;
  /** Always add time to dates in chart alt text **/
  datesWithTime?: boolean;
  /** Described clusters count before text "and X more"
   * @default false
   * **/
  clustersLimit?: number;
  /** Described values count before text "and X more"
   * @default false
   * **/
  valuesLimit?: number;
  /** Described grouped value groups count before text "and X more"
   * @default false
   * **/
  groupsLimit?: number;
  /** Additional field for extra text description to the data
   * **/
  additionalFields?: string[];
  /** Allows to format titles (e.g. axes) in alt text and data table */
  titlesFormatter?: (key: string | number | null) => string | undefined;
  /** Allows to format values in alt text and data table */
  valuesFormatter?: (value: unknown, key: string | number | null) => string | undefined;
};

/** @deprecated */
export type MapProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?:
    | ((props: Props & Ctx, handlers: UCProps) => Props | React.PropsWithChildren)
    | React.ReactNode;
};

export type IntergalacticD3Component<BaseTag extends Intergalactic.Tag, Props, Context = {}> = (<
  Tag extends Intergalactic.Tag = BaseTag,
>(
  props: Intergalactic.InternalTypings.PropsRenderingResultComponentProps<Tag, Props, Context>,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<BaseTag, BaseTag, Props>;

declare const Plot: IntergalacticD3Component<'svg', PlotProps, Context>;
export default Plot;
