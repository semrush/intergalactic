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

function YoutubeRed(_ref, ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? '24' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '25' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 24 25' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "YoutubeRed",
    "data-group": "l",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M23.5 3.22a3 3 0 0 0-2.13-2.12C19.5.6 12 .6 12 .6s-7.5 0-9.38.5A3 3 0 0 0 .5 3.22C0 5.1 0 9 0 9s0 3.9.5 5.78a3 3 0 0 0 2.12 2.12c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3 3 0 0 0 2.12-2.12C24 12.9 24 9 24 9s0-3.9-.5-5.78Z",
    fill: "#fff",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M9.6 12.6 15.83 9 9.6 5.4v7.2Z",
    shapeRendering: "geometricPrecision"
  }));
}

YoutubeRed.displayName = 'YoutubeRed';

var _default = (0, _core.createBaseComponent)(YoutubeRed);


console.warn(true, 'The "YoutubeRed" icon is deprecated. Use the "YoutubeInvert"', 'Icon');

exports["default"] = _default;