function _extends() {
  _extends =
    Object.assign ||
    function (target) {
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
import { Box } from '@semcore/flex-box';

function MailSent(
  { fill = 'none', width = '80', height = '80', viewBox = '0 0 80 80', ...props },
  ref,
) {
  return /*#__PURE__*/ React.createElement(
    Box,
    _extends(
      {
        ref: ref,
        width: width,
        height: height,
        viewBox: viewBox,
        fill: fill,
        tag: 'svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(
      'g',
      {
        clipPath: 'url(#clip0_2_104)',
      },
      /*#__PURE__*/ React.createElement('path', {
        d: 'M27.945 5.04601C27.7367 5.04597 27.5305 5.08702 27.3382 5.16681C27.1458 5.24661 26.9711 5.36357 26.824 5.51101L13.909 18.426C7.41941 24.9156 3.77361 33.7174 3.77361 42.895C3.77361 52.0727 7.41941 60.8744 13.909 67.364C20.3986 73.8536 29.2003 77.4994 38.378 77.4994C47.5556 77.4994 56.3574 73.8536 62.847 67.364L75.762 54.448C75.9093 54.3011 76.0261 54.1265 76.1057 53.9343C76.1853 53.7421 76.2262 53.536 76.226 53.328V5.94401C76.226 5.70531 76.1312 5.47639 75.9624 5.30761C75.7936 5.13883 75.5647 5.04401 75.326 5.04401L27.945 5.04601Z',
        fill: '#45E0A8',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M28.615 44.751L28.815 45.104C34.956 41.652 52.997 31.426 56.346 34.573C55.208 31.466 39.307 34.9 28.615 44.751Z',
        fill: 'white',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M28.513 31.03C26.7 37.072 19.3 55.5 15.07 61.342L18.083 62.254L19.659 60.925C23.878 51.385 29.639 34.972 29.971 29.467C29.462 29.182 28.947 29.583 28.513 31.03Z',
        fill: 'white',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M15.07 61.342C19.3 55.5 26.7 37.072 28.513 31.03C30.326 24.988 33.555 37.039 31.743 42.145',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M27.909 45.411C38.592 35.046 55.183 31.4 56.342 34.573C57.03 36.459 42.913 40.832 37.934 46.889',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M44.281 21.43C41.036 20.27 35.689 18.539 32.832 17.741C36.95 15.907 69.787 3.753 72.5 2.5C71.578 6.606 67.576 20.78 65.784 27.433C60.957 25.751 56.056 24.275 52.862 23.24C50.8607 25.8918 49.0505 28.6825 47.445 31.591C46.272 27.731 45.116 23.274 44.281 21.43Z',
        fill: 'white',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M44.281 21.43L61.026 10.352',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M52.864 23.24L72.502 2.5',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M47.447 31.591L55.299 24.015',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M48.436 30.173L51.891 24.532L52.864 23.405L54.928 24.015L55.364 23.884L52.009 27.311L49.53 29.581L48.204 30.695L48.436 30.173Z',
        fill: 'black',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M34.013 21.451L23.202 26.58',
        stroke: 'white',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M40.905 22.5L34.013 26.862',
        stroke: 'white',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M62.293 28.365L58.253 38.215',
        stroke: 'white',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M46.09 40.849C49.703 43.274 44.221 49.374 42.408 50.967',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M47.258 43.6C51.4 45.7 48.418 51.364 46.09 54.2',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M49.023 48.9C54.523 53.376 36.467 72.622 35.159 73.683',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M5.177 73.321C7.669 70.98 13.419 62.372 14.7 59.88C28.358 57.763 34.9 69.927 35.159 73.4C32.9025 78.2847 30.3099 83.007 27.4 87.533',
        fill: 'black',
        shapeRendering: 'geometricPrecision',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M5.177 73.321C7.669 70.98 13.419 62.372 14.7 59.88C28.358 57.763 34.9 69.927 35.159 73.4C32.9025 78.2847 30.3099 83.007 27.4 87.533',
        stroke: 'black',
        strokeWidth: '0.75',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        shapeRendering: 'geometricPrecision',
      }),
    ),
    /*#__PURE__*/ React.createElement(
      'defs',
      null,
      /*#__PURE__*/ React.createElement(
        'clipPath',
        {
          id: 'clip0_2_104',
        },
        /*#__PURE__*/ React.createElement('rect', {
          width: '80',
          height: '80',
          fill: 'white',
        }),
      ),
    ),
  );
}

MailSent.displayName = 'MailSent';
export default createBaseComponent(MailSent);
