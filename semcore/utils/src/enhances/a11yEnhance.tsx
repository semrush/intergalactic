import { callAllEventHandlers } from '../assignProps';

const defaultOnNeighborChange = (neighborElement: HTMLElement) => {
  neighborElement?.focus();
};

const defaultFindNeighbor = (
  listSelectors: HTMLElement[],
  element: HTMLElement,
  direction: string,
) => {
  const elementSibling = ['right', 'top'].includes(direction) ? 1 : -1;
  const indexElement = listSelectors.findIndex((node) => node === element);
  const lengthList = listSelectors.length;

  const lastIndex = lengthList - 1;
  let indexNext = indexElement + elementSibling;
  if (indexNext < 0) indexNext = lastIndex;
  if (indexNext > lastIndex) indexNext = 0;
  return listSelectors[indexNext];
};

const a11yEnhance = (options: { [key: string]: any } = {}) => {
  const findNeighbor = options.findNeighbor || defaultFindNeighbor;
  const onNeighborChange = options.onNeighborChange || defaultOnNeighborChange;
  const { childSelector } = options;

  return (props: any) => {
    if (!childSelector)
      throw `parameter childSelector not passed in options for a11yEnhance for ${props['data-ui-name']}`;
    const getNeighbor = (
      listSelectors: any,
      element: HTMLElement,
      direction: string,
    ): HTMLElement => {
      const neighbor = findNeighbor(listSelectors, element, direction);
      if (!neighbor) return element;
      if (neighbor.disabled) return getNeighbor(listSelectors, neighbor, direction);
      return neighbor;
    };

    const handleKeyDown = (event: any) => {
      const parent = event.currentTarget;
      const selectedElement = event.target;
      const [childAttrName, childAttrValue] = childSelector;
      if (!selectedElement.getAttribute(childAttrName)) return;

      const listSelectors = Array.from(
        parent.querySelectorAll(`[${childAttrName}="${childAttrValue}"]`),
      );
      if (!listSelectors.length)
        throw `no children found querySelectorAll([${childAttrName}="${childAttrValue}"] a11yEnhance for ${props['data-ui-name']}`;

      switch (event.keyCode) {
        case 37:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'left'));
          event.preventDefault();
          break;
        case 38:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'top'));
          event.preventDefault();
          break;
        case 39:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'right'));
          event.preventDefault();
          break;
        case 40:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'bottom'));
          event.preventDefault();
          break;
      }
    };

    return {
      ...props,
      onKeyDown: callAllEventHandlers(props.onKeyDown, handleKeyDown),
    };
  };
};

export default a11yEnhance;
