function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}

import React from 'react';
import { createBaseComponent } from '@semcore/core';
import Icon from '@semcore/icon';
import logger from '@semcore/utils/lib/logger';

function Stoller({ width = '24', height = '24', viewBox = '0 0 24 24', ...props }, ref) {
  return /*#__PURE__*/ React.createElement(
    Icon,
    _extends(
      {
        ref: ref,
        'data-name': 'Stoller',
        'data-group': 'l',
        width: width,
        height: height,
        viewBox: viewBox,
      },
      props,
    ),
    /*#__PURE__*/ React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M5.129 5.89 6.535 8H13V1.818C13 .814 13.814 0 14.818 0h.682a7.5 7.5 0 0 1 0 15H10a5 5 0 0 1-5-5v-.696L3.466 7H2a1 1 0 0 1 0-2h1.465a2 2 0 0 1 1.664.89ZM13 10a2 2 0 0 0 2-2V2h.5a5.5 5.5 0 1 1 0 11H10a3 3 0 0 1-3-3h6ZM7 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM15 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      shapeRendering: 'geometricPrecision',
    }),
  );
}

Stoller.displayName = 'Stoller';
export default createBaseComponent(Stoller);
