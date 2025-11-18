import { figma } from './figma';

type ConnectSettings = {
  /** Code snippet that will display in Figma. */
  example: string | undefined;
  /** Component ID. Can be used to reference component in other examples. */
  id: string;
  /** Figma node URL. */
  url: string;
  /** List of imports for the component. */
  imports?: string[];
};

type Connect = {
  settings?: ConnectSettings;
  /** Finds a child instance by the layer name and returns its code. */
  childInstanceCode: (layerName: string) => string | undefined;
  /** Returns the code for all children of `layerName`.
   * If `layerName` is not specified, returns the code for all children of the root instance.
   * If `wrapper` is specified, wraps the code in `<wrapper>` tags. */
  childrenCode: (layerName?: string, wrapper?: string) => string | undefined;
  printAll: () => string;
};

const instance = figma.selectedInstance;

export const connect: Connect = {
  childInstanceCode: (layerName) => {
    if (instance) {
      const inst = instance.findInstance(layerName);
      if (inst.type === 'INSTANCE') {
        return inst.executeTemplate().example;
      }
    }
    return;
  },
  childrenCode: (layerName, wrapper) => {
    let code: string | undefined;
    instance?.children.forEach((child) => {
      code = figma.tsx`${code}${child.type === 'INSTANCE' ? child.executeTemplate().example : child.textContent}`;
    });
    if (wrapper && code) code = figma.tsx`<${wrapper}>${code}</${wrapper}>`;
    return code;
  },
  printAll: () => JSON.stringify(instance?.children),
};
