import canUseDOM from './canUseDOM';

export default function syncScroll() {
  const refs = new Map<string, null | HTMLElement>();

  function handlerScroll(event: any) {
    const scrolledNode = event.currentTarget;
    if (!canUseDOM()) return;
    window.requestAnimationFrame(() => {
      refs.forEach((node) => {
        if (scrolledNode !== node && node) {
          node.removeEventListener('scroll', handlerScroll);
          syncScrollPosition(scrolledNode, node);
          window.requestAnimationFrame(() => {
            node.addEventListener('scroll', handlerScroll);
          });
        }
      });
    });
  }

  function syncScrollPosition(scrolledNode: HTMLElement, node: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
      scrolledNode;

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

  return (name: string) => {
    refs.set(name, null);
    return (ref: any) => {
      refs.get(name)?.removeEventListener('scroll', handlerScroll);
      refs.set(name, ref);
      if (ref) {
        ref.addEventListener('scroll', handlerScroll);
        const scrolledNode = [...refs.values()][0];
        if (scrolledNode) {
          syncScrollPosition(scrolledNode, ref);
        }
      }
    };
  };
}
