import { BAD, DATA_TYPE, FORECAST, GOOD, HIGHLIGHT_DOT, INSIGHTFUL, interpolateValue, POTENTIAL, type ListData } from '@semcore/d3-chart';

import { withAddedData } from '../../../../__mocks__/effects/withAddedData';
import { withOmittedKey } from '../../../../__mocks__/effects/withOmittedKey';
import { withUpdatedKeyAt } from '../../../../__mocks__/effects/withUpdatedKeyAt';
import { compose } from '../../../../__mocks__/utils/compose';
import { when } from '../../../../__mocks__/utils/when';

type PipelineOptions = {
  withZeroValue?: boolean;
  withSingleSeries?: boolean;
  highlightDots?: 'none' | 'good' | 'bad' | 'insightful' | 'mixed';
  dataType?: 'none' | 'forecast' | 'potential' | 'both';
  withInterpolatedGaps?: boolean;
};

/**
 * Points whose value is replaced with `interpolateValue`, which makes the chart bridge the
 * gap instead of breaking the line. They sit in the middle of the run so there is a real
 * value on each side to interpolate between.
 */
const INTERPOLATED_AT = [3, 4, 7];

export const base: ListData = [
  { time: new Date('2024-01-01'), line: 2, line2: 3 },
  { time: new Date('2024-01-06'), line: 4, line2: 3 },
  { time: new Date('2024-01-11'), line: 3, line2: 3 },
  { time: new Date('2024-01-16'), line: 6, line2: 4 },
  { time: new Date('2024-01-21'), line: 5, line2: 3 },
  { time: new Date('2024-01-26'), line: 7, line2: 5 },
  { time: new Date('2024-01-31'), line: 6, line2: 2 },
  { time: new Date('2024-02-05'), line: 8, line2: 5 },
  { time: new Date('2024-02-10'), line: 9, line2: 7 },
  { time: new Date('2024-02-15'), line: 10, line2: 8 },
];

/**
 * `source` defaults to `base` but stays overridable, so a caller that hands the story its
 * own `data` (a browser test, or the Storybook control) keeps it — the knobs then apply on
 * top of that dataset instead of being silently discarded.
 */
export default (props: PipelineOptions, source: ListData = base): ListData => {
  return compose<ListData>(
    when(props.withZeroValue, withUpdatedKeyAt(2, { line: 0 })),
    when(props.withSingleSeries, withOmittedKey('line2')),
    // Applied after `withOmittedKey`, so with one series the gaps have to go on `line` —
    // writing them to `line2` would put the dropped series back.
    when(
      props.withInterpolatedGaps,
      compose(
        ...INTERPOLATED_AT.map((index) =>
          withUpdatedKeyAt(
            index,
            props.withSingleSeries ? { line: interpolateValue } : { line2: interpolateValue },
          ),
        ),
      ),
    ),
    when(props.highlightDots === 'good', withUpdatedKeyAt(5, { [HIGHLIGHT_DOT]: GOOD })),
    when(props.highlightDots === 'bad', withUpdatedKeyAt(6, { [HIGHLIGHT_DOT]: BAD })),
    when(props.highlightDots === 'insightful', withUpdatedKeyAt(9, { [HIGHLIGHT_DOT]: INSIGHTFUL })),
    when(
      props.highlightDots === 'mixed',
      compose(
        withUpdatedKeyAt(5, { [HIGHLIGHT_DOT]: GOOD }),
        withUpdatedKeyAt(6, { [HIGHLIGHT_DOT]: BAD }),
        withUpdatedKeyAt(9, { [HIGHLIGHT_DOT]: INSIGHTFUL }),
      ),
    ),
    when(
      props.dataType === 'forecast' || props.dataType === 'both',
      compose(
        withAddedData({
          time: new Date('2024-02-20'),
          line: 12,
          [DATA_TYPE]: FORECAST,
          ...(!props.withSingleSeries && { line2: 9.6 }),
        }),
        withAddedData({
          time: new Date('2024-02-25'),
          line: 11,
          [DATA_TYPE]: FORECAST,
          ...(!props.withSingleSeries && { line2: 8.8 }),
        }),
      ),
    ),
    when(
      props.dataType === 'potential' || props.dataType === 'both',
      compose(
        withAddedData({
          time: new Date('2024-03-01'),
          line: 15.4,
          [DATA_TYPE]: POTENTIAL,
          ...(!props.withSingleSeries && { line2: 12.3 }),
        }),
        withAddedData({
          time: new Date('2024-03-06'),
          line: 17.6,
          [DATA_TYPE]: POTENTIAL,
          ...(!props.withSingleSeries && { line2: 14.1 }),
        }),
      ),
    ),
  )(source);
};
