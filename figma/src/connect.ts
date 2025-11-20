import { figma } from './figma';

const instance = figma.selectedInstance;

export const connect = {
  prop: (propName: string, expectedPropValue: string | boolean) => {
    if (instance) {
      const propValue = instance.getPropertyValue(propName);
      if (expectedPropValue !== undefined && propValue == expectedPropValue)
        return propValue;
      // return figma.tsx`${propName} = ${propValue}`;
    }
    return;
  },
  children: ({ prop, value }: { prop?: string; value?: string | boolean } = {}) => {
    if (instance) {
      if (prop !== undefined && value !== undefined) {
        return instance.findLayers((child) => child.type === 'INSTANCE' && child.getPropertyValue(prop) === value);
      }
    }
    return [];
  },
  /** Finds a child instance or text by the layer name and returns its code. */
  childCode: (layerName: string, wrapper?: string) => {
    if (instance) {
      const inst = instance.findInstance(layerName);
      const text = instance.findText(layerName);
      let result: string | string[] | undefined;
      if (inst.type === 'INSTANCE') {
        result = inst.executeTemplate().example;
      } else if (text.type === 'TEXT') {
        result = text.textContent;
      }
      if (result)
        return wrapper ? figma.tsx`<${wrapper}>${result}</${wrapper.split(' ')[0]}>` : result;
    }
    return;
  },
  /**
   * Returns the code for all children of `layerName`.
   * If `layerName` is not specified, returns the code for all children of the root instance.
   * If `wrapper` is specified, wraps the code in `<wrapper>` tags.
   * */
  childrenCode: (layerName?: string, wrapper?: string) => {
    let code: string | undefined;
    instance?.children.forEach((child) => {
      code = figma.tsx`${code}${child.type === 'INSTANCE' ? child.executeTemplate().example : child.textContent}`;
    });
    if (wrapper && code) code = figma.tsx`<${wrapper}>${code}</${wrapper}>`;
    return code;
  },
  getBoolean: (propName: string, options?: Record<string, any>) => instance?.getBoolean(propName, options),
  printAll: () => JSON.stringify(instance?.children),
};

export interface ConnectSettings {
  /** Code snippet that will display in Figma. */
  example: string | undefined;
  /** Component ID. Can be used to reference component in other examples. */
  id: string;
  /** Figma node URL. */
  url: string;
  /** List of imports for the component. */
  imports?: string[];
};
