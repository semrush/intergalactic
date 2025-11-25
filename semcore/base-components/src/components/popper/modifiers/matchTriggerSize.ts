import type { Modifier } from '@popperjs/core';

type Options = {
  popperCtx?: React.Component;
};

export const matchTriggerSize: Modifier<'matchTriggerSize', Options> = {
  name: 'matchTriggerSize',
  enabled: false,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn({ state, options }) {
    const { popperCtx } = options;
    const { width, height } = state.rects.reference;
    const styles = { ...state.styles.popper };

    if (state.placement.startsWith('top') || state.placement.startsWith('bottom')) {
      styles.maxWidth = `${width}px`;
    }
    if (state.placement.startsWith('left') || state.placement.startsWith('right')) {
      styles.maxHeight = `${height}px`;
    }

    state.styles.popper = styles;

    popperCtx?.forceUpdate();
  },
};
