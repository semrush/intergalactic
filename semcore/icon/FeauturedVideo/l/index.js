"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@semcore/core");

var _icon = _interopRequireDefault(require("@semcore/icon"));

var _excluded = ["width", "height", "viewBox"];

function FeauturedVideo(_ref, ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? '24' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '24' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 24 24' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "FeauturedVideo",
    "data-group": "l",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M9 10.534v6.932c0 .418.482.673.855.453l5.88-3.474a.52.52 0 0 0 0-.907L9.853 10.08c-.373-.219-.854.037-.854.454Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 21a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v19Zm20-1H3V8h18v12ZM11.685 6H8.35L6.621 3h3.336l1.728 3Zm2.308 0h3.232l-1.728-3h-3.232l1.728 3ZM21 6h-1.467l-1.728-3H21v3ZM4.313 3l1.728 3H3V3h1.313Z",
    shapeRendering: "geometricPrecision"
  }));
}

FeauturedVideo.displayName = 'FeauturedVideo';

var _default = (0, _core.createBaseComponent)(FeauturedVideo);

// eslint-disable-next-line no-console
console.warn(true, 'The "FeauturedVideo" icon is deprecated. Use the "FeaturedVideo"', 'Icon');

exports["default"] = _default;