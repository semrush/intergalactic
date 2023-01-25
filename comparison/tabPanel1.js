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
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import a11yEnhance from '@semcore/utils/lib/enhances/a11yEnhance';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

/*__reshadow-styles__:"./style/tab-panel.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___STabPanel_168l5_gg_{display:flex;width:100%;max-width:100%;border-bottom:1px solid var(--intergalactic-border-primary,#c4c7cf)}.___STabPanelItem_168l5_gg_{position:relative;bottom:-1px;display:inline-flex;min-width:0;height:32px;color:var(--intergalactic-text-secondary,#6c6e79);border:1px solid transparent;border-radius:var(--intergalactic-rounded-medium,6px) var(--intergalactic-rounded-medium,6px) 0 0;background:transparent;align-items:center;justify-content:center;touch-action:manipulation;-webkit-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box;padding:0;margin:0;box-shadow:none;outline:none;text-decoration:none;-webkit-tap-highlight-color:transparent;outline:0;text-align:center;vertical-align:middle;font-family:inherit;cursor:pointer}.___STabPanelItem_168l5_gg_ .___SText_168l5_gg_{font-size:var(--intergalactic-fs-200,14px);line-height:var(--intergalactic-lh-200,142%);font-weight:var(--intergalactic-medium,500)}.___STabPanelItem_168l5_gg_::-moz-focus-inner{border:none;padding:0}.___STabPanelItem_168l5_gg_:active,.___STabPanelItem_168l5_gg_:focus{outline:0;text-decoration:none}@media (hover: hover){.___STabPanelItem_168l5_gg_:hover{outline:0;text-decoration:none}}@media (hover: hover){.___STabPanelItem_168l5_gg_:hover{color:var(--intergalactic-text-primary,#191b23)}}.___STabPanelItem_168l5_gg_.__disabled_168l5_gg_{opacity:var(--intergalactic-disabled-opacity,.3);cursor:default;pointer-events:none}.___STabPanelItem_168l5_gg_.__keyboardFocused_168l5_gg_{box-shadow:var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___STabPanelItem_168l5_gg_.__selected_168l5_gg_{color:var(--intergalactic-text-link,#006dca);border-color:var(--intergalactic-border-primary,#c4c7cf);border-bottom-color:var(--intergalactic-border-primary-invert,#fff);flex-shrink:0}@media (hover: hover){.___STabPanelItem_168l5_gg_.__selected_168l5_gg_:hover{color:var(--intergalactic-text-link-hover-active,#044792)}}.___SText_168l5_gg_{display:inline-block;margin:auto var(--intergalactic-spacing-2x,8px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.___SAddon_168l5_gg_{display:inline-flex;align-items:center;justify-content:center}.___SAddon_168l5_gg_:not(:only-child):first-child{margin-left:var(--intergalactic-spacing-2x,8px)}.___SAddon_168l5_gg_:not(:only-child):last-child{margin-right:var(--intergalactic-spacing-2x,8px)}.___SAddon_168l5_gg_:only-child{margin-right:var(--intergalactic-spacing-2x,8px);margin-left:var(--intergalactic-spacing-2x,8px)}"
/*__inner_css_end__*/
, "168l5_gg_")
/*__reshadow_css_end__*/
, {
  "__STabPanel": "___STabPanel_168l5_gg_",
  "__STabPanelItem": "___STabPanelItem_168l5_gg_",
  "__SText": "___SText_168l5_gg_",
  "_disabled": "__disabled_168l5_gg_",
  "_keyboardFocused": "__keyboardFocused_168l5_gg_",
  "_selected": "__selected_168l5_gg_",
  "__SAddon": "___SAddon_168l5_gg_"
});
var optionsA11yEnhance = {
  onNeighborChange: function onNeighborChange(neighborElement) {
    if (neighborElement) {
      neighborElement.focus();
    }
  },
  childSelector: ['role', 'tab']
};

var TabPanelRoot = /*#__PURE__*/function (_Component) {
  _inherits(TabPanelRoot, _Component);

  var _super = _createSuper(TabPanelRoot);

  function TabPanelRoot() {
    var _this;

    _classCallCheck(this, TabPanelRoot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (value) {
      return function (event) {
        _this.handlers.value(value, event);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (value) {
      return function (event) {
        if (event.code === 'Enter' || event.code === 'Space') {
          _this.handlers.value(value, event);
        }
      };
    });

    return _this;
  }

  _createClass(TabPanelRoot, [{
    key: "uncontrolledProps",
    value: function uncontrolledProps() {
      return {
        value: null
      };
    }
  }, {
    key: "getItemProps",
    value: function getItemProps(props) {
      var value = this.asProps.value;
      var isSelected = value === props.value;
      return {
        selected: isSelected,
        onClick: this.handleClick(props.value),
        onKeyDown: this.handleKeyDown(props.value),
        tabIndex: isSelected ? 0 : -1,
        'aria-posinset': value,
        'aria-selected': isSelected
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref5;

      var STabPanel = Box;
      var styles = this.asProps.styles;
      return _ref5 = sstyled(styles), /*#__PURE__*/React.createElement(STabPanel, _ref5.cn("STabPanel", _objectSpread({}, _assignProps({
        "role": "tablist"
      }, _ref))));
    }
  }]);

  return TabPanelRoot;
}(Component);

_defineProperty(TabPanelRoot, "displayName", 'TabPanel');

_defineProperty(TabPanelRoot, "style", style);

_defineProperty(TabPanelRoot, "defaultProps", {
  defaultValue: null
});

_defineProperty(TabPanelRoot, "enhance", [a11yEnhance(optionsA11yEnhance)]);

function TabPanelItem(props) {
  var _ref2 = arguments[0],
      _ref6;

  var STabPanelItem = Box;
  var Children = props.Children,
      styles = props.styles,
      addonLeft = props.addonLeft,
      addonRight = props.addonRight;
  return _ref6 = sstyled(styles), /*#__PURE__*/React.createElement(STabPanelItem, _ref6.cn("STabPanelItem", _objectSpread({}, _assignProps2({
    "type": "button",
    "tag": "button",
    "role": "tab"
  }, _ref2))), addonLeft ? /*#__PURE__*/React.createElement(TabPanel.Item.Addon, {
    tag: addonLeft
  }) : null, addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon), addonRight ? /*#__PURE__*/React.createElement(TabPanel.Item.Addon, {
    tag: addonRight
  }) : null);
}

TabPanelItem.enhance = [keyboardFocusEnhance()];

function Text(props) {
  var _ref3 = arguments[0],
      _ref7;

  var SText = Box;
  var styles = props.styles;
  return _ref7 = sstyled(styles), /*#__PURE__*/React.createElement(SText, _ref7.cn("SText", _objectSpread({}, _assignProps3({
    "tag": "span"
  }, _ref3))));
}

function Addon(props) {
  var _ref4 = arguments[0],
      _ref8;

  var SAddon = Box;
  var styles = props.styles;
  return _ref8 = sstyled(styles), /*#__PURE__*/React.createElement(SAddon, _ref8.cn("SAddon", _objectSpread({}, _assignProps4({
    "tag": "span"
  }, _ref4))));
}

var TabPanel = createComponent(TabPanelRoot, {
  Item: [TabPanelItem, {
    Text: Text,
    Addon: Addon
  }]
});
export default TabPanel;
//# sourceMappingURL=TabPanel.js.map