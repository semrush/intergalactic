import { useEffect, useRef, useState } from 'react';

type Dimension = 'vertical' | 'horizontal';

const state: Record<Dimension, number> = { vertical: 0, horizontal: 0 };
const listeners = new Set<() => void>();

let rafId: number | null = null;
let inited = false;

function measure() {
  if (!window.visualViewport) return;

  const nextVertical = window.innerWidth - window.visualViewport.width;
  const nextHorizontal = window.innerHeight - window.visualViewport.height;

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
  if (inited) return;

  inited = true;

  measure();

  window.addEventListener('resize', handleResize);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  init();

  return () => {
    listeners.delete(onStoreChange);

    if (listeners.size === 0) {
      window.removeEventListener('resize', handleResize);
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

    onChange();

    return subscribe(onChange);
  }, []);

  return value;
}
