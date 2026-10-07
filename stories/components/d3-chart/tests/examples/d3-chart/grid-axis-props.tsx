import { Plot, Bar, HoverLine, HoverRect, Line, XAxis, YAxis } from '@semcore/ui/d3-chart';
import Link from '@semcore/ui/link';
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import React from 'react';

type BaseExampleProps = {
  // Plot
  /** Margin around the plot area. Small values shrink the tick box the labels are drawn in. */
  margin?: number;
  /** `band` renders categorical ticks, `time` renders Date ticks. */
  xScaleType?: 'band' | 'time';
  /**
   * What appears under the cursor: `line` is the vertical hover line with the highlighted tick,
   * `rect` is the highlighted column, `both` renders them together.
   */
  hoverType?: 'none' | 'line' | 'rect' | 'both';
  /** Hides the highlighted tick pill rendered by the hover. */
  hideTickHover?: boolean;

  // YAxis
  yPosition?: 'left' | 'right' | 'custom';
  /** Only for `yPosition='custom'`: the category the axis is pinned to. */
  yCustomPosition?: string;
  yHide?: boolean;
  yTicks?: number[];
  yTickSuffix?: string;
  // YAxis.Ticks
  yTicksHide?: boolean;
  yTicksMultiline?: boolean;
  yTicksPrimaryText?: boolean;
  // YAxis.Grid
  yShowGrid?: boolean;
  // YAxis.Title
  yShowTitle?: boolean;
  yTitle?: string;
  yTitlePosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Only takes effect while `yTitlePosition` is `left` or `right` — the CSS rule is scoped to those. */
  yVerticalWritingMode?: boolean;

  // XAxis
  xPosition?: 'top' | 'bottom' | 'custom';
  /** Only for `xPosition='custom'`: the Y value the axis is pinned to. */
  xCustomPosition?: number;
  xHide?: boolean;
  xCategories?: string[];
  // XAxis.Ticks
  xTicksHide?: boolean;
  xTicksMultiline?: boolean;
  xTicksPrimaryText?: boolean;
  /**
   * Hands `XAxis.Ticks` an empty `ticks` array. On a band scale the tick step still comes
   * from `step()`, on `time` it has to be derived from the tick count instead.
   */
  xTicksEmpty?: boolean;
  /**
   * Tick content. `link` turns every X value into a `Link`, which is what the widened
   * `axisXValueFormatter` return type (`React.ReactNode`) now allows.
   */
  xTicksRender?: 'default' | 'text' | 'link';
  // XAxis.Grid
  xShowGrid?: boolean;
  // XAxis.Title
  xShowTitle?: boolean;
  xTitle?: string;
  xTitlePosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Only takes effect while `xTitlePosition` is `left` or `right` — the CSS rule is scoped to those. */
  xVerticalWritingMode?: boolean;
};

const width = 520;
const height = 360;

const formatTickValue = (value: unknown) =>
  value instanceof Date
    ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(value)
    : String(value);

// Every X label becomes a link. The return type is annotated on purpose: `href` must never
// be anything but a string, otherwise `Link` throws on `value.startsWith`.
const tickHref = (value: unknown): string =>
  `https://developer.semrush.com/intergalactic/?tick=${encodeURIComponent(formatTickValue(value))}`;

