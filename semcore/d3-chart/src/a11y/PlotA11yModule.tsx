import React from 'react';
import { DataStructureHints, PartialDataSummarizationConfig } from './hints';
import { normalizeLocale } from './locale';
import { translations } from './translations/module/translations';
import { useLocalStorage } from './useLocalStorage';
import { Root, sstyled } from '@semcore/core';
import styles from '../style/plotA11yModule.shadow.css';

let globalWasFocused = false;
let globalNavWithKeyboard = false;

export type A11yViewProps = {
  id: string;
  data: Record<string, unknown>[];
  hints: DataStructureHints;
  plotLabel: string;
  locale: NavigatorLanguage['language'];
  config: PartialDataSummarizationConfig;
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  plotRef: React.RefObject<Element>;
};

const localStorageKey = 'intergalactic-components-enable-charts-a11y-module';

export const PlotA11yModule: React.FC<A11yViewProps> = (props) => {
  const SPlotA11yModule = Root;
  const [wasFocused, setWasFocused] = React.useState(globalWasFocused);
  const [navWithKeyboard, setNavWithKeyboard] = React.useState(globalNavWithKeyboard);
  const [plotA11yView, setPlotA11yView] = React.useState<{
    Component: React.FC<A11yViewProps>;
  } | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const [preserveExplictelyEnableButton, setPreserveExplictelyEnableButton] = React.useState(false);
  const [explictelyEnabled, setExplictelyEnabled] = useLocalStorage<true>(localStorageKey);
  const explictelyEnable = React.useCallback(() => {
    setPreserveExplictelyEnableButton(true);
    setExplictelyEnabled(true);
  }, [setExplictelyEnabled]);

  const locale = React.useMemo(() => normalizeLocale(props.locale, translations), [props.locale]);
  const texts = React.useMemo(() => (locale ? translations[locale] : {}), [locale]);

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

  const shouldDisplayView = explictelyEnabled || (wasFocused && navWithKeyboard);

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
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error);
      });
  }, [plotA11yView, shouldDisplayView, loading, setLoading]);

  if (plotA11yView) {
    return sstyled(styles)(
      <div>
        {/* Preserving button in to preserve Screenreader "focus" on element before a11y view */}
        {preserveExplictelyEnableButton && <SPlotA11yModule render={'button'} />}
        <plotA11yView.Component {...props} />
      </div>,
    );
  }

  if (error) {
    return sstyled(styles)(
      <SPlotA11yModule render={'button'} tabIndex={0} aria-live="assertive">
        {texts.failed}
      </SPlotA11yModule>,
    );
  }
  if (loading) {
    return sstyled(styles)(
      <SPlotA11yModule render={'button'} tabIndex={0} aria-live="polite">
        {texts.loading}
      </SPlotA11yModule>,
    );
  }

  return sstyled(styles)(
    <SPlotA11yModule
      render={'button'}
      tabIndex={0}
      onClick={explictelyEnable}
      aria-live="assertive"
    >
      {texts.disabled}
    </SPlotA11yModule>,
  );
};
