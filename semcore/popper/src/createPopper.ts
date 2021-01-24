// @ts-ignore
// eslint-disable-next-line import/named
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

const defaultModifiers = [
  eventListeners,
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
