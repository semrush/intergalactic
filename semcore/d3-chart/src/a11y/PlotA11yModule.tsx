import React from 'react';
import { DataStructureHints, PartialDataSummarizationConfig } from './hints';
import { normalizeLocale } from './locale';
import { localizedMessages } from './translations/module/__intergalactic-dynamic-locales';
import { Root, sstyled } from '@semcore/core';
import styles from '../style/plotA11yModule.shadow.css';
import { Context as I18nContext, useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import { Box } from '@semcore/flex-box';

let globalWasFocused = false;
let globalNavWithKeyboard = false;

export type A11yViewProps = {
  id: string;
  data: Record<string, unknown>[];
  hints: DataStructureHints;
  plotLabel: string;
  locale: NavigatorLanguage['language'];
  config: PartialDataSummarizationConfig;

  plotRef: React.RefObject<HTMLElement>;
};

export const PlotA11yModule: React.FC<A11yViewProps> = (props) => {
  const SPlotA11yModule = Root;
  const [wasFocused, setWasFocused] = React.useState(globalWasFocused);
  const [navWithKeyboard, setNavWithKeyboard] = React.useState(globalNavWithKeyboard);
  const [plotA11yView, setPlotA11yView] = React.useState<{
    Component: React.FC<A11yViewProps>;
  } | null>(null);

  const hadnleHiddenElementsFocus = React.useCallback(() => {
    setWasFocused(true);
    setNavWithKeyboard(true);
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const contextLocale = React.useContext(I18nContext);
  const locale = React.useMemo(
    () => normalizeLocale(props.locale ?? contextLocale, localizedMessages),
    [props.locale],
  );
  const t = useI18n(localizedMessages, locale!);

  React.useEffect(() => {
    if (wasFocused) return;
    const focusListener = () => {
      globalWasFocused = true;
      setWasFocused(true);
    };

    props.plotRef.current?.addEventListener('focus', focusListener);
    return () => props.plotRef.current?.removeEventListener('focus', focusListener);
  }, [wasFocused, props.plotRef]);
  React.useEffect(() => {
    if (navWithKeyboard) return;
    const keyboardListener = (event: Event) => {
      const navigationKeys = [
        'Tab',
        'ArrowUp',
        'ArrowLeft',
        'ArrowDown',
        'ArrowRight',
        'ArrowUp',
        'ArrowLeft',
      ];
      if ('key' in event && navigationKeys.includes((event as KeyboardEvent).key)) {
        setNavWithKeyboard(true);
        globalNavWithKeyboard = true;
      }
    };
    document.body?.addEventListener('keydown', keyboardListener);
    return () => document.body?.removeEventListener('keydown', keyboardListener);
  }, [navWithKeyboard]);

  const shouldDisplayView = wasFocused && navWithKeyboard;

  React.useEffect(() => {
    if (!shouldDisplayView) return;
    if (plotA11yView) return;
    if (loading) return;

    setLoading(true);

    import('./PlotA11yView')
      .then(({ PlotA11yView }) => {
        setPlotA11yView({ Component: PlotA11yView });
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [plotA11yView, shouldDisplayView, loading, setLoading]);

  if (plotA11yView) {
    return sstyled(styles)(
      <plotA11yView.Component {...props} locale={locale!} />,
    ) as React.ReactElement;
  }

  if (error) {
    return sstyled(styles)(
      <SPlotA11yModule render={Box} tabIndex={0} aria-live='assertive'>
        {t('failed')}
      </SPlotA11yModule>,
    ) as React.ReactElement;
  }
  if (loading) {
    return sstyled(styles)(
      <SPlotA11yModule render={Box} tabIndex={0} aria-live='polite'>
        {t('loading')}
      </SPlotA11yModule>,
    ) as React.ReactElement;
  }

  return sstyled(styles)(
    <SPlotA11yModule render={Box} tabIndex={0} onFocus={hadnleHiddenElementsFocus}>
      {t('disabled')}
    </SPlotA11yModule>,
  ) as React.ReactElement;
};
