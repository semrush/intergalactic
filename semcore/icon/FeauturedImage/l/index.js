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
      width = _ref$width === void 0 ? '24' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '24' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 24 24' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "FeauturedImage",
    "data-group": "l",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M9.5 7.998a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.466 22.843a1 1 0 0 1-.3-1.382L9.036 17H3a1 1 0 1 1 0-2V3a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2v12a1 1 0 1 1 0 2h-6.027l2.866 4.457a1 1 0 1 1-1.682 1.082l-3.425-5.325a.999.999 0 0 1-.104-.214h-1.217a1.12 1.12 0 0 1-.03.05l-3.533 5.493a1 1 0 0 1-1.382.3ZM19 10.14V3H5v8.296l1.663-1.454a2 2 0 0 1 2.679.04l.893.831 3.39-3.145a2 2 0 0 1 2.752.03L19 10.139ZM5 13.954l2.98-2.607 1.437 1.337a1.2 1.2 0 0 0 1.634 0l3.934-3.65L19 12.924V15H5v-1.046Z",
    shapeRendering: "geometricPrecision"
  }));
}

FeauturedImage.displayName = 'FeauturedImage';

var _default = (0, _core.createBaseComponent)(FeauturedImage);

// eslint-disable-next-line no-console
console.warn(true, 'The "FeauturedImage" icon is deprecated. Use the "FeaturedImage"', 'Icon');

exports["default"] = _default;