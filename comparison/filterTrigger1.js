import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { sstyled as _sstyled } from "@semcore/core";
import { assignProps as _assignProps2 } from "@semcore/core";
import { assignProps as _assignProps } from "@semcore/core";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import BaseTrigger from './BaseTrigger';
import { Box } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import Dot from '@semcore/dot';
import Close from '@semcore/icon/Close/m';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

/*__reshadow-styles__:"./style/filter-trigger.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SButtonTrigger_117xk_gg_{border:1px solid var(--intergalactic-border-primary,#c4c7cf);background:var(--intergalactic-bg-primary-neutral,#fff);color:var(--intergalactic-text-primary,#191b23)}.___SButtonTrigger_117xk_gg_::-moz-focus-inner{border:none;padding:0}.___SButtonTrigger_117xk_gg_:active,.___SButtonTrigger_117xk_gg_:focus{outline:0;text-decoration:none}@media (hover: hover){.___SButtonTrigger_117xk_gg_:hover{outline:0;text-decoration:none}}.___SButtonTrigger_117xk_gg_:active,.___SButtonTrigger_117xk_gg_.__active_117xk_gg_{background-color:var(--intergalactic-control-secondary-neutral-hover,rgba(138,142,155,.2))}@media (hover: hover){.___SButtonTrigger_117xk_gg_:hover{background-color:var(--intergalactic-control-secondary-neutral-hover,rgba(138,142,155,.2))}}.___SButtonTrigger_117xk_gg_._size_m_117xk_gg_{min-width:26px;height:28px;border-radius:var(--intergalactic-rounded-medium,6px);font-size:var(--intergalactic-fs-200,14px)}.___SButtonTrigger_117xk_gg_._size_l_117xk_gg_{min-width:32px;height:40px;border-radius:var(--intergalactic-rounded-medium,6px);font-size:var(--intergalactic-fs-300,16px)}.___SText_117xk_gg_.__placeholder_117xk_gg_{color:var(--intergalactic-text-placeholder,#a9abb6)}.___SButtonTrigger_117xk_gg_._state_normal_117xk_gg_{border-color:var(--intergalactic-border-primary,#c4c7cf)}.___SButtonTrigger_117xk_gg_._state_valid_117xk_gg_{border-color:var(--intergalactic-border-success,#59ddaa)}.___SButtonTrigger_117xk_gg_._state_invalid_117xk_gg_{border-color:var(--intergalactic-border-critical,#ffaeb5)}.___SFilterTrigger_117xk_gg_.__selected_117xk_gg_{border-color:var(--intergalactic-border-info-active,#006dca);background-color:var(--intergalactic-control-secondary-info-hover,rgba(0,143,248,.2));color:var(--intergalactic-text-primary,#191b23)}.___SFilterTrigger_117xk_gg_.__selected_117xk_gg_.__active_117xk_gg_{background-color:var(--intergalactic-control-secondary-info-active,rgba(0,143,248,.3))}@media (hover: hover){.___SFilterTrigger_117xk_gg_.__selected_117xk_gg_:hover{background-color:var(--intergalactic-control-secondary-info-active,rgba(0,143,248,.3))}}.___SWrapper_117xk_gg_{display:inline-flex}.___SWrapper_117xk_gg_:focus{outline:none}.___SWrapper_117xk_gg_.__keyboardFocused_117xk_gg_{box-shadow:var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SCounter_117xk_gg_{background-color:var(--intergalactic-bg-primary-info,#008ff8)}"
/*__inner_css_end__*/
, "117xk_gg_")
/*__reshadow_css_end__*/
, {
  "__SButtonTrigger": "___SButtonTrigger_117xk_gg_",
  "_active": "__active_117xk_gg_",
  "_size_m": "_size_m_117xk_gg_",
  "_size_l": "_size_l_117xk_gg_",
  "__SText": "___SText_117xk_gg_",
  "_placeholder": "__placeholder_117xk_gg_",
  "_state_normal": "_state_normal_117xk_gg_",
  "_state_valid": "_state_valid_117xk_gg_",
  "_state_invalid": "_state_invalid_117xk_gg_",
  "__SFilterTrigger": "___SFilterTrigger_117xk_gg_",
  "_selected": "__selected_117xk_gg_",
  "__SWrapper": "___SWrapper_117xk_gg_",
  "_keyboardFocused": "__keyboardFocused_117xk_gg_",
  "__SCounter": "___SCounter_117xk_gg_"
});

