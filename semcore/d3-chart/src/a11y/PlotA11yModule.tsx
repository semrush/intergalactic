import React from 'react';
import { DataStructureHints, PartialDataSummarizationConfig } from './hints';

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

export const PlotA11yModule: React.FC<A11yViewProps> = (props) => {
  const [wasFocused, setWasFocused] = React.useState(globalWasFocused);
  const [navWithKeyboard, setNavWithKeyboard] = React.useState(globalNavWithKeyboard);
  const [plotA11yView, setPlotA11yView] = React.useState<{
    Component: React.FC<A11yViewProps>;
  } | null>(null);

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

    import('./PlotA11yView').then(({ PlotA11yView }) => {
      setPlotA11yView({ Component: PlotA11yView });
    });
  }, [plotA11yView, shouldDisplayView]);

  if (plotA11yView) {
    return <plotA11yView.Component {...props} />;
  }

  return null;
};
