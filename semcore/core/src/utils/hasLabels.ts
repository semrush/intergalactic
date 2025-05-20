const traverseChildren = (children: Element[], traversed: Set<Element>): boolean => {
  for (const child of children) {
    if (traversed.has(child)) continue;
    traversed.add(child);
    if (child.hasAttribute('aria-label')) return true;
    if (child.hasAttribute('aria-labelledby')) return true;
    if (child?.children) {
      const children: Element[] = []; // to exclude need of `[Symbol.iterator]()` in libs. May be replaced with simpler `[...child.children]` some day.
      for (let i = 0; i < child.children.length; i++) children.push(child.children.item(i)!);
      const result = traverseChildren(children, traversed);
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

  const traversed = new Set<Element>();
  return traverseChildren([node], traversed);
};

export default hasLabels;
