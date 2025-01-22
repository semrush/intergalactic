import { Modifier } from '@popperjs/core';

type Options = {
  margin?: number;
  minSize?: number;
};

export const applyMaxSize: Modifier<'applyMaxSize', Options> = {
  name: 'applyMaxSize',
  enabled: false,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn({ state, options }) {
    const { margin = 0 } = options;
    const { width, height } = state.modifiersData.maxSize;

    const styles = { ...state.styles.popper };

    if (state.placement.startsWith('top') || state.placement.startsWith('bottom')) {
      styles.maxHeight = `${height - margin}px`;
    } else {
      styles.maxWidth = `${width - margin}px`;
    }

    state.styles.popper = styles;
  },
};
