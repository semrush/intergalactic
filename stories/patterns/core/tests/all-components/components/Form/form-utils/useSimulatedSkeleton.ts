import React from 'react';

import { FORM_TAB_LOADING_MS } from './constants';

export function useSimulatedSkeleton(): boolean {
  const [contentReady, setContentReady] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setContentReady(true), FORM_TAB_LOADING_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return contentReady;
}
