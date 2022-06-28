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

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
type FocusableElement = Element & { focus: () => void };

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
      const childInnerResult = heavyFindNextFocusableElement(child, trace);
      if (childInnerResult) return childInnerResult;
    }
    while (sibling) {
      if (isFocusable(sibling)) return sibling as FocusableElement;
      if (!trace.has(sibling)) {
        const siblingInnerResult = heavyFindNextFocusableElement(sibling, trace);
        if (siblingInnerResult) return siblingInnerResult;
      }
      sibling = sibling.nextElementSibling;
    }
  }

  if (!base.parentElement || trace.has(base.parentElement)) return null;

  return heavyFindNextFocusableElement(base.parentElement, trace);
};
