import { figma } from './figma';
import type { LayerHandle, ErrorHandle } from './figma';
const instance = figma.selectedInstance;

interface ChildCodeParameters {
  wrapper?: string;
  path?: string[];
}

interface Result {
  node: LayerHandle;
  path: string[];
}

const traverse = (
  node: LayerHandle,
  layerName: string,
  results: Result[],
  path: string[] = [],
) => {
  if (node.name === layerName) {
    results.push({ node, path: path.slice(1) });
    return;
  }

  if (node.type === 'INSTANCE' && node.children) {
    node.children.forEach((child) => {
      traverse(child, layerName, results, [...path, node.name]);
    });
  }
};

const layerCode = (layer: LayerHandle | ErrorHandle | undefined) => {
  switch (layer?.type) {
    case 'INSTANCE': return layer.executeTemplate().example;
    case 'TEXT': return layer.textContent;
    default: return;
  }
};

export const connect = {
  /** Returns a pretty representation of a prop/value pair. */
  formatProp: (propName: string, propValue: any) => {
    if (propValue === undefined) {
      return;
    }
    if (typeof propValue === 'string' && !propValue.startsWith('/*')) {
      return figma.tsx`${propName} = "${propValue}"`;
    }
    return figma.tsx`${propName} = {${propValue}}`;
  },
  /**
   * Gets a property value and returns a pretty representation of it and its value.
   * If `expectedPropValue` is provided, returns that value as the prop name
   * (but only if it matches the current value).
   * */
  getProp: (propName: string, expectedPropValue?: string | boolean) => {
    if (instance) {
      const propValue = instance.getPropertyValue(propName);
      if (expectedPropValue !== undefined && propValue == expectedPropValue) {
        return propValue;
      } else if (expectedPropValue === undefined) {
        if (typeof propValue === 'string') {
          return figma.tsx`${propName} = "${propValue}"`;
        } else {
          return figma.tsx`${propName} = {${propValue}}`;
        }
      }
    }
    return;
  },
  /**
   * @returns array of children
   * @param prop return only children that have `prop=value`
   */
  children: ({ prop, value }: { prop?: string; value?: string | boolean } = {}) => {
    if (instance) {
      if (prop !== undefined && value !== undefined) {
        return instance.findLayers((child) => child.type === 'INSTANCE' && child.getPropertyValue(prop) === value);
      }
      return instance.findLayers((child) => child.type === 'INSTANCE');
    }
    return [];
  },
  /** Finds a child instance or text by the layer name and returns its code. */
  childCode: (layerName: string, params?: ChildCodeParameters) => {
    if (instance) {
      const { path, wrapper } = params ?? {};
      const inst = instance.findInstance(layerName, { path });
      const text = instance.findText(layerName, { traverseInstances: !!path });
      let result: string | string[] | undefined;
      if (text.type === 'TEXT' && path) {
        const results: Result[] = [];
        traverse(instance, layerName, results);
        result = layerCode(results.filter((node) => node.path.join('#SEP;') === path?.join('#SEP;'))[0]?.node);
      } else {
        result = layerCode(inst) ?? layerCode(text);
      }
      if (result)
        return wrapper
          ? figma.tsx`<${wrapper}>${result}</${wrapper.split(' ')[0]}>`
          : result;
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
  printAll: () => JSON.stringify(instance),
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
