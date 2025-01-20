import { callAllEventHandlers } from '../assignProps';
import React from 'react';

type OnNeighborChange<P> = (neighborElement: HTMLElement, props: P) => void;
type FindNeighbor = (
  listSelectors: HTMLElement[],
  element: HTMLElement,
  direction: string,
) => HTMLElement | undefined;
type ChildSelector<P> = [string, string] | ((props: P) => [string, string]);

type A11yEnhanceOptions<P = any> = {
  findNeighbor?: FindNeighbor;
  onNeighborChange?: OnNeighborChange<P>;
  childSelector: ChildSelector<P>;
};

const defaultOnNeighborChange: OnNeighborChange<any> = (neighborElement) => {
  neighborElement?.focus();
};

const defaultFindNeighbor: FindNeighbor = (listSelectors, element, direction) => {
  const elementSibling = ['right', 'top'].includes(direction) ? 1 : -1;
  const indexElement = listSelectors.findIndex((node) => node === element);
  const lengthList = listSelectors.length;

  const lastIndex = lengthList - 1;
  let indexNext = indexElement + elementSibling;
  if (indexNext < 0) indexNext = lastIndex;
  if (indexNext > lastIndex) indexNext = 0;
  return listSelectors[indexNext];
};

const a11yEnhance = (options: A11yEnhanceOptions) => {
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
      if ('disabled' in neighbor && neighbor.disabled)
        return getNeighbor(listSelectors, neighbor, direction);
      return neighbor;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      const parent = event.currentTarget;
      const selectedElement = event.target as HTMLElement;
      const [childAttrName, childAttrValue] =
        typeof childSelector === 'function' ? childSelector(props) : childSelector;
      if (!selectedElement.getAttribute(childAttrName)) return;

      const listSelectors = Array.from(
        parent.querySelectorAll(`[${childAttrName}="${childAttrValue}"]`),
      );
      if (!listSelectors.length)
        throw `no children found querySelectorAll([${childAttrName}="${childAttrValue}"] a11yEnhance for ${props['data-ui-name']}`;

      switch (event.key) {
        case 'ArrowLeft':
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'left'), props);
          event.preventDefault();
          break;
        case 'ArrowTop':
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'top'), props);
          event.preventDefault();
          break;
        case 'ArrowRight':
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'right'), props);
          event.preventDefault();
          break;
        case 'ArrowBottom':
          onNeighborChange(getNeighbor(listSelectors, selectedElement, 'bottom'), props);
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
