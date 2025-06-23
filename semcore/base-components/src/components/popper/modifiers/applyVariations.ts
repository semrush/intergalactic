import type { Placement, Modifier } from '@popperjs/core';
import { detectOverflow } from '@popperjs/core';

const supportedPlacements: Placement[] = ['bottom', 'top'];

export const applyVariations: Modifier<'applyVariations', {}> = {
  name: 'applyVariations',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['offset'],
  fn({ state }) {
    if (!supportedPlacements.includes(state.placement)) return;

    const { left, right } = detectOverflow(state);

    if (right >= 0) {
      state.placement = `${state.placement}-end` as Placement;
    }

    if (left >= 0) {
      state.placement = `${state.placement}-start` as Placement;
    }
  },
};
