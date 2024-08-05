const focusBordersRefs: {
  before: HTMLElement | null;
  after: HTMLElement | null;
} = { before: null, after: null };

export const addFocusBorders = () => {
  if (!focusBordersRefs.before) {
    focusBordersRefs.before = document.createElement('div');
    focusBordersRefs.before.setAttribute('tabindex', '0');
    focusBordersRefs.before.style.position = 'fixed';
    focusBordersRefs.before.dataset.id = '__intergalactic-focus-border-before';
    focusBordersRefs.before.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === focusBordersRefs.before &&
          event.relatedTarget !== focusBordersRefs.after && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          focusBordersRefs.after?.focus();
        }
      });
    });
    document.body.prepend(focusBordersRefs.before);
  }
  if (!focusBordersRefs.after) {
    focusBordersRefs.after = document.createElement('div');
    focusBordersRefs.after.setAttribute('tabindex', '0');
    focusBordersRefs.after.dataset.id = '__intergalactic-focus-border-after';
    focusBordersRefs.after.style.position = 'fixed';
    focusBordersRefs.after.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === focusBordersRefs.after &&
          event.relatedTarget !== focusBordersRefs.before && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          focusBordersRefs.before?.focus();
        }
      });
    });
    document.body.append(focusBordersRefs.after);
  }
};
export const removeFocusBorders = () => {
  focusBordersRefs.before?.remove();
  focusBordersRefs.after?.remove();
  focusBordersRefs.before = null;
  focusBordersRefs.after = null;
};
export const areFocusBordersPlacedCorrectly = () => {
  if (!focusBordersRefs.before || !focusBordersRefs.after) return true;
  if (document.body.children[0] !== focusBordersRefs.before) return false;
  if (document.body.children[document.body.children.length - 1] !== focusBordersRefs.after)
    return false;
  return true;
};
