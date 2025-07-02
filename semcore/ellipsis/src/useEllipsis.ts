import React from 'react';

import { useResizeObserver } from './useResizeObserver';

type EllipsisSettings = {
  trim?: 'end' | 'middle';
  maxLine?: number;
};

export function useEllipsis(ref: React.RefObject<HTMLElement>, props: EllipsisSettings) {
  console.log('useEllipsis', ref.current, props);
  if (props.trim === undefined) {
    props.trim = 'end';
  }

  const blockWidth = useResizeObserver(ref).width;
  console.log(blockWidth);

  React.useEffect(() => {
    console.log('useEllipsisEffect', ref.current, props);
    if (!ref.current) return;

    ref.current.style.setProperty('overflow', 'hidden');
    ref.current.style.setProperty('white-space', 'pre');
    ref.current.style.setProperty('display', 'inherit');

    if (props.trim === 'end') {
      ref.current.style.setProperty('text-overflow', 'ellipsis');
    }

    if (props.trim === 'middle') {
      ref.current.style.setProperty('display', 'flex');

      const styleElement = window.getComputedStyle(ref.current);
      const dateSpan = document.createElement('temporary-block');
      dateSpan.style.setProperty('font-size', styleElement.getPropertyValue('font-size'));
      dateSpan.innerHTML = 'a';
      document.body.appendChild(dateSpan);
      const symbolWidth = dateSpan.getBoundingClientRect().width;
      dateSpan.remove();
      const displayedSymbols = Math.round(blockWidth / symbolWidth);
      const text = ref.current.textContent ?? '';

      const begining = text.substring(0, text.length - displayedSymbols / 2 - 1);
      const tail = text.substring(text.length - displayedSymbols / 2 - 1);

      ref.current.innerHTML = `<span style="overflow: hidden; text-overflow: ellipsis">${begining}</span><span>${tail}</span>`;
    }

    ref.current.title = ref.current.textContent ?? '';
  }, [ref.current, props.trim, props.maxLine, blockWidth]);
}
