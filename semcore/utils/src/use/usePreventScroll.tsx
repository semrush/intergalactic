import { useMemo, useRef, useEffect } from 'react';
import canUseDOM from '../canUseDOM';

export function getScrollbarWidth() {
  if (!canUseDOM()) return;
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  // @ts-expect-error
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

export default function usePreventScroll(visible = true) {
  const scrollbarWidth = useMemo(getScrollbarWidth, [getScrollbarWidth]);
  const paddingRightRef = useRef<string>(null);
  const overflowRef = useRef<string>(null);
  useEffect(() => {
    if (!canUseDOM() || !visible) return;

    const { overflow, paddingRight } = window.getComputedStyle(document.body);
    paddingRightRef.current = paddingRight;
    overflowRef.current = overflow;

    const intPaddingRight = !Number.isNaN(Number(paddingRight))
      ? Number(paddingRight)
      : Number.parseInt(paddingRight, 10);

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + intPaddingRight + 'px';

    return () => {
      document.body.style.overflow = overflowRef.current;
      document.body.style.paddingRight = paddingRightRef.current;
    };
  }, [visible]);
}
