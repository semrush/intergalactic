import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';

function _createSuper(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived),
      result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
    return true;
  } catch (e) {
    return false;
  }
}

import React from 'react';
import UI from '@semcore/ui';
import { Box } from '@semcore/flex-box';
import createComponent, {
  Component,
  styled,
  styledEnhance,
  css,
  __css__,
  set,
  create,
  map,
} from '@semcore/core';
import { neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import SpinButton from './SpinButton';
/*__reshadow-styles__:"./style/button.shadow.css"*/

var _ref =
    /*__reshadow_css_start__*/
    (__css__(
      /*__inner_css_start__*/
      '.___SButton_viq9e_gg_ {\n  position: relative;\n  display: inline-block;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  margin: 0;\n  white-space: nowrap;\n  font-family: inherit;\n  font-weight: normal;\n  line-height: normal;\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  color: #666666;\n  outline: 0;\n  box-shadow: none;\n  cursor: pointer;\n  box-sizing: border-box;\n  overflow: visible;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent\n}\n\n.___SButton_viq9e_gg_::-moz-focus-inner {\n    padding: 0;\n    border: none;\n  }\n\n.___SButton_viq9e_gg_:active,.___SButton_viq9e_gg_:hover,.___SButton_viq9e_gg_:focus {\n    outline: 0;\n    text-decoration: none;\n  }\n\n.___SButton_viq9e_gg_.__disabled_viq9e_gg_ {\n  opacity: 0.3;\n  cursor: default;\n  pointer-events: none; /* Disable link interactions */\n}\n\n.___SButton_viq9e_gg_.__keyboardFocused_viq9e_gg_ {\n  box-shadow: 0 0 0 3px rgba(43, 148, 225, 0.3);\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_ {\n  height: 18px;\n  min-width: 18px;\n  border-radius: 2px;\n  font-size: 10px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_ {\n  height: 26px;\n  min-width: 26px;\n  border-radius: 3px;\n  font-size: 12px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_ {\n  height: 32px;\n  min-width: 32px;\n  border-radius: 4px;\n  font-size: 14px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_ {\n  height: 42px;\n  min-width: 42px;\n  border-radius: 5px;\n  font-size: 16px;\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_ {\n  color: #fff;\n  background-color: #2b94e1\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_:hover {\n    background-color: #0071bc;\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: hsl(203.936170212766, 100%, 35.0196078431%);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_ {\n  color: #fff;\n  background-color: #4fae33\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_:hover {\n    background-color: #1d9c00;\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: hsl(108.84615384615384, 100%, 29.0588235294%);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_ {\n  background-color: #ff7f00;\n  color: #fff\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_:hover {\n    background-color: #cc6600;\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: hsl(30, 100%, 38%);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_ {\n  background-color: #ed2d2d;\n  color: #fff\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_:hover {\n    background-color: #d00000;\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: hsl(0, 100%, 38.7450980392%);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_ {\n  background-color: #fff;\n  color: #333333\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_:hover {\n    background-color: #eeeeee;\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: hsl(0, 5%, 88.6666666667%);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-muted_viq9e_gg_ {\n  color: #666666;\n  border-color: #a6b0b3;\n  background-color: rgba(166, 176, 179, 0.1)\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-muted_viq9e_gg_:hover {\n    background-color: rgba(166, 176, 179, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-muted_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-muted_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(166, 176, 179, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-info_viq9e_gg_ {\n  background-color: rgba(43, 148, 225, 0.05);\n  color: #2b94e1;\n  border-color: #2b94e1\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-info_viq9e_gg_:hover {\n    background-color: rgba(0, 113, 188, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-info_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-info_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(0, 113, 188, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-invert_viq9e_gg_ {\n  background-color: rgba(255, 255, 255, 0.05);\n  color: #fff;\n  border-color: #fff\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-invert_viq9e_gg_:hover {\n    background-color: rgba(255, 255, 255, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-invert_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_secondary-invert_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-info_viq9e_gg_ {\n  color: #0071bc;\n  background-color: transparent\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-info_viq9e_gg_:hover {\n    background-color: rgba(43, 148, 225, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-info_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-info_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(43, 148, 225, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-muted_viq9e_gg_ {\n  color: #666666;\n  background-color: transparent\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-muted_viq9e_gg_:hover {\n    background-color: rgba(166, 176, 179, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-muted_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-muted_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(166, 176, 179, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-invert_viq9e_gg_ {\n  color: #fff;\n  background-color: transparent\n}\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-invert_viq9e_gg_:hover {\n    background-color: rgba(255, 255, 255, 0.2);\n  }\n\n.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-invert_viq9e_gg_:active,.___SButton_viq9e_gg_.__theme_viq9e_gg_.__theme_tertiary-invert_viq9e_gg_.__active_viq9e_gg_ {\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_right_viq9e_gg_ {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_ {\n  border-radius: 0;\n  margin-left: -1px\n}\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_ {\n    border-left-color: rgba(255, 255, 255, 0.5);\n  }\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_both_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_ {\n    border-left-color: rgba(0, 0, 0, 0.5);\n  }\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_ {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  margin-left: -1px\n}\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-info_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-success_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-warning_viq9e_gg_,.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-danger_viq9e_gg_ {\n    border-left-color: rgba(255, 255, 255, 0.5);\n  }\n\n.___SButton_viq9e_gg_.__neighborLocation_viq9e_gg_.__neighborLocation_left_viq9e_gg_.__theme_viq9e_gg_.__theme_primary-invert_viq9e_gg_ {\n    border-left-color: rgba(0, 0, 0, 0.5);\n  }\n\n.___SSpin_viq9e_gg_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n\n.___SInner_viq9e_gg_ {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n\n.___SInner_viq9e_gg_.__loading_viq9e_gg_ {\n  visibility: hidden;\n}\n\n.___SText_viq9e_gg_ {\n  display: inline-flex;\n  line-height: 1;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_ {\n  margin-left: 4px;\n  margin-right: 4px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_ {\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_ {\n  margin-left: 8px;\n  margin-right: 8px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_ {\n  margin-left: 12px;\n  margin-right: 12px;\n}\n\n.___SAddon_viq9e_gg_ {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:only-child {\n    margin-left: -2px;\n    margin-right: -2px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 8px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 8px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:only-child {\n    margin-left: -4px;\n    margin-right: -4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 8px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 8px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:only-child {\n    margin-left: -4px;\n    margin-right: -4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 12px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 12px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:only-child {\n    margin-left: -6px;\n    margin-right: -6px;\n  }\n',
      /*__inner_css_end__*/
      '1ystxqp',
    ),
    /*__reshadow_css_end__*/
    {
      __SButton: '___SButton_viq9e_gg_',
      _disabled: '__disabled_viq9e_gg_',
      _keyboardFocused: '__keyboardFocused_viq9e_gg_',
      _size: '__size_viq9e_gg_',
      _size_s: '__size_s_viq9e_gg_',
      _size_m: '__size_m_viq9e_gg_',
      _size_l: '__size_l_viq9e_gg_',
      _size_xl: '__size_xl_viq9e_gg_',
      _theme: '__theme_viq9e_gg_',
      '_theme_primary-info': '__theme_primary-info_viq9e_gg_',
      _active: '__active_viq9e_gg_',
      '_theme_primary-success': '__theme_primary-success_viq9e_gg_',
      '_theme_primary-warning': '__theme_primary-warning_viq9e_gg_',
      '_theme_primary-danger': '__theme_primary-danger_viq9e_gg_',
      '_theme_primary-invert': '__theme_primary-invert_viq9e_gg_',
      '_theme_secondary-muted': '__theme_secondary-muted_viq9e_gg_',
      '_theme_secondary-info': '__theme_secondary-info_viq9e_gg_',
      '_theme_secondary-invert': '__theme_secondary-invert_viq9e_gg_',
      '_theme_tertiary-info': '__theme_tertiary-info_viq9e_gg_',
      '_theme_tertiary-muted': '__theme_tertiary-muted_viq9e_gg_',
      '_theme_tertiary-invert': '__theme_tertiary-invert_viq9e_gg_',
      _neighborLocation: '__neighborLocation_viq9e_gg_',
      _neighborLocation_right: '__neighborLocation_right_viq9e_gg_',
      _neighborLocation_both: '__neighborLocation_both_viq9e_gg_',
      _neighborLocation_left: '__neighborLocation_left_viq9e_gg_',
      __SSpin: '___SSpin_viq9e_gg_',
      __SInner: '___SInner_viq9e_gg_',
      _loading: '__loading_viq9e_gg_',
      __SText: '___SText_viq9e_gg_',
      __SAddon: '___SAddon_viq9e_gg_',
    }),
  style = _extends({}, _ref);

/*__reshadow_css_start__*/
__css__(
  /*__inner_css_start__*/
  '@media (max-width: 768px) {\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_ {\n  height: 23.4px;\n  min-width: 23.4px;\n  font-size: 13px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_ {\n  height: 33.8px;\n  min-width: 33.8px;\n  font-size: 15.6px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_ {\n  height: 41.6px;\n  min-width: 41.6px;\n  font-size: 18.2px;\n}\n\n.___SButton_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_ {\n  height: 54.6px;\n  min-width: 54.6px;\n  font-size: 20.8px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_ {\n  margin-left: 5.2px;\n  margin-right: 5.2px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_ {\n  margin-left: 10.4px;\n  margin-right: 10.4px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_ {\n  margin-left: 10.4px;\n  margin-right: 10.4px;\n}\n\n.___SText_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_ {\n  margin-left: 15.6px;\n  margin-right: 15.6px;\n}\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 5.2px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 5.2px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_s_viq9e_gg_:only-child {\n    margin-left: -2.6px;\n    margin-right: -2.6px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 10.4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 10.4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_m_viq9e_gg_:only-child {\n    margin-left: -5.2px;\n    margin-right: -5.2px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 10.4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 10.4px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_l_viq9e_gg_:only-child {\n    margin-left: -5.2px;\n    margin-right: -5.2px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:not(:only-child):first-child {\n    margin-left: 15.6px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:not(:only-child):last-child {\n    margin-right: 15.6px;\n  }\n\n.___SAddon_viq9e_gg_.__size_viq9e_gg_.__size_xl_viq9e_gg_:only-child {\n    margin-left: -7.8px;\n    margin-right: -7.8px;\n  }}',
  /*__inner_css_end__*/
  '1ystxqp',
);
/*__reshadow_css_end__*/

export var MAP_USE_DEFAULT_THEME = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};
var styled_c8 = create([]);

