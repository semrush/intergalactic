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

function FeauturedImage(_ref, ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? '16' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '16' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 16 16' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "FeauturedImage",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M7 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 1a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v8a1 1 0 1 1 0 2h-3.743l1.582 2.46a1 1 0 1 1-1.682 1.082L8.892 12.02 8.88 12H7.128l-.015.024-2.265 3.522a1 1 0 1 1-1.682-1.082L4.75 12H1a1 1 0 1 1 0-2V2a1 1 0 0 1-1-1Zm3 9h2.77L4 8.23l-1 1V10Zm3.93 0H13V7.93l-2-2L6.93 10ZM3 2h10v3.1l-.59-.58a2 2 0 0 0-2.82 0L6.35 7.75l-.94-.93A2 2 0 0 0 3 6.51V2Z",
    shapeRendering: "geometricPrecision"
  }));
}

FeauturedImage.displayName = 'FeauturedImage';

var _default = (0, _core.createBaseComponent)(FeauturedImage);


console.warn(true, 'The "FeauturedImage" icon is deprecated. Use the "FeaturedImage"', 'Icon');

exports["default"] = _default;