import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { sstyled as _sstyled } from "@semcore/core";
import { assignProps as _assignProps4 } from "@semcore/core";
import { assignProps as _assignProps3 } from "@semcore/core";
import { assignProps as _assignProps2 } from "@semcore/core";
import { assignProps as _assignProps } from "@semcore/core";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { useNeighborLocationDetect } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

/*__reshadow-styles__:"./style/pills.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SPills_1tptb_gg_{display:inline-flex;align-items:center;justify-content:center;isolation:isolate}.___SPill_1tptb_gg_{display:inline-flex;align-items:center;justify-content:center;line-height:normal;position:relative;touch-action:manipulation;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;padding:0;margin:0;box-shadow:none;outline:none;text-decoration:none;-webkit-tap-highlight-color:transparent;overflow:visible;outline:0;text-align:center;vertical-align:middle;font-family:inherit;cursor:pointer;background:var(--intergalactic-bg-primary-neutral,#fff);border:1px solid var(--intergalactic-border-primary,#c4c7cf);border-radius:var(--intergalactic-rounded-medium,6px)}.___SPill_1tptb_gg_::-moz-focus-inner{border:none;padding:0}.___SPill_1tptb_gg_:active,.___SPill_1tptb_gg_:focus{outline:0;text-decoration:none}@media (hover: hover){.___SPill_1tptb_gg_:hover{outline:0;text-decoration:none}}@media (hover: hover){.___SPill_1tptb_gg_:hover{background:var(--intergalactic-bg-primary-neutral-hover,#f4f5f9)}}.___SPill_1tptb_gg_.__selected_1tptb_gg_{background:var(--intergalactic-control-secondary-info-hover,rgba(0,143,248,.2));border-color:var(--intergalactic-border-info-active,#006dca);z-index:1}.___SPill_1tptb_gg_.__disabled_1tptb_gg_{cursor:default;pointer-events:none}.___SPill_1tptb_gg_.__disabled_1tptb_gg_>*{opacity:var(--intergalactic-disabled-opacity,.3)}.___SPill_1tptb_gg_.__keyboardFocused_1tptb_gg_{box-shadow:var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SText_1tptb_gg_{color:var(--intergalactic-text-primary,#191b23);display:inline-flex}.___SAddon_1tptb_gg_{color:var(--intergalactic-text-secondary,#6c6e79);display:inline-flex;align-items:center;justify-content:center}.___SPill_1tptb_gg_._size_m_1tptb_gg_{height:var(--intergalactic-form-control-m,28px);min-width:var(--intergalactic-form-control-m,28px);font-size:var(--intergalactic-fs-200,14px)}.___SPill_1tptb_gg_._size_m_1tptb_gg_ .___SText_1tptb_gg_{margin-left:var(--intergalactic-spacing-2x,8px);margin-right:var(--intergalactic-spacing-2x,8px)}.___SPill_1tptb_gg_._size_m_1tptb_gg_ .___SAddon_1tptb_gg_:not(:only-child):first-child{margin-left:var(--intergalactic-spacing-2x,8px)}.___SPill_1tptb_gg_._size_m_1tptb_gg_ .___SAddon_1tptb_gg_:not(:only-child):last-child{margin-right:var(--intergalactic-spacing-2x,8px)}.___SPill_1tptb_gg_._size_m_1tptb_gg_ .___SAddon_1tptb_gg_:only-child{margin-left:var(--intergalactic-spacing-2x,8px);margin-right:var(--intergalactic-spacing-2x,8px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_{height:var(--intergalactic-form-control-l,40px);min-width:var(--intergalactic-form-control-l,40px);font-size:var(--intergalactic-fs-300,16px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_ .___SText_1tptb_gg_{margin-left:var(--intergalactic-spacing-2x,8px);margin-right:var(--intergalactic-spacing-2x,8px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_ .___SText_1tptb_gg_:only-child{margin-left:var(--intergalactic-spacing-3x,12px);margin-right:var(--intergalactic-spacing-3x,12px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_ .___SAddon_1tptb_gg_:not(:only-child):first-child{margin-left:var(--intergalactic-spacing-3x,12px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_ .___SAddon_1tptb_gg_:not(:only-child):last-child{margin-right:var(--intergalactic-spacing-3x,12px)}.___SPill_1tptb_gg_._size_l_1tptb_gg_ .___SAddon_1tptb_gg_:only-child{margin-left:var(--intergalactic-spacing-3x,12px);margin-right:var(--intergalactic-spacing-3x,12px)}.___SPill_1tptb_gg_._neighborLocation_right_1tptb_gg_{border-top-right-radius:0;border-bottom-right-radius:0}.___SPill_1tptb_gg_._neighborLocation_both_1tptb_gg_{border-radius:0;margin-left:-1px}.___SPill_1tptb_gg_._neighborLocation_left_1tptb_gg_{border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}"
/*__inner_css_end__*/
, "1tptb_gg_")
/*__reshadow_css_end__*/
, {
  "__SPills": "___SPills_1tptb_gg_",
  "__SPill": "___SPill_1tptb_gg_",
  "_selected": "__selected_1tptb_gg_",
  "_disabled": "__disabled_1tptb_gg_",
  "_keyboardFocused": "__keyboardFocused_1tptb_gg_",
  "__SText": "___SText_1tptb_gg_",
  "__SAddon": "___SAddon_1tptb_gg_",
  "_size_m": "_size_m_1tptb_gg_",
  "_size_l": "_size_l_1tptb_gg_",
  "_neighborLocation_right": "_neighborLocation_right_1tptb_gg_",
  "_neighborLocation_both": "_neighborLocation_both_1tptb_gg_",
  "_neighborLocation_left": "_neighborLocation_left_1tptb_gg_"
});

