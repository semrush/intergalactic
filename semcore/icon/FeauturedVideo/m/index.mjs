function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';

function FeauturedVideo({
  width = '16',
  height = '16',
  viewBox = '0 0 16 16',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Icon, _extends({
    ref: ref,
    "data-name": "FeauturedVideo",
    "data-group": "m",
    width: width,
    height: height,
    viewBox: viewBox
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6 7.4v5.198a.4.4 0 0 0 .61.34l4.203-2.605a.4.4 0 0 0 0-.68L6.61 7.06A.4.4 0 0 0 6 7.4Z",
    shapeRendering: "geometricPrecision"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM2 14h12V6H2v8ZM4.715 4H2V2h1.563l1.151 2Zm4.147-2H5.871l1.152 2h2.992L8.861 2ZM14 2h-2.83l1.152 2H14V2Z",
    shapeRendering: "geometricPrecision"
  }));
}

// eslint-disable-next-line no-console
console.warn(true, 'The "FeauturedVideo" icon is deprecated. Use the "FeaturedVideo"', 'Icon');

FeauturedVideo.displayName = 'FeauturedVideo';
export default createBaseComponent(FeauturedVideo);