import type { Placement, Modifier } from '@popperjs/core';

const supportedPlacements: Placement[] = ['bottom', 'top'];

export const applyEndVariation: Modifier<'applyEndVariation', {}> = {
  name: 'applyEndVariation',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['offset'],
  fn({ state }) {
    if (!supportedPlacements.includes(state.placement)) return;
    if (!visualViewport?.width) return;

    const { rects: { popper, reference } } = state;

    const popperPosiblePosition = (reference.x + reference.width / 2) + popper.width;

    const shouldApplyEndVariation = (visualViewport.width - popperPosiblePosition) <= 0;

    if (!shouldApplyEndVariation) return;

    state.placement = `${state.placement}-end` as Placement;
  },
};
