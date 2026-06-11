type Expected = {
  uiName: string | null;
  children: Expected[];
};

export function extractUIName(element: HTMLElement | SVGElement): Expected {
  const children: Expected[] = [];

  element.childNodes.forEach((child) => {
    if (child.parentElement === element && (child instanceof HTMLElement || child instanceof SVGElement)) {
      children.push(extractUIName(child));
    }
  });

  const uiName = element.getAttribute('data-ui-name');

  return {
    uiName,
    children,
  };
}
