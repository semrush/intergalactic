// extracted from @popperjs/core@2.11.5 to make it buildable

const getWindow = (node: any): any => {
  if (node.toString() !== '[object Window]') {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
};

const getNodeName = (element?: Node | Window): string => {
  return element ? ((element as any).nodeName || '').toLowerCase() : null;
};

const getComputedStyle = (element: Element): CSSStyleDeclaration => {
  return getWindow(element).getComputedStyle(element);
};

const isHTMLElement = (node: any) => {
  const OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
};

const isTableElement = (element: Element): boolean => {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
};

// https://stackoverflow.com/a/9851769/2059996
const isFirefox = () => typeof (window as any).InstallTrigger !== 'undefined';

const getTrueOffsetParent = (element: HTMLElement): HTMLElement | null => {
  let offsetParent;

  if (
    !isHTMLElement(element) ||
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    !(offsetParent = element.offsetParent) ||
    // https://github.com/popperjs/popper-core/issues/837
    (isFirefox() && getComputedStyle(offsetParent).position === 'fixed')
  ) {
    return null;
  }

  return offsetParent as HTMLElement;
};

export const getOffsetParent = (element: HTMLElement) => {
  const window = getWindow(element);

  let offsetParent = getTrueOffsetParent(element);

  // Find the nearest non-table offsetParent
  while (offsetParent && isTableElement(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (
    offsetParent &&
    getNodeName(offsetParent) === 'body' &&
    getComputedStyle(offsetParent).position === 'static'
  ) {
    return window;
  }

  return offsetParent || window;
};
