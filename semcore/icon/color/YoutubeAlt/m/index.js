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

function YoutubeAlt(_ref, ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? '16' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '16' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 16 16' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "YoutubeAlt",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M15.66 4.15a2 2 0 0 0-1.41-1.42C13 2.4 8 2.4 8 2.4s-5 0-6.25.33A2 2 0 0 0 .33 4.15C0 5.4 0 8 0 8s0 2.6.34 3.85a2 2 0 0 0 1.4 1.42C3 13.6 8 13.6 8 13.6s5 0 6.25-.33a2 2 0 0 0 1.42-1.42C16 10.6 16 8 16 8s0-2.6-.34-3.85Z",
    fill: "red",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M6.4 10.4 10.55 8 6.4 5.6v4.8Z",
    fill: "#fff",
    shapeRendering: "geometricPrecision"
  }));
}

YoutubeAlt.displayName = 'YoutubeAlt';

var _default = (0, _core.createBaseComponent)(YoutubeAlt);

// eslint-disable-next-line no-console
console.warn(true, 'The "YoutubeAlt" icon is deprecated. Use the "YoutubeColored"', 'Icon');

exports["default"] = _default;