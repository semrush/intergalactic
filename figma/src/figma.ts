type Template = {
  example: string;
};

type InstanceHandle = {
  name: string;
  findInstance: (layerName: string) => InstanceHandle | ErrorHandle;
  type: 'INSTANCE';
  executeTemplate: () => Template;
  children: (InstanceHandle | TextHandle)[];
};

type TextHandle = {
  name: string;
  type: 'TEXT';
  textContent: string;
};

type ErrorHandle = {
  type: 'ERROR';
};

type Figma = {
  tsx: (...str: (TemplateStringsArray | string | undefined)[]) => string;
  selectedInstance?: InstanceHandle;
};

export const figma: Figma = {
  tsx: () => '',
};
