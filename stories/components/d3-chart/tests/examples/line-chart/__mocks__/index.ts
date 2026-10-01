import {
  BAD,
  DATA_TYPE,
  FORECAST,
  GOOD,
  HIGHLIGHT_DOT,
  INSIGHTFUL,
  interpolateValue,
  type LineChartProps,
  type ListData,
  POTENTIAL,
} from '@semcore/ui/d3-chart';

import { withUpdatedKeyAt } from '../../../../__mocks__/effects/withUpdatedKeyAt';
import LineMockData from '../../../../__mocks__/line';
import { compose } from '../../../../__mocks__/utils/compose';
import { when } from '../../../../__mocks__/utils/when';

export type HighlightDotsMode = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';
export type DataTypeMode = 'none' | 'forecast' | 'potential' | 'both';

type PipelineOptions = {
  highlightDots?: HighlightDotsMode;
  withInterpolatedGaps?: boolean;
  dataType?: DataTypeMode;
};

/** The shared two-series dataset the docs line examples use: `x = 0..19`, `line1`/`line2`. */
export const base: LineChartProps['data'] = LineMockData.TwoLines;

const INTERPOLATED_AT = [6, 7, 12];

const withGoodDot = withUpdatedKeyAt(4, { [HIGHLIGHT_DOT]: GOOD });
const withBadDot = withUpdatedKeyAt(9, { [HIGHLIGHT_DOT]: BAD });
const withInsightfulDot = withUpdatedKeyAt(14, { [HIGHLIGHT_DOT]: INSIGHTFUL });

const FORECAST_AT = [15, 16];
const POTENTIAL_AT = [17, 18, 19];

const mark = (indices: number[], marker: typeof FORECAST | typeof POTENTIAL) =>
  compose<ListData>(...indices.map((index) => withUpdatedKeyAt(index, { [DATA_TYPE]: marker })));

export default (props: PipelineOptions, source: ListData = base): LineChartProps['data'] =>
  compose<ListData>(
    when(props.highlightDots === 'good' || props.highlightDots === 'mixed', withGoodDot),
    when(props.highlightDots === 'bad' || props.highlightDots === 'mixed', withBadDot),
    when(props.highlightDots === 'insightful' || props.highlightDots === 'mixed', withInsightfulDot),
    when(
      props.withInterpolatedGaps,
      compose(
        ...INTERPOLATED_AT.map((index) => withUpdatedKeyAt(index, { line2: interpolateValue })),
      ),
    ),
    when(props.dataType === 'forecast' || props.dataType === 'both', mark(FORECAST_AT, FORECAST)),
    when(props.dataType === 'potential' || props.dataType === 'both', mark(POTENTIAL_AT, POTENTIAL)),
  )(source) as LineChartProps['data'];
