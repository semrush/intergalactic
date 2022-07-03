import { DataStructureHints, DataSummarizationConfig } from './hints';
import { extractDataInsights } from './insights';
import { serialize } from './serialize';

export const summarize = (
  data: Record<string, unknown>[] | Record<string, unknown>,
  hints: DataStructureHints,
  config: DataSummarizationConfig,
  locale: NavigatorLanguage['language'],
) => {
  const analyzedData = extractDataInsights(data, hints, config);
  const summary = serialize(analyzedData, config, { locale });
  return summary;
};
