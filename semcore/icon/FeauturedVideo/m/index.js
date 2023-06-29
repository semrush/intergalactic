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
      width = _ref$width === void 0 ? '16' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '16' : _ref$height,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? '0 0 16 16' : _ref$viewBox,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_icon["default"], (0, _extends2["default"])({
    ref: ref,
    "data-name": "FeauturedVideo",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M6 7.4v5.198a.4.4 0 0 0 .61.34l4.203-2.605a.4.4 0 0 0 0-.68L6.61 7.06A.4.4 0 0 0 6 7.4Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM2 14h12V6H2v8ZM4.715 4H2V2h1.563l1.151 2Zm4.147-2H5.871l1.152 2h2.992L8.861 2ZM14 2h-2.83l1.152 2H14V2Z",
    shapeRendering: "geometricPrecision"
  }));
}

FeauturedVideo.displayName = 'FeauturedVideo';

var _default = (0, _core.createBaseComponent)(FeauturedVideo);


console.warn(true, 'The "FeauturedVideo" icon is deprecated. Use the "FeaturedVideo"', 'Icon');

exports["default"] = _default;