import React from 'react';
import canUseDOM from './canUseDOM';
import { useForkRef } from './ref';
import { useContextTokens } from './ThemeProvider';

export const useCssVariable = (name: string, fallbackValue: string, ref?: React.RefObject<any>) => {
  const contextTheme = useContextTokens();
  const getValue = React.useCallback(() => {
    if (contextTheme?.[name]) return contextTheme[name];
    if (!canUseDOM()) return fallbackValue;

    const element = ref?.current ?? document.documentElement;

    const computedStyles = getComputedStyle(element);

    return computedStyles.getPropertyValue(name) || fallbackValue;
  }, [name, ref, fallbackValue, contextTheme]);

  const initialValue = React.useMemo(getValue, [getValue]);
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => setValue(getValue), [getValue]);

  return value;
};

export const cssVariableEnhance = <
  P extends string,
  F = string,
  R = string,
  M extends null | ((value: string) => R) = any,
>({
  variable,
  fallback,
  prop,
  map,
}: {
  variable: string;
  prop: P;
  fallback: F;
  map?: M;
}) => {
  return <T extends {}>(props: T) => {
    const { ref } = props as any;
    const nodeRef = React.useRef();
    const variableValue = useCssVariable(variable, fallback as any, nodeRef);
    const mappedValue = React.useMemo(
      () => (map ? map(variableValue) : variableValue),
      [map, variableValue],
    );

    return {
      ...props,
      ref: useForkRef(ref, nodeRef),
      [prop]: (props as any)[prop] === undefined ? mappedValue : (props as any)[prop],
    } as T & {
      [key in P]: M extends (value: string) => R ? R : F;
    };
  };
};
