import _extends from '@babel/runtime/helpers/extends';
import React from 'react';
import { styled, css, __css__, set, create, map } from '@semcore/core';

/*__reshadow-styles__:"./button.shadow.css"*/
var _ref =
    /*__reshadow_css_start__*/
    (__css__(
      /*__inner_css_start__*/
      '.___SButton_1pmdw_gg_ {\n  padding: 0 20px;\n  background: purple;\n}\n\n.___SButton_1pmdw_gg_.__theme_1pmdw_gg_.__theme_default_1pmdw_gg_ {\n  background: red;\n}\n',
      /*__inner_css_end__*/
      '1dlh6zt_gg_',
    ),
    /*__reshadow_css_end__*/
    {
      __SButton: '___SButton_1pmdw_gg_',
      _theme: '__theme_1pmdw_gg_',
      _theme_default: '__theme_default_1pmdw_gg_',
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
