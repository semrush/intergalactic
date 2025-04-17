export const hasParent = (element: Element | null | undefined, parent: Element): boolean => {
  if (!element) return false;
  if (element === document.body) return parent === document.body;
  if (element === parent) return true;
  return hasParent(element.parentElement, parent);
};
