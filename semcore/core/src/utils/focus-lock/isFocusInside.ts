import { hasParent } from '../hasParent';

export const isFocusInside = (
  topNode: HTMLElement | HTMLElement[],
  actualActiveElement?: HTMLElement,
): boolean => {
  const activeElement = actualActiveElement || document.activeElement;
  const nodes = Array.isArray(topNode) ? topNode : [topNode];
  return nodes.some((node) => hasParent(activeElement, node));
};
