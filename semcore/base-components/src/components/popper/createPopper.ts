import {
  popperGenerator,
  eventListeners,
  popperOffsets,
  computeStyles,
  applyStyles,
  offset,
  flip,
  preventOverflow,
  hide,
  arrow,
} from '@popperjs/core';
import arrowOffset from './arrowOffset';
import { cursorAnchoringModifier } from './modifiers/cursorAnchoring';

const defaultModifiers = [
  eventListeners,
  cursorAnchoringModifier,
  popperOffsets,
  computeStyles,
  applyStyles,
  offset,
  flip,
  preventOverflow,
  arrow,
  arrowOffset,
  hide,
];

export default popperGenerator({ defaultModifiers });
