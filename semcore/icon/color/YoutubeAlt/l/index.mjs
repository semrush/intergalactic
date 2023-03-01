function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';

function YoutubeAlt({
  width = '24',
  height = '25',
  viewBox = '0 0 24 25',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    ref: ref,
    "data-name": "YoutubeAlt",
    "data-group": "l",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M23.5 3.22a3 3 0 0 0-2.13-2.12C19.5.6 12 .6 12 .6s-7.5 0-9.38.5A3 3 0 0 0 .5 3.22C0 5.1 0 9 0 9s0 3.9.5 5.78a3 3 0 0 0 2.12 2.12c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3 3 0 0 0 2.12-2.12C24 12.9 24 9 24 9s0-3.9-.5-5.78Z",
    fill: "red",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.6 12.6 15.83 9 9.6 5.4v7.2Z",
    fill: "#fff",
    shapeRendering: "geometricPrecision"
  }));
}

// eslint-disable-next-line no-console
console.warn(true, 'The "YoutubeAlt" icon is deprecated. Use the "YoutubeColored"', 'Icon');

YoutubeAlt.displayName = 'YoutubeAlt';
export default createBaseComponent(YoutubeAlt);