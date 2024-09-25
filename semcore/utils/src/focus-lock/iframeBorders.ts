import { hasParent } from '../hasParent';

const iframeBorders = new Set<HTMLElement>();

export const addIframeBorders = (excludeFor: HTMLElement | null) => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    if (excludeFor !== null && hasParent(iframe, excludeFor)) {
      return;
    }

    const iframeBefore = document.createElement('div');
    iframeBefore.style.position = 'fixed';
    iframeBefore.setAttribute('tabindex', '0');
    const iframeAfter = document.createElement('div');
    iframeAfter.style.position = 'fixed';
    iframeAfter.setAttribute('tabindex', '0');
    iframeBefore.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === iframeBefore &&
          event.relatedTarget !== iframeAfter && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          iframeAfter?.focus();
        }
      });
    });
    iframeAfter.addEventListener('focus', (event) => {
      Promise.resolve().then(() => {
        if (
          document.activeElement === iframeAfter &&
          event.relatedTarget !== iframeBefore && // prevent loop
          event.relatedTarget // prevent initial focus
        ) {
          iframeBefore?.focus();
        }
      });
    });
    iframe.before(iframeBefore);
    iframe.after(iframeAfter);
    iframeBorders.add(iframeBefore);
    iframeBorders.add(iframeAfter);
  });
};
export const removeIframeBorders = () => {
  iframeBorders.forEach((node) => node?.remove());
  iframeBorders.clear();
};
export const areIframeBordersPlacedCorrectly = (excludeFor: HTMLElement | null) => {
  const iframes = Array.from(document.querySelectorAll('iframe')).filter((iframe) => {
    return excludeFor === null || !hasParent(iframe, excludeFor);
  });

  if (iframes.length * 2 === iframeBorders.size) return false;

  return iframes.every((iframe) => {
    const nodeBeforeIframe = iframe.previousSibling as any;
    const nodeAfterIframe = iframe.nextSibling as any;

    return iframeBorders.has(nodeBeforeIframe) && iframeBorders.has(nodeAfterIframe);
  });
};
