import { figma } from './figma';
import type { LayerHandle, ErrorHandle } from './figma';
const rootinstance = figma.selectedInstance;

interface ChildCodeParameters {
  wrapper?: string;
  path?: string[];
}

interface ChildrenCodeParameters {
  layerName?: string;
  wrapper?: string;
  filter: (value: LayerHandle, index: number, array: LayerHandle[]) => boolean;
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
    case 'INSTANCE': return figma.tsx`${layer.executeTemplate().example}`;
    case 'TEXT': return figma.tsx`${layer.textContent}`;
    default: return;
  }
};

export const connect = {
  /** Returns a pretty representation of a prop/value pair. */
  formatProp: (propName: string, propValue: string | boolean | undefined) => {
    if (propValue) {
      if (!['true', 'false'].includes(propValue.toString().toLowerCase()) && !propValue.toString().startsWith('/*')) {
        return figma.tsx`${propName} = "${propValue}"`;
      }
      return figma.tsx`${propName} = {${propValue}}`;
    }
  },
  /**
   * Gets a property value and returns a pretty representation of it and its value.
   * @expectedPropValue check if the prop value matches the expected value and return that value
   * @layerName get the prop from the child instance with this name, instead of the root instance
   * @returns A string like `prop = {value}` or `prop = "value"`. With `expectedPropValue` returns only `value`
   * */
  getProp: (propName: string, expectedPropValue?: string | boolean, layerName?: string) => {
    if (figma.selectedInstance) {
      const instance = layerName ? figma.selectedInstance.findInstance(layerName) : figma.selectedInstance;
      if (instance.type === 'INSTANCE') {
        const propValue = instance.getPropertyValue(propName).toString().toLowerCase();
        if (expectedPropValue !== undefined) {
          if (propValue == expectedPropValue.toString().toLowerCase()) {
            return propValue;
          }
        } else {
          if (!['true', 'false'].includes(propValue)) {
            return figma.tsx`${propName} = "${propValue}"`;
          } else if (propValue === 'true') {
            return propName;
          }
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
    if (rootinstance) {
      if (prop !== undefined && value !== undefined) {
        return rootinstance.findLayers((child) => child.type === 'INSTANCE' && child.getPropertyValue(prop) === value);
      }
      return rootinstance.findLayers((child) => child.type === 'INSTANCE');
    }
    return [];
  },
  /** Finds a child instance or text by the layer name and returns its code. */
  childCode: (layerName: string, params?: ChildCodeParameters) => {
    if (rootinstance) {
      const { path, wrapper } = params ?? {};
      const inst = rootinstance.findInstance(layerName, { path });
      const text = rootinstance.findText(layerName, { traverseInstances: !!path });
      let result: string | string[] | undefined;
      if (text.type === 'TEXT' && path) {
        const results: Result[] = [];
        traverse(rootinstance, layerName, results);
        result = layerCode(results.filter((node) => node.path.join('#SEP;') === path?.join('#SEP;'))[0]?.node);
      } else {
        result = layerCode(inst) ?? layerCode(text);
      }
      if (result)
        return wrapper
          ? figma.tsx`<${wrapper}>${result}</${wrapper.split(' ')[0]}>`
          : result;
    }
  },
  /**
   * @layerName only returns children of the specified nested layer
   * @wrapper wraps the code in `<{wrapper}>` tags
   * @returns the code for all children
   * */
  childrenCode: (params?: ChildrenCodeParameters) => {
    const { layerName, wrapper, filter } = params ?? { filter: () => true };
    if (figma.selectedInstance) {
      const instance = layerName ? figma.selectedInstance.findInstance(layerName) : figma.selectedInstance;
      if (instance.type === 'INSTANCE') {
        let code: string | undefined;
        instance.children.filter(filter).forEach((child) => {
          code = figma.tsx`${code}${child.type === 'INSTANCE' ? child.executeTemplate().example : child.textContent}`;
        });
        if (wrapper && code) code = figma.tsx`<${wrapper}>${code}</${wrapper}>`;
        return code;
      }
    }
  },
  getBoolean: (propName: string, options?: Record<string, any>) => rootinstance?.getBoolean(propName, options),
  printAll: () => JSON.stringify(rootinstance),
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
