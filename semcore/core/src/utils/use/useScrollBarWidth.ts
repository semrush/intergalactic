import { useSyncExternalStore } from 'react';

type Dimension = 'vertical' | 'horizontal';

const state: Record<Dimension, number> = { vertical: 0, horizontal: 0 };
const listeners = new Set<() => void>();

let rafId: number | null = null;
let inited = false;

function measureAndNotifyIfNeeded() {
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
    measureAndNotifyIfNeeded();
    rafId = null;
  });
}

function init() {
  if (inited) return;

  inited = true;

  measureAndNotifyIfNeeded();

  window.addEventListener('resize', handleResize);
}

function subscribe(onStoreChange: () => void) {
  init();

  listeners.add(onStoreChange);

  return () => {
    listeners.delete(onStoreChange);

    if (listeners.size === 0) {
      window.removeEventListener('resize', handleResize);
    }
  };
}

export function useScrollBarWidth(vertical = true): number {
  const dim: Dimension = vertical ? 'vertical' : 'horizontal';

  return useSyncExternalStore(
    subscribe,
    () => state[dim],
    () => 0,
  );
}
