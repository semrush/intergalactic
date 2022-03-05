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

function getIntValueFromCss(value) {
  return !Number.isNaN(Number(value)) ? Number(value) : Number.parseInt(value, 10);
}

export default function usePreventScroll(visible = true) {
  const scrollbarWidth = useMemo(getScrollbarWidth, [getScrollbarWidth]);
  const paddingRightRef = useRef<string>(null);
  const overflowRef = useRef<string>(null);
  const boxSizingRef = useRef<string>(null);

  useEffect(() => {
    if (!canUseDOM() || !visible) return;

    const { overflow, paddingRight, boxSizing } = window.getComputedStyle(document.body);
    paddingRightRef.current = paddingRight;
    overflowRef.current = overflow;
    boxSizingRef.current = boxSizing;

    const intPaddingRight = getIntValueFromCss(paddingRight);
    let intPaddingRightFromStyle = getIntValueFromCss(document.body.style.paddingRight);
    // Detected own style for window inside window
    if (intPaddingRightFromStyle !== scrollbarWidth) {
      intPaddingRightFromStyle = 0;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight =
      scrollbarWidth + (intPaddingRight - intPaddingRightFromStyle) + 'px';
    document.body.style.boxSizing = 'border-box';

    return () => {
      document.body.style.overflow = overflowRef.current;
      document.body.style.paddingRight = paddingRightRef.current;
      document.body.style.boxSizing = boxSizingRef.current;
    };
  }, [visible]);
}
