const isFocusable = (element: Element) => {
  const tabIndex = element.getAttribute('tabindex');
  if (tabIndex) {
    const tabIndexValue = parseInt(tabIndex, 10);
    if (!isNaN(tabIndexValue) && tabIndexValue >= 0) return element;
  }

  const { tagName } = element;

  if ('INPUT' === tagName) return !element.getAttribute('disabled');
  if ('A' === tagName || 'AREA' === tagName) return element.hasAttribute('href');
  if ('BODY' === tagName || 'IFRAME' === tagName) return true;
};

type FocusableElement = Element & { focus: () => void };

const findNextFocusableElementInChildren = (element: Element | null): FocusableElement | null => {
  const children = element?.children;

  if (element && isFocusable(element)) {
    return element as FocusableElement;
  }

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const childChild = children.item(i);

      if (childChild) {
        return findNextFocusableElementInChildren(childChild);
      }
    }
  }

  return null;
};

export const heavyFindNextFocusableElement = (
  base: Element,
  trace: Map<Element, true> = new Map(),
): FocusableElement | null => {
  trace.set(base, true);
  let sibling = base.nextElementSibling;
  if (sibling) {
    trace.set(sibling, true);
    for (let i = 0; i < sibling.children.length; i++) {
      const child = sibling.children.item(i);
      if (!child) continue;
      if (trace.has(child)) continue;
      if (isFocusable(child)) return child as FocusableElement;
      const childInnerResult = findNextFocusableElementInChildren(child.children.item(0));
      if (childInnerResult) return childInnerResult;
    }
    while (sibling) {
      if (isFocusable(sibling)) return sibling as FocusableElement;
      if (!trace.has(sibling)) {
        const siblingInnerResult = findNextFocusableElementInChildren(sibling.children.item(0));
        if (siblingInnerResult) return siblingInnerResult;
      }
      sibling = sibling.nextElementSibling;
    }
  }

  if (!base.parentElement || trace.has(base.parentElement)) return null;

  return heavyFindNextFocusableElement(base.parentElement, trace);
};
