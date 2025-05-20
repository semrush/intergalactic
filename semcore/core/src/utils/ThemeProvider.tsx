import React from 'react';
import { useForkRef } from './ref';
import useEnhancedEffect from './use/useEnhancedEffect';

type Tokens = { [tokenName: string]: string };
export type ThemeProviderProps = JSX.IntrinsicElements['div'] & {
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
export const contextThemeEnhance = <T extends Record<string, any> = {}>(
  getAvailable?: (props: T) => boolean | undefined,
) => {
  return (props: T) => {
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

export const ThemeProvider = (props: ThemeProviderProps): React.ReactElement => {
  const { tokens: providedTokens = {}, children, style: providedStyle = {}, ...restProps } = props;
  const contextTokens = React.useContext(themeContext);
  const tokens = React.useMemo(
    () => (contextTokens === null ? providedTokens : { ...contextTokens, ...providedTokens }),
    [contextTokens, providedTokens],
  );
  const style: React.CSSProperties = React.useMemo(() => {
    return {
      display: 'contents',
      ...tokens,
      ...providedStyle,
    };
  }, [tokens, providedStyle]);

  return (
    <themeContext.Provider value={tokens}>
      <div {...restProps} style={style}>
        {children}
      </div>
    </themeContext.Provider>
  );
};
