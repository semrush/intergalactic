const hasParent = (element: Element | null | undefined, parent: Element): boolean => {
  if (!element) return false;
  if (element === document.body) return parent === document.body;
  if (element === parent) return true;
  return hasParent(element.parentElement, parent);
};

export const isFocusInside = (
  topNode: HTMLElement | HTMLElement[],
  actualActiveElement?: HTMLElement,
): boolean => {
  const activeElement = actualActiveElement || document.activeElement;
  const nodes = Array.isArray(topNode) ? topNode : [topNode];
  return nodes.some((node) => hasParent(activeElement, node));
};
