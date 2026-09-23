import { BAD, DATA_TYPE, FORECAST, GOOD, HIGHLIGHT_DOT, INSIGHTFUL, POTENTIAL, type ListData } from '@semcore/d3-chart';

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
};

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

export default (props: PipelineOptions) => {
  return compose(
    when(props.withZeroValue, withUpdatedKeyAt(2, { line: 0 })),
    when(props.withSingleSeries, withOmittedKey('line2')),
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
  )(base);
};