const Demo = (props: BaseExampleProps) => {
  const MARGIN = props.margin ?? 80;
  const xScaleType = props.xScaleType ?? 'band';

  const yTicks = props.yTicks && props.yTicks.length > 0 ? props.yTicks : [0, 2.5, 5, 7.5, 10];
  const yMin = Math.min(...yTicks);
  const yMax = Math.max(...yTicks);

  const xCategories =
    props.xCategories && props.xCategories.length > 0
      ? props.xCategories
      : ['Cat Cat Cat 0', 'Cat Cat Cat 1', 'Cat Cat Cat 2', 'Cat Cat Cat 3', 'Cat Cat Cat 4'];

  const xDates = [new Date(2025, 8, 1), new Date(2025, 8, 15), new Date(2025, 8, 29)];

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([yMin, yMax]);

  const valueOf = (i: number) => yMin + (Math.sin(i / 2) * 0.5 + 0.5) * (yMax - yMin);

  const suffix = props.yTickSuffix ?? '';

  const yAxisPosition = props.yPosition === 'custom'
    ? (props.yCustomPosition ?? xCategories[0])
    : props.yPosition;

  const xAxisPosition = props.xPosition === 'custom'
    ? (props.xCustomPosition ?? yMin)
    : props.xPosition;

  const xTicksChildren = props.xTicksRender === 'text'
    ? ({ value }: { value: unknown }) => ({ children: `# ${formatTickValue(value)}` })
    : props.xTicksRender === 'link'
      ? ({ value }: { value: unknown }) => ({
          children: (
            <Link position='static' href={tickHref(value)}>
              {formatTickValue(value)}
            </Link>
          ),
        })
      : undefined;

  const xScale = xScaleType === 'time'
    ? scaleTime()
        .range([MARGIN, width - MARGIN])
        .domain([xDates[0], xDates[xDates.length - 1]])
    : scaleBand()
        .range([MARGIN, width - MARGIN])
        .domain(xCategories)
        .paddingInner(0.4)
        .paddingOuter(0.2);

  const data = xScaleType === 'time'
    ? xDates.map((date, i) => ({ date, bar: valueOf(i) }))
    : xCategories.map((category, i) => ({ category, bar: valueOf(i) }));

  const xKey = xScaleType === 'time' ? 'date' : 'category';
  const hoverType = props.hoverType ?? 'line';
  const showHoverLine = hoverType === 'line' || hoverType === 'both';
  // `HoverRect` reads the band of the index scale, which only a band scale provides.
  const showHoverRect = (hoverType === 'rect' || hoverType === 'both') && xScaleType === 'band';

  return (
    <Plot data={data} scale={[xScale, yScale] as any} width={width} height={height}>
      <YAxis position={yAxisPosition as any} hide={props.yHide}>
        <YAxis.Ticks
          ticks={yTicks}
          hide={props.yTicksHide}
          multiline={props.yTicksMultiline}
          primaryText={props.yTicksPrimaryText}
        >
          {suffix ? ({ value }: { value: unknown }) => ({ children: `${value}${suffix}` }) : undefined}
        </YAxis.Ticks>
        {props.yShowGrid && <YAxis.Grid />}
        {props.yShowTitle && (
          <YAxis.Title
            {...(props.yTitlePosition ? { position: props.yTitlePosition } : {})}
            verticalWritingMode={props.yVerticalWritingMode}
          >
            {props.yTitle}
          </YAxis.Title>
        )}
      </YAxis>
      <XAxis position={xAxisPosition as any} hide={props.xHide}>
        <XAxis.Ticks
          ticks={props.xTicksEmpty ? [] : xScaleType === 'time' ? xDates : xCategories}
          hide={props.xTicksHide}
          multiline={props.xTicksMultiline}
          primaryText={props.xTicksPrimaryText}
        >
          {xTicksChildren}
        </XAxis.Ticks>
        {props.xShowGrid && <XAxis.Grid />}
        {props.xShowTitle && (
          <XAxis.Title
            {...(props.xTitlePosition ? { position: props.xTitlePosition } : {})}
            verticalWritingMode={props.xVerticalWritingMode}
          >
            {props.xTitle}
          </XAxis.Title>
        )}
      </XAxis>
      {showHoverRect && <HoverRect x={xKey} hideTickHover={props.hideTickHover} />}
      {showHoverLine && <HoverLine x={xKey} hideTickHover={props.hideTickHover} />}
      {xScaleType === 'time'
        ? (
            <Line x='date' y='bar'>
              <Line.Dots display />
            </Line>
          )
        : <Bar x='category' y='bar' />}
    </Plot>
  );
};

export const defaultProps: BaseExampleProps = {
  margin: 80,
  xScaleType: 'band',
  hoverType: 'line',
  hideTickHover: false,

  yPosition: 'left',
  yCustomPosition: 'Cat Cat Cat 2',
  yHide: false,
  yTicks: [0, 2.5, 5, 7.5, 10],
  yTickSuffix: '',
  yTicksHide: false,
  yTicksMultiline: false,
  yTicksPrimaryText: false,
  yShowGrid: true,
  yShowTitle: true,
  yTitle: 'YAxis title',
  yTitlePosition: 'top',
  yVerticalWritingMode: false,

  xPosition: 'bottom',
  xCustomPosition: 5,
  xHide: false,
  xCategories: ['Cat Cat Cat 0', 'Cat Cat Cat 1', 'Cat Cat Cat 2', 'Cat Cat Cat 3', 'Cat Cat Cat 4'],
  xTicksHide: false,
  xTicksMultiline: false,
  xTicksPrimaryText: false,
  xTicksEmpty: false,
  xTicksRender: 'default',
  xShowGrid: false,
  xShowTitle: true,
  xTitle: 'XAxis title',
  xTitlePosition: 'right',
  xVerticalWritingMode: false,
};

export default Demo;
