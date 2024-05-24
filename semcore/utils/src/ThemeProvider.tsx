import React from 'react';
import { useForkRef } from './ref';
import useEnhancedEffect from './use/useEnhancedEffect';

type Tokens = { [tokenName: string]: string };
export type ThemeProviderProps = {
  tokens: Tokens;
  children: React.ReactNode;
};

export const useContextTokens = () => React.useContext(themeContext);

export const useContextTheme = (ref: React.RefObject<HTMLElement>, available?: boolean) => {
  const tokens = useContextTokens();
  const tokensKey = React.useMemo(() => {
    if (!tokens) return '';
    return Object.entries(tokens)
      .map(([key, value]) => `${key}-${value}`)
      .join('/');
  }, [tokens]);
  useEnhancedEffect(() => {
    if (available !== undefined && !available) return;
    if (!ref.current || !ref.current.style || !ref.current.style.setProperty) return;
    for (const token in tokens) {
      ref.current.style.setProperty(token, tokens[token]);
    }
  }, [tokensKey, available]);
};
export const contextThemeEnhance = (getAvailable?: (props: any) => boolean | undefined) => {
  return (props: any) => {
    const existingRef = props.ref;
    const available = React.useMemo(() => getAvailable?.(props), Object.values(props));
    const enhanceRef: any = React.useRef();
    const refArr: any = React.useMemo(
      () => (existingRef ? [existingRef, enhanceRef] : [enhanceRef]),
      [existingRef, enhanceRef],
    );
    const ref = useForkRef(refArr);
    useContextTheme(enhanceRef, available);

    return { ...props, ref };
  };
};

const themeContext = React.createContext<Tokens | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { tokens: providedTokens = {}, children, tag: Tag = 'div', ...restProps } = props as any;
  const contextTokens = React.useContext(themeContext);
  const tokens = React.useMemo(
    () => (contextTokens === null ? providedTokens : { ...contextTokens, ...providedTokens }),
    [contextTokens, providedTokens],
  );

  return (
    <themeContext.Provider value={tokens}>
      <Tag {...restProps} style={tokens}>
        {children}
      </Tag>
    </themeContext.Provider>
  ) as any;
};
