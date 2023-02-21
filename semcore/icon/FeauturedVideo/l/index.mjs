function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';

function FeauturedVideo({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    ref: ref,
    "data-name": "FeauturedVideo",
    "data-group": "l",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M9 10.534v6.932c0 .418.482.673.855.453l5.88-3.474a.52.52 0 0 0 0-.907L9.853 10.08c-.373-.219-.854.037-.854.454Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 21a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v19Zm20-1H3V8h18v12ZM11.685 6H8.35L6.621 3h3.336l1.728 3Zm2.308 0h3.232l-1.728-3h-3.232l1.728 3ZM21 6h-1.467l-1.728-3H21v3ZM4.313 3l1.728 3H3V3h1.313Z",
    shapeRendering: "geometricPrecision"
  }));
}

FeauturedVideo.displayName = 'FeauturedVideo';
export default createBaseComponent(FeauturedVideo);