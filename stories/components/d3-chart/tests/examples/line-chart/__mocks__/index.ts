import { BAD, GOOD, HIGHLIGHT_DOT, INSIGHTFUL, type LineChartProps, type ListData } from '@semcore/ui/d3-chart';

import { withUpdatedKeyAt } from '../../../../__mocks__/effects/withUpdatedKeyAt';
import { compose } from '../../../../__mocks__/utils/compose';
import { when } from '../../../../__mocks__/utils/when';

export type HighlightDotsMode = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';

type PipelineOptions = {
  highlightDots?: HighlightDotsMode;
};

export const base: LineChartProps['data'] = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  line1: Math.abs(Math.sin(Math.exp(i))) * 10,
  line2: Math.abs(Math.cos(Math.exp(i))) * 10,
}));

const withGoodDot = withUpdatedKeyAt(4, { [HIGHLIGHT_DOT]: GOOD });
const withBadDot = withUpdatedKeyAt(9, { [HIGHLIGHT_DOT]: BAD });
const withInsightfulDot = withUpdatedKeyAt(14, { [HIGHLIGHT_DOT]: INSIGHTFUL });

export default (props: PipelineOptions, source: ListData = base): LineChartProps['data'] =>
  compose<ListData>(
    when(props.highlightDots === 'good' || props.highlightDots === 'mixed', withGoodDot),
    when(props.highlightDots === 'bad' || props.highlightDots === 'mixed', withBadDot),
    when(props.highlightDots === 'insightful' || props.highlightDots === 'mixed', withInsightfulDot),
  )(source) as LineChartProps['data'];
