import { Box } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import { Context as I18nContext, useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import React from 'react';

import { normalizeLocale } from './locale';
import type { A11yViewProps } from './PlotA11yView';
import styles from '../style/plotA11yModule.shadow.css';
import { localizedMessages } from './translations/module/__intergalactic-dynamic-locales';

type A11yModuleProps = Omit<A11yViewProps, 'onBlurHandler' | 'triggerRef'>;

export function PlotA11yModule(props: A11yModuleProps) {
  const SPlotA11yModule = Root;
  const [isOpened, setIsOpened] = React.useState(false);
  const [plotA11yView, setPlotA11yView] = React.useState<{
    Component: React.FC<A11yViewProps>;
  } | null>(null);
  const srButtonRef = React.useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const contextLocale = React.useContext(I18nContext);
  const locale = React.useMemo(
    () => normalizeLocale(props.locale ?? contextLocale, localizedMessages),
    [props.locale],
  );
  const t = useI18n(localizedMessages, locale!);

  React.useEffect(() => {
    if (!isOpened) return;
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
        setLoading(false);
      });
  }, [plotA11yView, isOpened, loading, setLoading]);

  if (plotA11yView) {
    return sstyled(styles)(
      <plotA11yView.Component
        {...props}
        onCloseHandler={() => {
          setIsOpened(false);
          setPlotA11yView(null);
        }}
        triggerRef={srButtonRef}
        locale={locale!}
      />,
    ) as React.ReactElement;
  }

  return sstyled(styles)(
    <SPlotA11yModule render={Box}>
      <button
        ref={srButtonRef}
        onClick={() => setIsOpened(true)}
        aria-label={t('PlotA11yModule.ScreenReaderOnlyButton.Label')}
      />
      <Box role='status'>
        {loading && t('loading')}
        {error && t('failed')}
      </Box>
    </SPlotA11yModule>,
  );
}
