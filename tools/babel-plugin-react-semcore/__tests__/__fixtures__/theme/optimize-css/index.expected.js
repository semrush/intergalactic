import _extends from '@babel/runtime/helpers/extends';
import React from 'react';
import { styled, css, __css__, set, create, map } from '@semcore/core';
/*__reshadow-styles__:"./button.shadow.css"*/

var _ref =
    /*__reshadow_css_start__*/
    (__css__(
      /*__inner_css_start__*/
      '.___SButton_c5m54_gg_{padding:0 20px;background:purple}.___SButton_c5m54_gg_._theme_default_c5m54_gg_{background:red;background:#bada55}',
      'c5m54_gg_',
    ),
    {
      __SButton: `___SButton_c5m54_gg_`,
      _theme_default: `_theme_default_c5m54_gg_`,
    }),
  styles = _extends({}, _ref);

var styled_c8 = create([styles]);
export default function(props) {
  var SButton = 'div';
  return styled(
    (set([styled_c8]),
    /*#__PURE__*/ React.createElement(
      SButton,
      map('SButton', {
        theme: props.theme,
      }),
      'test',
    )),
  );
}
