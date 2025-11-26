interface InstanceHandle {
  name: string;
  /**
   * Gets a boolean property value.
   * Optional mapping object can transform the boolean value to any other type.
   * */
  getBoolean(propName: string, options?: Record<string, any>): boolean | any;
  /** Gets a raw property value. */
  getPropertyValue(propName: string): string | boolean;
  /**
   * Finds an child instance layer by name.
   * Optional selector options for path matching and traversal behavior.
   * */
  findInstance(layerName: string, opts?: SelectorOptions): InstanceHandle | ErrorHandle;
  /**
   * Finds a text layer by name.
   * Optional selector options for path matching and traversal behavior.
   * */
  findText(layerName: string, opts?: SelectorOptions): TextHandle | ErrorHandle;
  /**
   * Finds all layers (instances or text) that match the selector function.
   * Optional selector options for path matching and traversal behavior.
   * */
  findLayers(selectorFn: (node: LayerHandle) => boolean, opts?: SelectorOptions): LayerHandle[];
  type: 'INSTANCE';
  /**
   * Renders the instance and returns both the rendered sections and metadata.
   * */
  executeTemplate: () => { example: ResultSection[]; metadata: Metadata };
  children: LayerHandle[];
};

interface TextHandle {
  name: string;
  type: 'TEXT';
  textContent: string;
};

export interface ErrorHandle {
  type: 'ERROR';
};

export type LayerHandle = InstanceHandle | TextHandle;

/** Options for finding layers */
interface SelectorOptions {
  /** List of parent layer names that matches the layer hierarchy */
  path?: string[];
  /** Whether to search through nested instances */
  traverseInstances?: boolean;
}

/** Metadata that can be included in template exports */
interface Metadata {
  /**
   * Controls how nested instances are rendered in the Code Connect panel:
   * - true: The instance's code will be rendered inline within its parent
   * - false: The instance will be shown as a clickable pill that expands when clicked
   *
   * For example:
   * - Set to true for small components like icons that make sense inline
   * - Set to false for complex components that should be viewed separately
   */
  nestable?: boolean;

  /** Props which can be consumed in a parent instance */
  props?: Record<string, any>;
}

/**
 * Dummy type. See full info on
 * [Code Sections (Template V2 API)](https://developers.figma.com/docs/code-connect/template-v2-api/#code-sections)
 * */
type ResultSection = string;

interface Figma {
  tsx: (...str: (any)[]) => string;
  selectedInstance?: InstanceHandle;
};

/**
 * Dummy figma object. See full info on
 * [Template V2 API](https://developers.figma.com/docs/code-connect/template-v2-api/)
 */
export const figma: Figma = {
  tsx: () => '',
};
