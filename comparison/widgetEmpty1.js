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
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { getIllustrationPath } from '@semcore/illustration';
import { Box, Flex } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

/*__reshadow-styles__:"./style/widget-empty.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SWidgetEmpty_j0tgt_gg_{flex-direction:column;justify-content:center;align-items:center;margin-bottom:var(--intergalactic-spacing-4x,16px)}.___SImage_j0tgt_gg_{display:flex;align-items:flex-end;justify-content:center;margin-bottom:var(--intergalactic-spacing-3x,12px)}.___STitle_j0tgt_gg_{color:var(--intergalactic-text-secondary,#6c6e79)}.___STitle_j0tgt_gg_{font-size:var(--intergalactic-fs-300,16px);line-height:var(--intergalactic-lh-300,150%);font-weight:var(--intergalactic-bold,700)}.___SDescription_j0tgt_gg_{text-align:center;font-size:var(--intergalactic-fs-200,14px);line-height:var(--intergalactic-lh-200,142%);color:var(--intergalactic-text-secondary,#6c6e79);max-width:400px}.___STitle_j0tgt_gg_+.___SDescription_j0tgt_gg_{margin-top:var(--intergalactic-spacing-1x,4px)}.___SDescription_j0tgt_gg_+.___SDescription_j0tgt_gg_{margin-top:var(--intergalactic-spacing-2x,8px)}"
/*__inner_css_end__*/
, "j0tgt_gg_")
/*__reshadow_css_end__*/
, {
  "__SWidgetEmpty": "___SWidgetEmpty_j0tgt_gg_",
  "__SImage": "___SImage_j0tgt_gg_",
  "__STitle": "___STitle_j0tgt_gg_",
  "__SDescription": "___SDescription_j0tgt_gg_"
});
export var getIconPath = function getIconPath(name) {
  return getIllustrationPath(name);
};

var WidgetEmpty = /*#__PURE__*/function (_Component) {
  _inherits(WidgetEmpty, _Component);

  var _super = _createSuper(WidgetEmpty);

  function WidgetEmpty() {
    _classCallCheck(this, WidgetEmpty);

    return _super.apply(this, arguments);
  }

  _createClass(WidgetEmpty, [{
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref4;

      var SWidgetEmpty = Flex;
      var _this$asProps = this.asProps,
          Children = _this$asProps.Children,
          icon = _this$asProps.icon,
          styles = _this$asProps.styles;
      var SImage = 'div';
      return _ref4 = sstyled(styles), /*#__PURE__*/React.createElement(SWidgetEmpty, _ref4.cn("SWidgetEmpty", _objectSpread({}, _assignProps({}, _ref))), isNode(icon) && /*#__PURE__*/React.createElement(SImage, _ref4.cn("SImage", {
        "aria-hidden": "true"
      }), typeof icon === 'string' ? /*#__PURE__*/React.createElement("img", _ref4.cn("img", {
        "src": icon,
        "alt": "widget empty icon"
      })) : icon), /*#__PURE__*/React.createElement(Children, _ref4.cn("Children", {})));
    }
  }]);

  return WidgetEmpty;
}(Component);

_defineProperty(WidgetEmpty, "displayName", 'WidgetEmpty');

_defineProperty(WidgetEmpty, "style", style);

var Title = function Title(props) {
  var _ref2 = arguments[0],
      _ref5;

  var STitle = Box;
  var styles = props.styles;
  return _ref5 = sstyled(styles), /*#__PURE__*/React.createElement(STitle, _ref5.cn("STitle", _objectSpread({}, _assignProps2({}, _ref2))));
};

var Description = function Description(props) {
  var _ref3 = arguments[0],
      _ref6;

  var SDescription = Box;
  var styles = props.styles;
  return _ref6 = sstyled(styles), /*#__PURE__*/React.createElement(SDescription, _ref6.cn("SDescription", _objectSpread({}, _assignProps3({}, _ref3))));
};

export default createComponent(WidgetEmpty, {
  Title: Title,
  Description: Description
});
//# sourceMappingURL=WidgetEmpty.js.map