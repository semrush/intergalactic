import { shouldHaveDataUiName } from './shouldHaveDataUiName';
import { shouldSupportChildren } from './shouldSupportChildren';
import { shouldSupportClassName } from './shouldSupportClassName';
import { shouldSupportClickHandler } from './shouldSupportClickHandler';
import { shouldSupportDataAttributes } from './shouldSupportDataAttributes';
import { shouldSupportDisabled } from './shouldSupportDisabled';
import { type ComponentContractRefTarget, shouldSupportRef } from './shouldSupportRef';
import { shouldSupportStyle } from './shouldSupportStyle';
import { type ComponentContractTagCase, shouldSupportTag } from './shouldSupportTag';

export type ComponentContractPreset = 'root' | 'leaf' | 'inputLike' | 'interactive' | 'none';

export type ComponentContractCheck =
  | 'className'
  | 'ref'
  | 'dataAttributes'
  | 'style'
  | 'dataUiName'
  | 'children'
  | 'clickHandler'
  | 'disabled'
  | 'tag';

export type ComponentContractOptions = {
  Component: any;
  Wrapper?: any;
  props?: any;
  expectedDataUiName?: string;
  preset: ComponentContractPreset | ComponentContractPreset[];
  include?: ComponentContractCheck[];
  skip?: ComponentContractCheck[];
  tagCases?: ComponentContractTagCase[];
  refTarget?: ComponentContractRefTarget;
};

const presetChecks: Record<ComponentContractPreset, ComponentContractCheck[]> = {
  root: ['className', 'ref', 'dataAttributes', 'style', 'dataUiName', 'children'],
  leaf: ['className', 'ref', 'dataAttributes', 'style', 'dataUiName'],
  inputLike: ['className', 'ref', 'dataAttributes', 'style', 'dataUiName'],
  interactive: ['clickHandler', 'disabled'],
  none: [],
};

const getComponentContractChecks = ({
  preset,
  include = [],
  skip = [],
}: Pick<ComponentContractOptions, 'preset' | 'include' | 'skip'>) => {
  const presets = Array.isArray(preset) ? preset : [preset];
  const checks = new Set<ComponentContractCheck>();

  presets.forEach((presetName) => {
    presetChecks[presetName].forEach((check) => checks.add(check));
  });
  include.forEach((check) => checks.add(check));
  skip.forEach((check) => checks.delete(check));

  return checks;
};

const validateComponentContractOptions = (options: ComponentContractOptions) => {
  const { expectedDataUiName, tagCases } = options;
  const checks = getComponentContractChecks(options);

  if (checks.has('dataUiName') && !expectedDataUiName) {
    throw new Error('expectedDataUiName is required when dataUiName contract check is enabled. Pass expectedDataUiName or add skip: [\'dataUiName\'].');
  }

  if (checks.has('tag') && (!tagCases || tagCases.length === 0)) {
    throw new Error('tagCases are required when tag contract check is enabled. Pass explicit tagCases for this component.');
  }

  tagCases?.forEach(({ tag, name, expectedTagName }) => {
    if (typeof tag !== 'string' && !expectedTagName) {
      const tagName = name || (tag as any).displayName || (tag as any).name || 'custom component';
      throw new Error(`expectedTagName is required for component tag case "${tagName}"`);
    }
  });

  return checks;
};

export const runComponentContractTests = (options: ComponentContractOptions) => {
  const {
    Component,
    Wrapper,
    props,
    expectedDataUiName,
    tagCases,
    refTarget,
  } = options;
  const checks = validateComponentContractOptions(options);

  if (checks.has('className')) shouldSupportClassName(Component, Wrapper, props);
  if (checks.has('ref')) shouldSupportRef(Component, Wrapper, props, refTarget);
  if (checks.has('dataAttributes')) shouldSupportDataAttributes(Component, Wrapper, props);
  if (checks.has('style')) shouldSupportStyle(Component, Wrapper, props);
  if (checks.has('dataUiName')) {
    shouldHaveDataUiName(Component, Wrapper, props, expectedDataUiName!);
  }
  if (checks.has('children')) shouldSupportChildren(Component, Wrapper, props);
  if (checks.has('clickHandler')) shouldSupportClickHandler(Component, Wrapper, props);
  if (checks.has('disabled')) shouldSupportDisabled(Component, Wrapper, props);
  if (checks.has('tag')) shouldSupportTag(Component, Wrapper, props, tagCases);
};
