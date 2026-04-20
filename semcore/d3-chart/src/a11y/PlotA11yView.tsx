import { Box } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import { useAsyncI18nMessages } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import React from 'react';

import { DataAccessibilityTable } from './DataAccessibilityTable';
import { heavyFindNextFocusableElement } from './focus';
import { makeDataSummarizationConfig } from './hints';
import type { DataStructureHints, PartialDataSummarizationConfig } from './hints';
import { getIntl } from './intl';
import { summarize } from './summarize';
import styles from '../style/plotA11yView.shadow.css';
import { localizedMessages } from './translations/view/__intergalactic-dynamic-locales';

export type A11yViewProps = {
  id: string;
  payload: Record<string, unknown>[];
  hints: DataStructureHints;
  plotLabel: string;
  locale: NavigatorLanguage['language'];
  config: PartialDataSummarizationConfig;

  plotRef: React.RefObject<HTMLElement>;
  triggerRef: React.RefObject<HTMLElement>;
  onCloseHandler: () => void;
};

export function PlotA11yView({
  id,
  payload: providedData,
  hints,
  plotLabel,
  triggerRef,
  plotRef,
  config: providedConfig,
  locale,
  onCloseHandler,
}: A11yViewProps) {
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
  const rootRef = React.useRef<HTMLDivElement>(null);

  const [summary, setSummary] = React.useState<string | null>(null);
  const [generatingSummary, setGeneratingSummary] = React.useState(true);

  React.useEffect(() => {
    rootRef.current?.focus();

    function focusOutHandler(event: FocusEvent) {
      if (event.relatedTarget === null) {
        return requestIdleCallback(onCloseHandler);
      }

      if (!(event.relatedTarget instanceof HTMLElement)) return;

      if (rootRef.current?.contains(event.relatedTarget)) return;

      requestIdleCallback(onCloseHandler);
    }

    rootRef.current?.addEventListener('focusout', focusOutHandler);
    return () => rootRef.current?.removeEventListener('focusout', focusOutHandler);
  }, []);

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
    onCloseHandler();

    requestIdleCallback(() => {
      triggerRef.current?.focus();
    });
  }, []);
  const handleSkip = React.useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!plotRef.current) return;

    heavyFindNextFocusableElement(plotRef.current)?.focus();

    onCloseHandler();
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
      role='dialog'
      __excludeProps={['data']}
      ref={rootRef}
    >
      <button type='button' onClick={handleClose}>
        {texts.close}
      </button>
      <a href='#' onKeyDown={handleSkipKeyboard} onClick={handleSkip}>
        {texts.skipPlot}
      </a>
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
