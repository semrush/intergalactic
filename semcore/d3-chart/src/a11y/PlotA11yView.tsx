import React from 'react';
import { heavyFindNextFocusableElement } from './focus';
import { makeDataSummarizationConfig } from './hints';
import type { A11yViewProps } from './PlotA11yModule';
import { getIntl } from './intl';
import { summarize } from './summarize';
import { Root, sstyled } from '@semcore/core';
import styles from '../style/plotA11yView.shadow.css';
import { Box } from '@semcore/flex-box';
import { useAsyncI18nMessages } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/view/__intergalactic-dynamic-locales';
import { DataAccessibilityTable } from './DataAccessibilityTable';

export const PlotA11yView: React.FC<A11yViewProps> = ({
  id,
  data: providedData,
  hints,
  plotLabel,
  plotRef,
  config: providedConfig,
  locale,
}) => {
  const SPlotA11yView = Root;
  const translations = useAsyncI18nMessages(localizedMessages, locale);
  const intl = React.useMemo(
    () => getIntl(locale, translations, localizedMessages),
    [locale, translations, localizedMessages],
  );
  const config = React.useMemo(() => makeDataSummarizationConfig(providedConfig), [providedConfig]);
  const data = React.useMemo(
    () => (Array.isArray(providedData) ? providedData : [providedData]),
    [providedData],
  );

  const [summary, setSummary] = React.useState<string | null>(null);
  const [generatingSummary, setGeneratingSummary] = React.useState(true);

  React.useEffect(() => {
    if (config.disable) {
      setSummary('');
      setGeneratingSummary(false);
      return;
    }
    if (config.override) {
      setSummary(config.override);
      setGeneratingSummary(false);
      return;
    }
    setTimeout(() => {
      setSummary(summarize(providedData, hints, config, locale, translations, localizedMessages));
      setGeneratingSummary(false);
    }, 0);
  }, [providedData, hints, config, locale, translations, localizedMessages]);

  const handleClose = React.useCallback(() => {
    plotRef.current?.focus();
  }, []);
  const handleSkip = React.useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!plotRef.current) return;

    heavyFindNextFocusableElement(plotRef.current)?.focus();
  }, []);
  const handleSkipKeyboard = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!(event.key === 'Enter' || event.key === ' ')) return;

      handleSkip(event);
    },
    [handleSkip],
  );
  const handleGoToTable = React.useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    dataTableRef.current?.focus();
  }, []);
  const handleGoToTableKeyboard = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!(event.key === 'Enter' || event.key === ' ')) return;

      handleGoToTable(event);
    },
    [handleGoToTable],
  );

  const texts = React.useMemo(
    () => ({
      label: intl.formatMessage(
        { id: 'view-label' },
        { plotLabel: plotLabel ?? intl.formatMessage({ id: 'view-default-plot-label' }) },
      ),
      close: intl.formatMessage({ id: 'view-close' }),
      skipPlot: intl.formatMessage({ id: 'view-skip-plot' }),
      goToTable: intl.formatMessage({ id: 'view-go-to-table' }),
      summary: intl.formatMessage({ id: 'view-data-summary' }),
      summaryPlaceholder: intl.formatMessage({ id: 'view-summary-placeholder' }),
      table: intl.formatMessage({ id: 'view-table' }),
    }),
    [intl, plotLabel],
  );

  const dataTableRef = React.useRef<HTMLTableElement>(null);

  return sstyled(styles)(
    <SPlotA11yView
      render={Box}
      tabIndex={0}
      aria-label={texts.label}
      role={'dialog'}
      __excludeProps={['data']}
    >
      <button type={'button'} onClick={handleClose}>
        {texts.close}
      </button>
      {/* biome-ignore lint/a11y/useValidAnchor: */}
      <a href={'#'} onKeyDown={handleSkipKeyboard} onClick={handleSkip}>
        {texts.skipPlot}
      </a>
      {/* biome-ignore lint/a11y/useValidAnchor: */}
      <a href={`#${id}-data-table`} onKeyDown={handleGoToTableKeyboard} onClick={handleGoToTable}>
        {texts.goToTable}
      </a>
      <strong>
        <label htmlFor={`${id}-data-summary`}>{texts.summary}</label>
      </strong>
      <div id={`${id}-data-summary`} aria-busy={generatingSummary}>
        {generatingSummary ? texts.summaryPlaceholder : summary}
      </div>
      <strong>
        <label htmlFor={`${id}-data-table`}>{texts.table}</label>
      </strong>
      <DataAccessibilityTable
        id={id}
        dataTableRef={dataTableRef}
        data={data}
        hints={hints}
        config={config}
        intl={intl}
      />
    </SPlotA11yView>,
  ) as React.ReactElement;
};
