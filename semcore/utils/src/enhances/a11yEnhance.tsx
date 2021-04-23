import { callAllEventHandlers } from '../assignProps';

const defaultOnNeighborChange = (neighborElement: HTMLElement) => {
  if (neighborElement) {
    neighborElement.focus();
    neighborElement.click();
  }
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
  if (indexNext === lastIndex) indexNext = 0;
  if (indexNext < 0) indexNext = lastIndex;
  return listSelectors[indexNext];
};

const a11yEnhance = (options: { [key: string]: any } = {}) => {
  const findNeighbor = options.findNeighbor || defaultFindNeighbor;
  const onNeighborChange = options.onNeighborChange || defaultOnNeighborChange;

  return (props) => {
    const getNeighbor = (listSelectors, element: HTMLElement, direction: string): HTMLElement => {
      const neighbor = findNeighbor(listSelectors, element, direction);
      if (!neighbor) return element;
      if (neighbor.disabled) return getNeighbor(listSelectors, neighbor, direction);
      return neighbor;
    };

    const handleKeyDown = (e) => {
      const parent = e.currentTarget;
      const selectedElement = e.target;
      const selector = options.item;
      if (!selector) throw `parameter item not passed in options for a11yEnhance`;
      if (!selectedElement.getAttribute(selector[0])) return;

      const listSelectors = Array.from(
        parent.querySelectorAll(`[${selector[0]}="${selector[1]}"]`),
      );
      if (!listSelectors.length)
        throw `no items found querySelectorAll([${selector[0]}="${selector[1]}"] a11yEnhance`;

      switch (e.keyCode) {
        case 37:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'left'));
          e.preventDefault();
          break;
        case 38:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'top'));
          e.preventDefault();
          break;
        case 39:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'right'));
          e.preventDefault();
          break;
        case 40:
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'bottom'));
          e.preventDefault();
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
