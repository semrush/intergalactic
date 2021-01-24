import canUseDOM from './canUseDOM';

export default function syncScroll() {
  const refs = new Map();

  function handlerScroll(e) {
    const scrolledNode = e.currentTarget;
    if (!canUseDOM()) return;
    window.requestAnimationFrame(() => {
      refs.forEach((node) => {
        if (scrolledNode !== node) {
          node.removeEventListener('scroll', handlerScroll);
          syncScrollPosition(scrolledNode, node);
          window.requestAnimationFrame(() => {
            node.addEventListener('scroll', handlerScroll);
          });
        }
      });
    });
  }

  function syncScrollPosition(scrolledNode, node) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = scrolledNode;

    const scrollTopOffset = scrollHeight - clientHeight;
    const scrollLeftOffset = scrollWidth - clientWidth;

    const nodeHeight = node.scrollHeight - clientHeight;
    const nodeWidth = node.scrollWidth - clientWidth;

    if (scrollTopOffset > 0) {
      node.scrollTop = (nodeHeight * scrollTop) / scrollTopOffset;
    }
    if (scrollLeftOffset > 0) {
      node.scrollLeft = (nodeWidth * scrollLeft) / scrollLeftOffset;
    }
  }

  return (name) => {
    refs.set(name, null);
    return (ref) => {
      refs.get(name)?.removeEventListener('scroll', handlerScroll);
      refs.set(name, ref);
      if (ref) {
        ref.addEventListener('scroll', handlerScroll);
        const scrolledNode = refs.values()[0];
        if (scrolledNode) {
          syncScrollPosition(scrolledNode, ref);
        }
      }
    };
  };
}
