import { getFocusableIn } from './getFocusableIn';

const focusBordersRefs = new Map<HTMLElement, { before: HTMLElement; after: HTMLElement }>();

export const BEFORE_BORDER_ID = '__intergalactic-focus-border-before';
export const AFTER_BORDER_ID = '__intergalactic-focus-border-after';

export const addFocusBorders = (element: HTMLElement) => {
  if (
    !focusBordersRefs.has(element) &&
    !(
      element.previousSibling instanceof HTMLElement &&
      element.previousSibling.dataset.id === BEFORE_BORDER_ID
    )
  ) {
    const before = document.createElement('div');
    const after = document.createElement('div');

    focusBordersRefs.set(element, { before, after });

    before.setAttribute('tabindex', '0');
    before.style.position = 'fixed';
    before.dataset.id = BEFORE_BORDER_ID;
    before.addEventListener('focus', (event) => {
      if (
        document.activeElement === focusBordersRefs.get(element)?.before &&
        event.relatedTarget !== focusBordersRefs.get(element)?.after && // prevent loop
        event.relatedTarget // prevent initial focus
      ) {
        const focusable = getFocusableIn(element);

        if (event.relatedTarget === focusable[0]) {
          focusable[focusable.length - 1]?.focus();
        } else {
          focusable[0]?.focus();
        }
      }
    });

    after.setAttribute('tabindex', '0');
    after.style.position = 'fixed';
    after.dataset.id = AFTER_BORDER_ID;
    after.addEventListener('focus', (event) => {
      if (
        document.activeElement === focusBordersRefs.get(element)?.after &&
        event.relatedTarget !== focusBordersRefs.get(element)?.before && // prevent loop
        event.relatedTarget // prevent initial focus
      ) {
        const focusable = getFocusableIn(element);

        if (event.relatedTarget === focusable[focusable.length - 1]) {
          focusable[0]?.focus();
        } else {
          focusable[focusable.length - 1]?.focus();
        }
      }
    });

    const elementParent = element.parentElement;

    elementParent?.insertBefore(before, element);
    elementParent?.append(after);
  }
};
export const removeFocusBorders = (element: HTMLElement) => {
  const focusRefs = focusBordersRefs.get(element);
  focusRefs?.before.remove();
  focusRefs?.after.remove();
  focusBordersRefs.delete(element);
};
