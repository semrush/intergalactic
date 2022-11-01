'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = resolveColor;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));
/*__semcore-vars__:"./var.css"*/

/* @ts-ignore */

var COLORS = {
  green: `#4fae33`,
  cyan: `#00b0ed`,
};

function resolveColor(color) {
  if (!color) return '';

  if (color in COLORS) {
    return COLORS[color];
  }

  return color;
}