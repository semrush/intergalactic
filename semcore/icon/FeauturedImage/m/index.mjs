function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';

function FeauturedImage({
  width = '16',
  height = '16',
  viewBox = '0 0 16 16',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    ref: ref,
    "data-name": "FeauturedImage",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 1a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v8a1 1 0 1 1 0 2h-3.743l1.582 2.46a1 1 0 1 1-1.682 1.082L8.892 12.02 8.88 12H7.128l-.015.024-2.265 3.522a1 1 0 1 1-1.682-1.082L4.75 12H1a1 1 0 1 1 0-2V2a1 1 0 0 1-1-1Zm3 9h2.77L4 8.23l-1 1V10Zm3.93 0H13V7.93l-2-2L6.93 10ZM3 2h10v3.1l-.59-.58a2 2 0 0 0-2.82 0L6.35 7.75l-.94-.93A2 2 0 0 0 3 6.51V2Z",
    shapeRendering: "geometricPrecision"
  }));
}

// eslint-disable-next-line no-console
console.warn(true, 'The "FeauturedImage" icon is deprecated. Use the "FeaturedImage"', 'Icon');

FeauturedImage.displayName = 'FeauturedImage';
export default createBaseComponent(FeauturedImage);