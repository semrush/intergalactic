import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { sstyled as _sstyled } from "@semcore/core";
import { assignProps as _assignProps3 } from "@semcore/core";
import { assignProps as _assignProps2 } from "@semcore/core";
import { assignProps as _assignProps } from "@semcore/core";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';

/*__reshadow-styles__:"./style/base-trigger.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SBaseTrigger_1lzyl_gg_{display:inline-block;align-items:center;justify-content:center;line-height:normal;position:relative;touch-action:manipulation;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;padding:0;margin:0;box-shadow:none;outline:none;text-decoration:none;-webkit-tap-highlight-color:transparent;overflow:visible;outline:0;text-align:center;vertical-align:middle;font-family:inherit;cursor:pointer;background:var(--intergalactic-bg-primary-neutral,#fff);font-weight:var(--intergalactic-regular,400);border:1px solid var(--intergalactic-border-primary,#c4c7cf);color:var(--intergalactic-text-primary,#191b23)}.___SBaseTrigger_1lzyl_gg_::-moz-focus-inner{border:none;padding:0}.___SBaseTrigger_1lzyl_gg_:active,.___SBaseTrigger_1lzyl_gg_:focus{outline:0;text-decoration:none}@media (hover: hover){.___SBaseTrigger_1lzyl_gg_:hover{outline:0;text-decoration:none;background-color:var(--intergalactic-bg-primary-neutral-hover,#f4f5f9)}}.___SBaseTrigger_1lzyl_gg_.__keyboardFocused_1lzyl_gg_{border:1px solid var(--intergalactic-border-info-active,#006dca);box-shadow:var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3));z-index:1}@media (hover: hover){}.___SBaseTrigger_1lzyl_gg_:active,.___SBaseTrigger_1lzyl_gg_.__active_1lzyl_gg_{background-color:var(--intergalactic-bg-primary-neutral-active,#e0e1e9)}.___SBaseTrigger_1lzyl_gg_.__disabled_1lzyl_gg_{opacity:var(--intergalactic-disabled-opacity,.3);cursor:default;pointer-events:none}.___SInner_1lzyl_gg_{display:inline-flex;align-items:center;justify-content:center;height:100%;width:100%}.___SText_1lzyl_gg_{display:inline;padding:1px 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:var(--intergalactic-lh-200,142%);flex-grow:1;text-align:left}.___SAddon_1lzyl_gg_{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}.___SBaseAddon_1lzyl_gg_{width:12px;height:12px}.___SBaseTrigger_1lzyl_gg_._size_m_1lzyl_gg_{min-width:26px;height:28px;border-radius:var(--intergalactic-rounded-medium,6px);padding:0 var(--intergalactic-spacing-2x,8px);font-size:var(--intergalactic-fs-200,14px)}.___SBaseTrigger_1lzyl_gg_._size_m_1lzyl_gg_ .___SAddon_1lzyl_gg_:not(:only-child):first-child{margin-right:var(--intergalactic-spacing-2x,8px)}.___SBaseTrigger_1lzyl_gg_._size_m_1lzyl_gg_ .___SAddon_1lzyl_gg_:not(:only-child):last-child{margin-left:var(--intergalactic-spacing-2x,8px)}.___SBaseTrigger_1lzyl_gg_._size_m_1lzyl_gg_ .___SAddon_1lzyl_gg_:only-child{margin-left:calc(var(--intergalactic-spacing-1x, 4px)*-1);margin-right:calc(var(--intergalactic-spacing-1x, 4px)*-1)}.___SBaseTrigger_1lzyl_gg_._size_l_1lzyl_gg_{min-width:32px;height:40px;border-radius:var(--intergalactic-rounded-medium,6px);padding:0 var(--intergalactic-spacing-3x,12px);font-size:var(--intergalactic-fs-300,16px)}.___SBaseTrigger_1lzyl_gg_._size_l_1lzyl_gg_ .___SAddon_1lzyl_gg_:not(:only-child):first-child{margin-right:var(--intergalactic-spacing-2x,8px)}.___SBaseTrigger_1lzyl_gg_._size_l_1lzyl_gg_ .___SAddon_1lzyl_gg_:not(:only-child):last-child{margin-left:var(--intergalactic-spacing-2x,8px)}.___SBaseTrigger_1lzyl_gg_._size_l_1lzyl_gg_ .___SAddon_1lzyl_gg_:only-child{margin-left:calc(var(--intergalactic-spacing-1x, 4px)*-1);margin-right:calc(var(--intergalactic-spacing-1x, 4px)*-1)}.___SBaseTrigger_1lzyl_gg_._neighborLocation_right_1lzyl_gg_{border-top-right-radius:0;border-bottom-right-radius:0}.___SBaseTrigger_1lzyl_gg_._neighborLocation_both_1lzyl_gg_{border-radius:0;margin-left:-1px}.___SBaseTrigger_1lzyl_gg_._neighborLocation_left_1lzyl_gg_{border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}.___SText_1lzyl_gg_.__placeholder_1lzyl_gg_{color:var(--intergalactic-text-placeholder,#a9abb6)}.___SBaseTrigger_1lzyl_gg_._state_normal_1lzyl_gg_{border-color:var(--intergalactic-border-primary,#c4c7cf)}.___SBaseTrigger_1lzyl_gg_._state_valid_1lzyl_gg_{border-color:var(--intergalactic-border-success,#59ddaa)}.___SBaseTrigger_1lzyl_gg_._state_invalid_1lzyl_gg_{border-color:var(--intergalactic-border-critical,#ffaeb5)}.___SBaseTrigger_1lzyl_gg_._state_invalid_1lzyl_gg_.__keyboardFocused_1lzyl_gg_{border-color:var(--intergalactic-border-critical-active,#d1002f);box-shadow:var(--intergalactic-keyboard-focus-invalid,0 0 0 3px rgba(255,73,83,.3))}"
/*__inner_css_end__*/
, "1lzyl_gg_")
/*__reshadow_css_end__*/
, {
  "__SBaseTrigger": "___SBaseTrigger_1lzyl_gg_",
  "_keyboardFocused": "__keyboardFocused_1lzyl_gg_",
  "_active": "__active_1lzyl_gg_",
  "_disabled": "__disabled_1lzyl_gg_",
  "__SInner": "___SInner_1lzyl_gg_",
  "__SText": "___SText_1lzyl_gg_",
  "__SAddon": "___SAddon_1lzyl_gg_",
  "__SBaseAddon": "___SBaseAddon_1lzyl_gg_",
  "_size_m": "_size_m_1lzyl_gg_",
  "_size_l": "_size_l_1lzyl_gg_",
  "_neighborLocation_right": "_neighborLocation_right_1lzyl_gg_",
  "_neighborLocation_both": "_neighborLocation_both_1lzyl_gg_",
  "_neighborLocation_left": "_neighborLocation_left_1lzyl_gg_",
  "_placeholder": "__placeholder_1lzyl_gg_",
  "_state_normal": "_state_normal_1lzyl_gg_",
  "_state_valid": "_state_valid_1lzyl_gg_",
  "_state_invalid": "_state_invalid_1lzyl_gg_"
});

