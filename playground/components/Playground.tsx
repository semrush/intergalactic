import { Box } from '@semcore/ui/base-components';
import React, { useMemo, useState } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import type { PlaygroundComponentName } from '../registry';
import PlaygroundRegistry from '../registry';
import Canvas from './Canvas';
import Code from './Code';
import ControlPanel from './ControlPanel';
import { ThemeContext } from './ThemeContext';
import styles from '../styles/styles.module.css';
import isGroupControl from '../typeguards/isGroupControl';
import type { ControlsType, ControlValue } from '../types/Controls';
import type { PlaygroundComponentProps, PlaygroundEntry } from '../types/Playground';
import type { GetPropsForComponent } from '../types/utils/GetPropsForComponent';
import deepCopy from '../utils/deepCopy';
import toArray from '../utils/toArray';

interface PlaygroundProps<C extends PlaygroundComponentName> {
  componentName: C;
  theme: 'dark' | 'light';
}

function mapControlsStateToProps<Props extends PlaygroundComponentProps>(controlsState: ControlsType<Props>) {
  return Object.entries(controlsState).reduce((acc, [name, control]) => {
    if (isGroupControl(control)) {
      acc[name] = mapControlsStateToProps(control.controls);
    } else {
      if (control.value === undefined) return acc;

      acc[name] = control.value;
    }
    return acc;
  }, {} as PlaygroundComponentProps);
}

function updateControlValue<Props extends PlaygroundComponentProps>(
  prevState: ControlsType<Props>,
  key: string,
  value: ControlValue,
): ControlsType<Props> {
  const [propKey, groupKey] = key.split('.');

  const groupControl = prevState[groupKey];
  if (isGroupControl(groupControl)) {
    return {
      ...prevState,
      [groupKey]: {
        ...groupControl,
        controls: {
          ...groupControl.controls,
          [propKey]: { ...groupControl.controls[propKey], value },
        },
      },
    };
  }

  const isNumberControl = prevState[propKey].type.includes('-number');
  const isValueEmpty = value === '';

  let newValue = value;

  if (isNumberControl && !isValueEmpty) {
    newValue = +value;
  }

  return {
    ...prevState,
    [propKey]: { ...prevState[propKey], value: newValue },
  };
}

function processControls<Props extends PlaygroundComponentProps>(
  controls: ControlsType<Props>,
  componentProps: Props,
  rootComponentProps?: PlaygroundComponentProps,
) {
  const result = {} as ControlsType<PlaygroundComponentProps>;

  for (const [prop, control] of Object.entries(controls)) {
    if (control.visibleIf && componentProps) {
      const visible = control.visibleIf.every(({ dependsOn, equals, notEquals }) => {
        const [key, groupKey] = dependsOn.split('.');
        let value = componentProps[key];

        if (groupKey) {
          value = rootComponentProps ? rootComponentProps[groupKey][key] : componentProps[groupKey][key];
        }

        if (equals || notEquals) {
          const equalValues = equals ? toArray(equals) : null;
          const notEqualValues = notEquals ? toArray(notEquals) : null;

          if (equalValues && notEqualValues) {
            return equalValues.includes(value) || !notEqualValues.includes(value);
          }

          if (notEqualValues) {
            return !notEqualValues.includes(value);
          }

          if (equalValues) {
            return equalValues.includes(value);
          }
        }

        return true;
      });

      if (!visible) continue;
    }

    if (isGroupControl(control)) {
      result[prop] = {
        ...control,
        controls: {
          ...processControls(control.controls, componentProps[prop], componentProps) as Record<string, any>,
        },
      };

      continue;
    }

    const currentValue = componentProps?.[prop];

    if ('options' in control) {
      const options = typeof control.options === 'function' ? control.options(componentProps) : [...control.options];

      result[prop] = {
        ...control,
        options,
        value: options.includes(currentValue) ? currentValue : options[0],
      };
    } else {
      result[prop] = { ...control, value: currentValue ?? control.value };
    }
  }

  return result;
}

function Playground<
  C extends PlaygroundComponentName,
  Props extends PlaygroundComponentProps = GetPropsForComponent<C>,
>({ componentName, theme }: PlaygroundProps<C>) {
  const config = PlaygroundRegistry[componentName];

  if (!config) return null;

  const { controls, JSX, link, filterProps, JSXDisplayName } = config as PlaygroundEntry<Props>;

  const initialProcessedControls = useMemo(() => {
    const deepCopiedControls = deepCopy(controls);
    const initialComponentProps = mapControlsStateToProps(deepCopiedControls);
    return processControls(deepCopiedControls, initialComponentProps);
  }, [controls]);

  const [controlsState, setControlsState] = useState(initialProcessedControls);

  const handleControlChange = (key: string, value: ControlValue) => {
    const updatedState = updateControlValue(controlsState, key, value);
    const newProps = mapControlsStateToProps(updatedState);

    setControlsState(processControls(controls, newProps));
  };

  const element = JSX({ ...mapControlsStateToProps(controlsState), handleControlChange } as unknown as Props);

  return (
    <ThemeContext.Provider value={theme}>
      <Box className={styles.playground} role='region' aria-label='Playground'>
        <Canvas>{element}</Canvas>
        <ControlPanel controls={controlsState} onControlChange={handleControlChange} />
        <Code
          link={link}
          sourceCode={reactElementToJSXString(element, {
            showDefaultProps: false,
            useBooleanShorthandSyntax: false,
            filterProps,
            ...(JSXDisplayName && { displayName: () => JSXDisplayName }),
          })}
        />
      </Box>
    </ThemeContext.Provider>
  );
}

export default Playground;
