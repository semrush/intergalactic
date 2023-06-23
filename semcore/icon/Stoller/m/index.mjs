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

function Stoller({ width = '16', height = '16', viewBox = '0 0 16 16', ...props }, ref) {
  return /*#__PURE__*/ React.createElement(
    Icon,
    _extends(
      {
        ref: ref,
        'data-name': 'Stoller',
        'data-group': 'm',
        width: width,
        height: height,
        viewBox: viewBox,
      },
      props,
    ),
    /*#__PURE__*/ React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M8 0a1 1 0 0 0-1 1v4H3.766l-.909-1.514A1 1 0 0 0 2 3H1a1 1 0 0 0 0 2h.434L2 5.946A1.016 1.016 0 0 0 2 6v1a4 4 0 0 0 4 4h3.5a5.5 5.5 0 1 0 0-11H8ZM7 7a2 2 0 0 0 2-2V2h.5a3.486 3.486 0 0 1 1.668.422A3.5 3.5 0 0 1 9.5 9H6a2 2 0 0 1-2-2h3Z',
      shapeRendering: 'geometricPrecision',
    }),
    /*#__PURE__*/ React.createElement('path', {
      d: 'M4 14.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
      shapeRendering: 'geometricPrecision',
    }),
  );
}

Stoller.displayName = 'Stoller';


console.warn(true, 'The "Stoller" icon is deprecated. Use the "Stroller"', 'Icon');

export default createBaseComponent(Stoller);
