import { getFocusableIn } from './getFocusableIn';

const focusBordersRefs = new Map<HTMLElement, { before: HTMLElement; after: HTMLElement }>();

export const BEFORE_BORDER_ID = '__intergalactic-focus-border-before';
export const AFTER_BORDER_ID = '__intergalactic-focus-border-after';

export const addFocusBorders = (element: HTMLElement) => {
  if (!focusBordersRefs.has(element)) {
    const before = document.createElement('div');
    const after = document.createElement('div');

    focusBordersRefs.set(element, { before, after });

    before.setAttribute('tabindex', '0');
    before.style.position = 'fixed';
    before.dataset.id = BEFORE_BORDER_ID;
    before.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === focusBordersRefs.get(element)?.before &&
          event.relatedTarget !== focusBordersRefs.get(element)?.after && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          const focusable = getFocusableIn(element);
          focusable[focusable.length - 1]?.focus();
        }
      });
    });

    after.setAttribute('tabindex', '0');
    after.style.position = 'fixed';
    after.dataset.id = AFTER_BORDER_ID;
    after.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === focusBordersRefs.get(element)?.after &&
          event.relatedTarget !== focusBordersRefs.get(element)?.before && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          const focusable = getFocusableIn(element);
          focusable[0]?.focus();
        }
      });
    });

    element.prepend(before);
    element.append(after);
  }
};
export const removeFocusBorders = (element: HTMLElement) => {
  const focusRefs = focusBordersRefs.get(element);
  focusRefs?.before.remove();
  focusRefs?.after.remove();
  focusBordersRefs.delete(element);
};
