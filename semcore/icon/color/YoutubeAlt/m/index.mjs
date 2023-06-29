function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';

function YoutubeAlt({
  width = '16',
  height = '16',
  viewBox = '0 0 16 16',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    ref: ref,
    "data-name": "YoutubeAlt",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M15.66 4.15a2 2 0 0 0-1.41-1.42C13 2.4 8 2.4 8 2.4s-5 0-6.25.33A2 2 0 0 0 .33 4.15C0 5.4 0 8 0 8s0 2.6.34 3.85a2 2 0 0 0 1.4 1.42C3 13.6 8 13.6 8 13.6s5 0 6.25-.33a2 2 0 0 0 1.42-1.42C16 10.6 16 8 16 8s0-2.6-.34-3.85Z",
    fill: "red",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.4 10.4 10.55 8 6.4 5.6v4.8Z",
    fill: "#fff",
    shapeRendering: "geometricPrecision"
  }));
}


console.warn(true, 'The "YoutubeAlt" icon is deprecated. Use the "YoutubeColored"', 'Icon');

YoutubeAlt.displayName = 'YoutubeAlt';
export default createBaseComponent(YoutubeAlt);