var RootButton = /*#__PURE__*/ (function(_Component) {
  _inherits(RootButton, _Component);

  var _super = _createSuper(RootButton);

  function RootButton() {
    _classCallCheck(this, RootButton);

    return _super.apply(this, arguments);
  }

  _createClass(RootButton, [
    {
      key: 'getTextProps',
      value: function getTextProps() {
        var size = this.asProps.size;
        return {
          size: size,
        };
      },
    },
    {
      key: 'getAddonProps',
      value: function getAddonProps() {
        var size = this.asProps.size;
        return {
          size: size,
        };
      },
    },
    {
      key: 'render',
      value: function render() {
        var SButton = this.Root;
        var SInner = UI;
        var SSpin = UI;
        var _this$asProps = this.asProps,
          Children = _this$asProps.Children,
          styles = _this$asProps.styles,
          use = _this$asProps.use,
          _this$asProps$theme = _this$asProps.theme,
          theme =
            _this$asProps$theme === void 0
              ? typeof use === 'string' && MAP_USE_DEFAULT_THEME[use]
              : _this$asProps$theme,
          loading = _this$asProps.loading,
          _this$asProps$disable = _this$asProps.disabled,
          disabled = _this$asProps$disable === void 0 ? loading : _this$asProps$disable,
          active = _this$asProps.active,
          size = _this$asProps.size,
          keyboardFocused = _this$asProps.keyboardFocused,
          neighborLocation = _this$asProps.neighborLocation;
        var useTheme = use && theme ? ''.concat(use, '-').concat(theme) : false;
        return styled(
          (set([styled_c8, styles]),
          /*#__PURE__*/ React.createElement(
            SButton,
            map('SButton', {
              render: Box,
              type: 'button',
              tag: 'button',
              disabled: disabled,
              theme: useTheme,
              size: size,
              active: active,
              neighborLocation: neighborLocation,
              keyboardFocused: keyboardFocused,
            }),
            /*#__PURE__*/ React.createElement(
              SInner,
              map('SInner', {
                tag: 'span',
                loading: loading,
              }),
              addonTextChildren(Children, Button.Text, Button.Addon),
            ),
            loading &&
              /*#__PURE__*/ React.createElement(
                SSpin,
                map('SSpin', {
                  tag: 'span',
                }),
                /*#__PURE__*/ React.createElement(
                  SpinButton,
                  map('SpinButton', {
                    centered: true,
                    size: size,
                    theme: useTheme,
                  }),
                ),
              ),
          )),
        );
      },
    },
  ]);

  return RootButton;
})(Component);

_defineProperty(RootButton, 'displayName', 'Button');

_defineProperty(RootButton, 'enhance', [
  styledEnhance(style),
  keyboardFocusEnhance(),
  neighborLocationEnhance(),
]);

_defineProperty(RootButton, 'defaultProps', {
  use: 'secondary',
  size: 'm',
});

var styled_12c = create([]);

function Text(props) {
  var SText = props.Root,
    size = props.size,
    styles = props.styles;
  return styled(
    (set([styled_12c, styles]),
    /*#__PURE__*/ React.createElement(
      SText,
      map('SText', {
        render: Box,
        tag: 'span',
        size: size,
      }),
    )),
  );
}

var styled_190 = create([]);

function Addon(props) {
  var SAddon = props.Root,
    size = props.size,
    styles = props.styles;
  return styled(
    (set([styled_190, styles]),
    /*#__PURE__*/ React.createElement(
      SAddon,
      map('SAddon', {
        render: Box,
        tag: 'span',
        size: size,
      }),
    )),
  );
}

var Button = createComponent(RootButton, {
  Text: Text,
  Addon: Addon,
});
export default Button;
