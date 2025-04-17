import { isFocusable } from '@semcore/core/lib/utils/focus-lock/isFocusable';

type FocusableElement = Element & { focus: () => void };

const findNextFocusableElementInChildren = (element: Element | null): FocusableElement | null => {
  if (element && isFocusable(element)) {
    return element as FocusableElement;
  }

  const children = element?.children;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const childChild = children.item(i);
      if (!childChild) continue;
      const result = findNextFocusableElementInChildren(childChild);
      if (result) return result;
    }
  }

  return null;
};

const makeParentsChain = (element: Element): Element[] => {
  const parents = [];
  let parent = element.parentElement;

  while (parent) {
    parents.push(parent);
    parent = parent.parentElement;
  }

  return parents;
};

export const heavyFindNextFocusableElement = (base: Element): FocusableElement | null => {
  const parents = makeParentsChain(base);
  for (let i = 0; i < parents.length; i++) {
    const parent = parents[i];
    let siblings = Array.from(parent?.children ?? []);
    if (siblings.indexOf(parents[i - 1] || base) !== -1) {
      siblings = siblings.slice(siblings.indexOf(parents[i - 1] || base) + 1);
    }

    for (let i = 0; i < siblings.length; i++) {
      const focusable = findNextFocusableElementInChildren(siblings[i]);
      if (focusable) return focusable;
    }
  }

  return null;
};
