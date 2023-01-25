import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
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
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import logger from '@semcore/utils/lib/logger';
import hasLabels from '@semcore/utils/lib/hasLabels';

/*__reshadow-styles__:"./style/link.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SLink_1vnjs_gg_{display:inline-block;font-family:inherit;color:var(--intergalactic-text-link,#006dca);line-height:normal;position:relative;cursor:pointer;outline:none;text-decoration:none;border:none;padding:0;margin:0;box-shadow:none;-webkit-tap-highlight-color:transparent;outline:0;background:none;transition:color .15s ease-in-out}.___SLink_1vnjs_gg_:active,.___SLink_1vnjs_gg_:focus{outline:0;text-decoration:none}@media (hover: hover){.___SLink_1vnjs_gg_:hover{outline:0;text-decoration:none;color:var(--intergalactic-text-link-hover-active,#044792)}}.___SLink_1vnjs_gg_::-moz-focus-inner{border:none;padding:0}.___SLink_1vnjs_gg_:active,.___SLink_1vnjs_gg_.__active_1vnjs_gg_{color:var(--intergalactic-text-link-hover-active,#044792)}@media (hover: hover){}.___SLink_1vnjs_gg_:active .___SText_1vnjs_gg_,.___SLink_1vnjs_gg_.__active_1vnjs_gg_ .___SText_1vnjs_gg_{border-color:currentColor}@media (hover: hover){.___SLink_1vnjs_gg_:hover .___SText_1vnjs_gg_{border-color:currentColor}}.___SLink_1vnjs_gg_.__keyboardFocused_1vnjs_gg_{box-shadow:var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SLink_1vnjs_gg_.__disabled_1vnjs_gg_{opacity:var(--intergalactic-disabled-opacity,.3);cursor:default;pointer-events:none}.___SLink_1vnjs_gg_.__noWrapText_1vnjs_gg_{white-space:nowrap}.___SLink_1vnjs_gg_.__enableVisited_1vnjs_gg_:visited{color:var(--intergalactic-text-link-visited,#8649e1)}@media (hover: hover){.___SLink_1vnjs_gg_.__enableVisited_1vnjs_gg_:visited:hover{color:var(--intergalactic-text-link-visited,#8649e1)}}.___SLink_1vnjs_gg_.__inline_1vnjs_gg_{display:inline}.___SAddon_1vnjs_gg_{display:inline-flex;justify-content:center;align-items:center;margin-bottom:var(--intergalactic-spacing-05x,2px);vertical-align:middle}.___SLink_1vnjs_gg_ .___SAddon_1vnjs_gg_:not(:only-child):first-child{margin-right:var(--intergalactic-spacing-1x,4px)}.___SLink_1vnjs_gg_ .___SAddon_1vnjs_gg_:not(:only-child):last-child{margin-left:var(--intergalactic-spacing-1x,4px)}.___SText_1vnjs_gg_{border-bottom-width:1px;border-bottom-style:solid;border-color:transparent;transition:border-bottom-color .15s ease-in-out}@media (hover: hover){.___SLink_1vnjs_gg_.__color_1vnjs_gg_:hover{color:var(--colorHoverText_1vnjs)}}@media (prefers-reduced-motion){.___SLink_1vnjs_gg_{transition:none}.___SText_1vnjs_gg_{transition:none}}"
/*__inner_css_end__*/
, "1vnjs_gg_")
/*__reshadow_css_end__*/
, {
  "__SLink": "___SLink_1vnjs_gg_",
  "_active": "__active_1vnjs_gg_",
  "__SText": "___SText_1vnjs_gg_",
  "_keyboardFocused": "__keyboardFocused_1vnjs_gg_",
  "_disabled": "__disabled_1vnjs_gg_",
  "_noWrapText": "__noWrapText_1vnjs_gg_",
  "_enableVisited": "__enableVisited_1vnjs_gg_",
  "_inline": "__inline_1vnjs_gg_",
  "__SAddon": "___SAddon_1vnjs_gg_",
  "_color": "__color_1vnjs_gg_",
  "--colorHoverText": "--colorHoverText_1vnjs"
});

var RootLink = /*#__PURE__*/function (_Component) {
  _inherits(RootLink, _Component);

  var _super = _createSuper(RootLink);

  function RootLink() {
    var _this;

    _classCallCheck(this, RootLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "containerRef", /*#__PURE__*/React.createRef());

    return _this;
  }

  _createClass(RootLink, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn(!hasLabels(this.containerRef.current), "'aria-label' or 'aria-labelledby' are required props for links without text content", this.asProps['data-ui-name'] || Button.displayName);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref4;

      var SLink = Text;
      var _this$asProps = this.asProps,
          Children = _this$asProps.Children,
          styles = _this$asProps.styles,
          noWrap = _this$asProps.noWrap,
          addonLeft = _this$asProps.addonLeft,
          addonRight = _this$asProps.addonRight,
          color = _this$asProps.color,
          disabled = _this$asProps.disabled;
      var colorHoverText = shade(resolveColor(color), -0.12);
      return _ref4 = sstyled(styles), /*#__PURE__*/React.createElement(SLink, _ref4.cn("SLink", _objectSpread({}, _assignProps({
        "role": "link",
        "tabIndex": disabled ? -1 : 0,
        "aria-disabled": !!disabled,
        "tag": "a",
        "colorHoverText": colorHoverText,
        "noWrapText": noWrap,
        "use:noWrap": false,
        "ref": this.containerRef
      }, _ref))), addonLeft ? /*#__PURE__*/React.createElement(Link.Addon, {
        tag: addonLeft
      }) : null, addonTextChildren(Children, Link.Text, Link.Addon), addonRight ? /*#__PURE__*/React.createElement(Link.Addon, {
        tag: addonRight
      }) : null);
    }
  }]);

  return RootLink;
}(Component);

_defineProperty(RootLink, "displayName", 'Link');

_defineProperty(RootLink, "defaultProps", {
  noWrap: true
});

_defineProperty(RootLink, "style", style);

_defineProperty(RootLink, "enhance", [keyboardFocusEnhance()]);

function LinkText(props) {
  var _ref2 = arguments[0],
      _ref5;

  var SText = Box;
  var styles = props.styles;
  return _ref5 = sstyled(styles), /*#__PURE__*/React.createElement(SText, _ref5.cn("SText", _objectSpread({}, _assignProps2({
    "tag": "span"
  }, _ref2))));
}

function Addon(props) {
  var _ref3 = arguments[0],
      _ref6;

  var SAddon = Box;
  var styles = props.styles;
  return _ref6 = sstyled(styles), /*#__PURE__*/React.createElement(SAddon, _ref6.cn("SAddon", _objectSpread({}, _assignProps3({
    "tag": "span"
  }, _ref3))));
}

var Link = createComponent(RootLink, {
  Text: LinkText,
  Addon: Addon
});
export default Link;
//# sourceMappingURL=Link.js.map