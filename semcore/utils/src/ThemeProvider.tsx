import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import React from 'react';

export type ThemeProviderProps = {
  tokens: { [tokenName: string]: string };
};

export const useTheme = (
  tokens: ThemeProviderProps['tokens'],
  ref: React.RefObject<HTMLElement>,
) => {
  const tokensKey = React.useMemo(
    () =>
      Object.entries(tokens)
        .map(([key, value]) => `${key}-${value}`)
        .join('/'),
    [tokens],
  );
  // const effectHook = React.useInsertionEffect || React.useLayoutEffect;
  const effectHook = React.useLayoutEffect;
  effectHook(() => {
    if (!ref.current) return;
    for (const token in tokens) {
      ref.current.style.setProperty(token, tokens[token]);
    }
  }, [tokensKey]);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ tokens = {} }) => {
  const SThemeProvider = Root;
  const ref = React.useRef(null);
  useTheme(tokens, ref);

  return sstyled()(<SThemeProvider render={Box} ref={ref} __excludeProps={['tokens']} />) as any;
};
