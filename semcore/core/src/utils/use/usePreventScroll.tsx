import React from 'react';
import canUseDOM from '../canUseDOM';
import { useUID } from '../uniqueID';

export function getScrollbarWidth(): number {
  if (!canUseDOM()) return 0;
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

  outer.parentNode?.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

function getIntValueFromCss(value: any) {
  return !Number.isNaN(Number(value)) ? Number(value) : Number.parseInt(value, 10);
}

const scrollPreventers = new Set<string>();
const lockedBodyStyles = {
  paddingRight: null as string | null,
  overflow: null as string | null,
  boxSizing: null as string | null,
};
export default function usePreventScroll(visible = true, disabled = false) {
  const scrollbarWidth = React.useMemo(getScrollbarWidth, [getScrollbarWidth]);
  const id = useUID('scroll-preventer-');

  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM() || !visible) return;
    scrollPreventers.add(id);
    if (scrollPreventers.size > 1) return;

    const { overflow, paddingRight, boxSizing } = window.getComputedStyle(document.body);
    lockedBodyStyles.paddingRight = paddingRight;
    lockedBodyStyles.overflow = overflow;
    lockedBodyStyles.boxSizing = boxSizing;

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
  }, [visible, id, disabled]);

  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM() || !visible) return;
    return () => {
      scrollPreventers.delete(id);
      if (scrollPreventers.size !== 0) return;
      document.body.style.overflow = lockedBodyStyles.overflow!;
      document.body.style.paddingRight = lockedBodyStyles.paddingRight!;
      document.body.style.boxSizing = lockedBodyStyles.boxSizing!;
    };
  }, [visible, id, disabled]);
}
