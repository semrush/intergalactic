import { DataStructureHints, DataSummarizationConfig } from './hints';
import { extractDataInsights } from './insights';
import { serialize } from './serialize';

export const summarize = (
  data: Record<string, unknown>[] | Record<string, unknown>,
  hints: DataStructureHints,
  config: DataSummarizationConfig,
  locale: NavigatorLanguage['language'],
  translations: { [messageId: string]: string },
  availableLocales: { [localeId: string]: any },
) => {
  const analyzedData = extractDataInsights(data, hints, config);
  const summary = serialize(analyzedData, config, { locale, translations, availableLocales });
  return summary;
};
