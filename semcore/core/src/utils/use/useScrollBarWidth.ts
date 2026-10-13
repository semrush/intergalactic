import { useEffect, useRef, useState } from 'react';

import canUseDOM from '../canUseDOM';

type Dimension = 'vertical' | 'horizontal';

const state: Record<Dimension, number> = { vertical: 0, horizontal: 0 };
const listeners = new Set<() => void>();

let rafId: number | null = null;
let inited = false;
let observer: ResizeObserver | null = null;

function measure() {
  if (!canUseDOM()) return;

  const root = document.documentElement;

  const nextVertical = window.innerWidth - root.clientWidth;
  const nextHorizontal = window.innerHeight - root.clientHeight;

  if (nextVertical === state.vertical && nextHorizontal === state.horizontal) return;

  state.vertical = nextVertical;
  state.horizontal = nextHorizontal;

  listeners.forEach((l) => l());
}

function handleResize() {
  if (rafId !== null) return;

  rafId = requestAnimationFrame(() => {
    measure();
    rafId = null;
  });
}

function init() {
  if (inited || !canUseDOM()) return;

  inited = true;

  measure();

  window.addEventListener('resize', handleResize);

  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);
  }
}

function destroy() {
  if (!inited) return;

  inited = false;

  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.removeEventListener('resize', handleResize);

  observer?.disconnect();
  observer = null;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  init();

  return () => {
    listeners.delete(onStoreChange);

    if (listeners.size === 0) {
      destroy();
    }
  };
}

export function useScrollBarWidth(vertical = true): number {
  const dim: Dimension = vertical ? 'vertical' : 'horizontal';
  const [value, setValue] = useState(() => state[dim]);
  const dimRef = useRef(dim);

  dimRef.current = dim;

  useEffect(() => {
    const onChange = () => setValue(state[dimRef.current]);

    const unsubscribe = subscribe(onChange);

    onChange();

    return unsubscribe;
  }, []);

  return value;
}
