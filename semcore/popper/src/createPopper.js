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
import maxSize from 'popper-max-size-modifier';
import arrowOffset from './arrowOffset';
import { applyMaxSize } from './modifiers/applyMaxSize';
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
  maxSize,
  applyMaxSize,
];

export default popperGenerator({ defaultModifiers });
