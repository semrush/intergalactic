import { sstyled } from '@semcore/core';
import React from 'react';

type Tokens = { [tokenName: string]: string };
export type ThemeProviderProps = {
  tokens: Tokens;
  children: React.ReactNode;
};

export const useContextTheme = (ref: React.RefObject<HTMLElement>) => {
  const tokens = React.useContext(themeContext);
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

const themeContext = React.createContext<Tokens | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  tokens: providedTokens = {},
  children,
}) => {
  const SThemeProvider = 'div';
  const contextTokens = React.useContext(themeContext);
  const tokens = React.useMemo(
    () => (contextTokens === null ? providedTokens : { ...contextTokens, ...providedTokens }),
    [contextTokens, providedTokens],
  );

  return (
    <themeContext.Provider value={tokens}>
      {sstyled()(<SThemeProvider style={tokens}>{children}</SThemeProvider>)}
    </themeContext.Provider>
  ) as any;
};