var RootBaseTrigger = /*#__PURE__*/function (_Component) {
  _inherits(RootBaseTrigger, _Component);

  var _super = _createSuper(RootBaseTrigger);

  function RootBaseTrigger() {
    _classCallCheck(this, RootBaseTrigger);

    return _super.apply(this, arguments);
  }

  _createClass(RootBaseTrigger, [{
    key: "getTextProps",
    value: function getTextProps() {
      var _this$asProps = this.asProps,
          placeholder = _this$asProps.placeholder,
          empty = _this$asProps.empty;
      return {
        placeholder: placeholder,
        empty: empty
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps;
      var SBaseTrigger = Box;
      var SInner = 'div';
      var _this$asProps2 = this.asProps,
          Children = _this$asProps2.Children,
          styles = _this$asProps2.styles,
          theme = _this$asProps2.theme,
          neighborLocation = _this$asProps2.neighborLocation,
          empty = _this$asProps2.empty;
      logger.warn(theme !== undefined, "The 'theme' property is deprecated, use 'state'", this.asProps['data-ui-name'] || BaseTrigger.displayName); // TODO: add aria

      return /*#__PURE__*/React.createElement(NeighborLocation.Detect, {
        neighborLocation: neighborLocation
      }, function (neighborLocation) {
        var _ref4;

        return _ref4 = sstyled(styles), /*#__PURE__*/React.createElement(SBaseTrigger, _ref4.cn("SBaseTrigger", _objectSpread({}, _assignProps({
          "neighborLocation": neighborLocation,
          "state": theme
        }, _ref))), /*#__PURE__*/React.createElement(SInner, _ref4.cn("SInner", {}), addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon, empty)));
      });
    }
  }]);

  return RootBaseTrigger;
}(Component);

_defineProperty(RootBaseTrigger, "displayName", 'BaseTrigger');

_defineProperty(RootBaseTrigger, "enhance", [keyboardFocusEnhance()]);

_defineProperty(RootBaseTrigger, "style", style);

_defineProperty(RootBaseTrigger, "defaultProps", {
  size: 'm',
  empty: false
});

function Text(props) {
  var _ref2 = arguments[0],
      _ref5;

  var SText = Box;
  var children = props.children,
      styles = props.styles,
      empty = props.empty,
      placeholder = props.placeholder;
  return _ref5 = sstyled(styles),
  /*#__PURE__*/

  /* "use:" prefix was used for backward compatibility (by lsroman) */
  React.createElement(SText, _ref5.cn("SText", _objectSpread({}, _assignProps2({
    "use:placeholder": empty
  }, _ref2))), empty ? placeholder : children);
}

function Addon(props) {
  var _ref3 = arguments[0],
      _ref6;

  var SAddon = Box;
  return _ref6 = sstyled(props.styles), /*#__PURE__*/React.createElement(SAddon, _ref6.cn("SAddon", _objectSpread({}, _assignProps3({}, _ref3))));
}

var BaseTrigger = createComponent(RootBaseTrigger, {
  Text: Text,
  Addon: Addon
});
export default BaseTrigger;
//# sourceMappingURL=BaseTrigger.js.map