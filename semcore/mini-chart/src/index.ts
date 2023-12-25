import { ScoreLine, ScoreDonut, ScoreSemiDonut } from './component/score';
import { TrendLine, TrendArea, TrendBar, TrendHistogram } from './component/trend';

const miniCharts: {
  TrendLine: typeof TrendLine;
  TrendArea: typeof TrendArea;
  TrendBar: typeof TrendBar;
  TrendHistogram: typeof TrendHistogram;
  ScoreSemiDonut: typeof ScoreSemiDonut;
  ScoreDonut: typeof ScoreDonut;
  ScoreLine: typeof ScoreLine;
} = {
  TrendLine,
  TrendArea,
  TrendBar,
  TrendHistogram,
  ScoreSemiDonut,
  ScoreDonut,
  ScoreLine,
};

export default miniCharts;
