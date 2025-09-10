import { useEffect, useState, useCallback } from 'react';

function useFocusableScrollRef<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const updateFocusability = () => {
      const hasScroll =
        node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth;

      if (hasScroll) {
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'group');
      } else {
        node.removeAttribute('tabindex');
        node.removeAttribute('role');
      }
    };

    updateFocusability();

    const resizeObserver = new ResizeObserver(updateFocusability);
    resizeObserver.observe(node);

    const mutationObserver = new MutationObserver(updateFocusability);
    mutationObserver.observe(node, { childList: true, subtree: true, characterData: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [node]);

  return ref;
}

export default useFocusableScrollRef;