var RootPills = /*#__PURE__*/function (_Component) {
  _inherits(RootPills, _Component);

  var _super = _createSuper(RootPills);

  function RootPills() {
    var _this;

    _classCallCheck(this, RootPills);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "bindHandlerClick", function (value) {
      return function (e) {
        _this.handlers.value(value, e);
      };
    });

    return _this;
  }

  _createClass(RootPills, [{
    key: "uncontrolledProps",
    value: function uncontrolledProps() {
      return {
        value: null
      };
    }
  }, {
    key: "getItemProps",
    value: function getItemProps(props, i) {
      var _this$asProps = this.asProps,
          value = _this$asProps.value,
          size = _this$asProps.size,
          disabled = _this$asProps.disabled;
      return {
        index: i,
        size: size,
        disabled: disabled,
        selected: value === props.value,
        onClick: this.bindHandlerClick(props.value)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref5;

      var SPills = Box;
      var _this$asProps2 = this.asProps,
          Children = _this$asProps2.Children,
          styles = _this$asProps2.styles,
          controlsLength = _this$asProps2.controlsLength,
          disabled = _this$asProps2.disabled;
      return _ref5 = sstyled(styles), /*#__PURE__*/React.createElement(SPills, _ref5.cn("SPills", _objectSpread({}, _assignProps({
        "role": "radiogroup",
        "aria-disabled": disabled
      }, _ref))), /*#__PURE__*/React.createElement(NeighborLocation, _ref5.cn("NeighborLocation", {
        "controlsLength": controlsLength
      }), /*#__PURE__*/React.createElement(Children, _ref5.cn("Children", {}))));
    }
  }]);

  return RootPills;
}(Component);

_defineProperty(RootPills, "displayName", 'Pills');

_defineProperty(RootPills, "style", style);

_defineProperty(RootPills, "defaultProps", {
  size: 'm',
  defaultValue: null
});

function Pill(props) {
  var _ref2 = arguments[0],
      _ref6;

  var SPill = Box;
  var Children = props.Children,
      styles = props.styles,
      addonLeft = props.addonLeft,
      addonRight = props.addonRight,
      selected = props.selected,
      disabled = props.disabled,
      index = props.index;
  var neighborLocation = useNeighborLocationDetect(index);
  return _ref6 = sstyled(styles), /*#__PURE__*/React.createElement(SPill, _ref6.cn("SPill", _objectSpread({}, _assignProps2({
    "tag": "button",
    "type": "button",
    "role": "radio",
    "neighborLocation": neighborLocation,
    "aria-checked": selected,
    "aria-disabled": disabled
  }, _ref2))), addonLeft ? /*#__PURE__*/React.createElement(Pills.Item.Addon, {
    tag: addonLeft
  }) : null, addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon), addonRight ? /*#__PURE__*/React.createElement(Pills.Item.Addon, {
    tag: addonRight
  }) : null);
}

Pill.enhance = [keyboardFocusEnhance()];

function Text(props) {
  var _ref3 = arguments[0],
      _ref7;

  var SText = Box;
  return _ref7 = sstyled(props.styles), /*#__PURE__*/React.createElement(SText, _ref7.cn("SText", _objectSpread({}, _assignProps3({
    "tag": "span"
  }, _ref3))));
}

function Addon(props) {
  var _ref4 = arguments[0],
      _ref8;

  var SAddon = Box;
  return _ref8 = sstyled(props.styles), /*#__PURE__*/React.createElement(SAddon, _ref8.cn("SAddon", _objectSpread({}, _assignProps4({
    "tag": "span"
  }, _ref4))));
}

var Pills = createComponent(RootPills, {
  Item: [Pill, {
    Text: Text,
    Addon: Addon
  }]
});
export default Pills;
//# sourceMappingURL=Pills.js.map