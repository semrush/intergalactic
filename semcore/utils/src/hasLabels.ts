const traverseChildren = (children: Element[], traversed: Set<Element>) => {
  for (const child of children) {
    if (traversed.has(child)) continue;
    traversed.add(child);
    if (child.hasAttribute('aria-label')) return true;
    if (child.hasAttribute('aria-labelledby')) return true;
    if (child && child.children) {
      const result = traverseChildren([...child.children], traversed);
      if (result) return result;
    }
  }
  return false;
};

/**
 * Traverses over all nested dom nodes and return true only if
 * dom node or it's children have text, aria-label attribute or
 * aria-labelledby attribute
 */
const hasLabels = (node: HTMLElement | null) => {
  if (!node) return false;
  if (node.textContent && node.textContent.length > 0) return true;
  if (!('children' in node)) return false;

  const traversed = new Set<Element>();
  return traverseChildren([node], traversed);
};

export default hasLabels;