var RootFilterTrigger = /*#__PURE__*/function (_Component) {
  _inherits(RootFilterTrigger, _Component);

  var _super = _createSuper(RootFilterTrigger);

  function RootFilterTrigger() {
    var _this;

    _classCallCheck(this, RootFilterTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleStopPropagation", function (e) {
      return e.stopPropagation();
    });

    return _this;
  }

  _createClass(RootFilterTrigger, [{
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref3;

      var SWrapper = Box;
      var SFilterTrigger = BaseTrigger;
      var _this$asProps = this.asProps,
          Children = _this$asProps.Children,
          styles = _this$asProps.styles,
          empty = _this$asProps.empty,
          onClear = _this$asProps.onClear,
          size = _this$asProps.size,
          placeholder = _this$asProps.placeholder,
          active = _this$asProps.active,
          disabled = _this$asProps.disabled,
          getI18nText = _this$asProps.getI18nText;

      if (this.asProps.role === 'button') {
        this.asProps.role = 'group';
      }

      return _ref3 = sstyled(styles), /*#__PURE__*/React.createElement(SWrapper, _ref3.cn("SWrapper", _objectSpread({}, _assignProps({
        "aria-label": getI18nText('filter')
      }, _ref))), /*#__PURE__*/React.createElement(NeighborLocation, _ref3.cn("NeighborLocation", {}), /*#__PURE__*/React.createElement(SFilterTrigger, _ref3.cn("SFilterTrigger", {
        "w": "100%",
        "size": size,
        "placeholder": placeholder,
        "empty": empty,
        "selected": !empty,
        "active": active,
        "disabled": disabled
      }), addonTextChildren(Children, FilterTrigger.Text, [FilterTrigger.Addon, FilterTrigger.Counter], empty), empty && /*#__PURE__*/React.createElement(FilterTrigger.Addon, {
        tag: ChevronDown
      })), !empty && /*#__PURE__*/React.createElement(SFilterTrigger, _ref3.cn("SFilterTrigger", {
        "tag": "button",
        "aria-label": getI18nText('clear'),
        "size": size,
        "empty": empty,
        "selected": true,
        "onClick": callAllEventHandlers(onClear, this.handleStopPropagation),
        "onKeyDown": this.handleStopPropagation,
        "disabled": disabled
      }), /*#__PURE__*/React.createElement(FilterTrigger.Addon, {
        tag: Close
      }))));
    }
  }]);

  return RootFilterTrigger;
}(Component);

_defineProperty(RootFilterTrigger, "displayName", 'FilterTrigger');

_defineProperty(RootFilterTrigger, "style", style);

_defineProperty(RootFilterTrigger, "enhance", [i18nEnhance(localizedMessages)]);

_defineProperty(RootFilterTrigger, "defaultProps", {
  i18n: localizedMessages,
  locale: 'en'
});

function Counter(props) {
  var _ref2 = arguments[0],
      _ref4;

  var SCounter = BaseTrigger.Addon;
  return _ref4 = sstyled(props.styles), /*#__PURE__*/React.createElement(SCounter, _ref4.cn("SCounter", _objectSpread({}, _assignProps2({
    "tag": Dot
  }, _ref2))));
}

var FilterTrigger = createComponent(RootFilterTrigger, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
  Counter: Counter
}, {
  parent: BaseTrigger
});
export default FilterTrigger;
//# sourceMappingURL=FilterTrigger.js.map