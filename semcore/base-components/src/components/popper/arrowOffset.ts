import capitalizeFirstLetter from '@semcore/core/lib/utils/capitalizeFirstLetter';
import { Modifier, Rect } from '@popperjs/core';
import { ModifierArguments, Offsets } from '@popperjs/core/lib/types';

const MAP_OFFSET: Record<string, keyof Rect> = {
  top: 'width',
  bottom: 'width',
  left: 'height',
  right: 'height',
};

const MAP_COORDINATE: Record<string, keyof Offsets> = {
  width: 'x',
  height: 'y',
};

function isEmpty(obj: any) {
  return !Object.keys(obj).length;
}

function arrowOffset({ state }: ModifierArguments<{}>) {
  if (isEmpty(state.modifiersData['arrow']) || isEmpty(state.modifiersData['popperOffsets']))
    return;

  const [position, align] = state.placement.split('-');
  const offset = MAP_OFFSET[position];
  const coordinate = MAP_COORDINATE[offset];
  const padding = state.options.modifiers.find((mod) => mod.name === 'arrow')?.options.padding || 0;
  if (align === 'start' && state.modifiersData.arrow) {
    const lenRef = state.rects.reference[offset];
    state.modifiersData.arrow[coordinate] = padding;
    if (lenRef / 2 < padding && state.modifiersData.popperOffsets) {
      // @ts-ignore
      const lenArrow = state.elements.arrow[`offset${capitalizeFirstLetter(offset)}`];
      const offsetArrow = lenArrow / 2 + padding - lenRef / 2 + 0.5;
      state.modifiersData.popperOffsets[coordinate] -= offsetArrow;
    }
  }

  if (align === 'end' && state.modifiersData.arrow) {
    const lenRef = state.rects.reference[offset];
    const lenPopper = state.rects.popper[offset];
    // @ts-ignore
    const lenArrow = state.elements.arrow[`offset${capitalizeFirstLetter(offset)}`];

    state.modifiersData.arrow[coordinate] = lenPopper - lenArrow - padding;
    if (lenRef / 2 < padding && state.modifiersData.popperOffsets) {
      const offsetArrow = lenArrow / 2 + padding - lenRef / 2;
      state.modifiersData.popperOffsets[coordinate] += offsetArrow;
    }
  }
}

const ArrowOffsetModifier: Modifier<'arrowOffset', {}> = {
  name: 'arrowOffset',
  enabled: true,
  phase: 'main',
  fn: arrowOffset,
  requires: ['arrow', 'popperOffsets'],
  requiresIfExists: ['arrow'],
};

export default ArrowOffsetModifier;
