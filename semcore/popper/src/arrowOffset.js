import { ModifierArguments, Options, Modifier } from '@popperjs/core/lib';
import capitalizeFirstLetter from '@semcore/utils/lib/capitalizeFirstLetter';

const MAP_OFFSET = {
  top: 'width',
  bottom: 'width',
  left: 'height',
  right: 'height',
};

const MAP_COORDINATE = {
  width: 'x',
  height: 'y',
};

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

function arrowOffset({ state }) {
  if (isEmpty(state.modifiersData['arrow']) || isEmpty(!state.modifiersData['popperOffsets'])) return;

  const [position, align] = state.placement.split('-');
  const offset = MAP_OFFSET[position];
  const coordinate = MAP_COORDINATE[offset];
  const padding = state.options.modifiers.find((mod) => mod.name === 'arrow')?.options.padding || 0;
  if (align === 'start') {
    const lenRef = state.rects.reference[offset];
    state.modifiersData.arrow[coordinate] = padding;
    if (lenRef / 2 < padding) {
      const lenArrow = state.elements.arrow[`offset${capitalizeFirstLetter(offset)}`];
      const offsetArrow = lenArrow / 2 + padding - lenRef / 2 + 0.5;
      state.modifiersData.popperOffsets[coordinate] -= offsetArrow;
    }
  }

  if (align === 'end') {
    const lenRef = state.rects.reference[offset];
    const lenPopper = state.rects.popper[offset];
    const lenArrow = state.elements.arrow[`offset${capitalizeFirstLetter(offset)}`];

    state.modifiersData.arrow[coordinate] = lenPopper - lenArrow - padding;
    if (lenRef / 2 < padding) {
      const offsetArrow = lenArrow / 2 + padding - lenRef / 2;
      state.modifiersData.popperOffsets[coordinate] += offsetArrow;
    }
  }
}

const ArrowOffsetModifier = {
  name: 'arrowOffset',
  enabled: true,
  phase: 'main',
  fn: arrowOffset,
  requires: ['arrow', 'popperOffsets'],
  requiresIfExists: ['arrow'],
};

export default ArrowOffsetModifier;
