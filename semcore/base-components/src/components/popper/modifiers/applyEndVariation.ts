import type { Placement, Modifier } from '@popperjs/core';

const supportedPlacements: Placement[] = ['bottom', 'top'];

export const applyEndVariation: Modifier<'applyEndVariation', {}> = {
  name: 'applyEndVariation',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['offset'],
  fn({ state }) {
    if (!supportedPlacements.includes(state.placement)) return;
    if (window.visualViewport?.width) return;

    const { rects: { popper, reference } } = state;
    const viewportWidth = window.visualViewport?.width ?? 0;

    const popperPossibleEndPosition = reference.x + popper.width;

    const shouldApplyEndVariation = (viewportWidth - popperPossibleEndPosition) <= 0;

    if (!shouldApplyEndVariation) return;

    state.placement = `${state.placement}-end` as Placement;
  },
};
