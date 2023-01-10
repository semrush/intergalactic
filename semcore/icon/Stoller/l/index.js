'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties'),
);

var _react = _interopRequireDefault(require('react'));

var _core = require('@semcore/core');

var _icon = _interopRequireDefault(require('@semcore/icon'));

var logger = _interopRequireDefault(require('@semcore/utils/lib/logger'));

var _excluded = ['width', 'height', 'viewBox'];

function Stoller(_ref, ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? '24' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '24' : _ref$height,
    _ref$viewBox = _ref.viewBox,
    viewBox = _ref$viewBox === void 0 ? '0 0 24 24' : _ref$viewBox,
    props = (0, _objectWithoutProperties2['default'])(_ref, _excluded);
  return /*#__PURE__*/ _react['default'].createElement(
    _icon['default'],
    (0, _extends2['default'])(
      {
        ref: ref,
        'data-name': 'Stoller',
        'data-group': 'l',
        width: width,
        height: height,
        viewBox: viewBox,
      },
      props,
    ),
    /*#__PURE__*/ _react['default'].createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M5.129 5.89 6.535 8H13V1.818C13 .814 13.814 0 14.818 0h.682a7.5 7.5 0 0 1 0 15H10a5 5 0 0 1-5-5v-.696L3.466 7H2a1 1 0 0 1 0-2h1.465a2 2 0 0 1 1.664.89ZM13 10a2 2 0 0 0 2-2V2h.5a5.5 5.5 0 1 1 0 11H10a3 3 0 0 1-3-3h6ZM7 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM15 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      shapeRendering: 'geometricPrecision',
    }),
  );
}

Stoller.displayName = 'Stoller';

var _default = (0, _core.createBaseComponent)(Stoller);

logger.warn(true, 'The "Stoller" icon is deprecated. Use the "Stroller"', 'Icon');

exports['default'] = _default;
