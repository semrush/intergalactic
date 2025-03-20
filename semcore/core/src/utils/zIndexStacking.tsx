import React from 'react';
import defaultDesignThemeJson from '../theme/themes/default';
import { useContextTokens } from './ThemeProvider';
const defaultDesignThemeTokens = defaultDesignThemeJson as Record<string, string>;

const zIndexStackingContext = React.createContext(0);

export type ZIndexDesignTokens =
  | 'z-index-deep'
  | 'z-index-overlay'
  | 'z-index-modal'
  | 'z-index-popper'
  | 'z-index-dropdown'
  | 'z-index-tooltip'
  | 'z-index-notice-bubble';

export const useZIndexStacking = (designToken?: ZIndexDesignTokens) => {
  const contextTokens = useContextTokens();
  const parentContextValue = React.useContext(zIndexStackingContext);
  const contextValue = React.useMemo(() => {
    if (!designToken) return parentContextValue;
    const tokenName = designToken.startsWith('--intergalactic-')
      ? designToken
      : `--intergalactic-${designToken}`;
    const tokenValue = parseInt(
      contextTokens?.[tokenName] || defaultDesignThemeTokens[tokenName],
      10,
    );
    if (Number.isNaN(tokenValue)) return parentContextValue;
    return parentContextValue + tokenValue;
  }, [designToken, contextTokens, parentContextValue]);
  return contextValue;
};
export const ZIndexStackingContextProvider: React.FC<{
  designToken: ZIndexDesignTokens;
  children: React.ReactNode;
}> = ({ designToken, children }) => {
  const contextValue = useZIndexStacking(designToken);
  return (
    <zIndexStackingContext.Provider value={contextValue}>{children}</zIndexStackingContext.Provider>
  );
};
export const zIndexStackingEnhance = (designToken?: ZIndexDesignTokens) => {
  return (props: any) => {
    const { ...other } = props;
    const parentZIndexStacking = useZIndexStacking(designToken);
    return {
      ...other,
      parentZIndexStacking,
    };
  };
};
