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

var _excluded = ['width', 'height', 'viewBox'];

function Stoller(_ref, ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? '16' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '16' : _ref$height,
    _ref$viewBox = _ref.viewBox,
    viewBox = _ref$viewBox === void 0 ? '0 0 16 16' : _ref$viewBox,
    props = (0, _objectWithoutProperties2['default'])(_ref, _excluded);
  return /*#__PURE__*/ _react['default'].createElement(
    _icon['default'],
    (0, _extends2['default'])(
      {
        ref: ref,
        'data-name': 'Stoller',
        'data-group': 'm',
        width: width,
        height: height,
        viewBox: viewBox,
      },
      props,
    ),
    /*#__PURE__*/ _react['default'].createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M8 0a1 1 0 0 0-1 1v4H3.766l-.909-1.514A1 1 0 0 0 2 3H1a1 1 0 0 0 0 2h.434L2 5.946A1.016 1.016 0 0 0 2 6v1a4 4 0 0 0 4 4h3.5a5.5 5.5 0 1 0 0-11H8ZM7 7a2 2 0 0 0 2-2V2h.5a3.486 3.486 0 0 1 1.668.422A3.5 3.5 0 0 1 9.5 9H6a2 2 0 0 1-2-2h3Z',
      shapeRendering: 'geometricPrecision',
    }),
    /*#__PURE__*/ _react['default'].createElement('path', {
      d: 'M4 14.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
      shapeRendering: 'geometricPrecision',
    }),
  );
}

Stoller.displayName = 'Stoller';

var _default = (0, _core.createBaseComponent)(Stoller);

// eslint-disable-next-line no-console
console.warn(true, 'The "Stoller" icon is deprecated. Use the "Stroller"', 'Icon');

exports['default'] = _default;
