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

export const cssVariableEnhance = ({
  variable,
  fallback,
  prop,
  map,
}: {
  variable: string;
  prop: string;
  fallback: string;
  map?: (value: string) => any;
}) => {
  return (props) => {
    const { ref } = props;
    const nodeRef = React.useRef();
    const variableValue = useCssVariable(variable, fallback, nodeRef);
    const mappedValue = React.useMemo(
      () => (map ? map(variableValue) : variableValue),
      [map, variableValue],
    );

    return {
      ...props,
      ref: useForkRef(ref, nodeRef),
      [prop]: props[prop] === undefined ? mappedValue : props[prop],
    };
  };
};
