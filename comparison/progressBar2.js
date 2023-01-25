import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
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
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

/*__reshadow-styles__:"./style/progress-bar.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SProgressBar_m8oi3_gg_{position:relative;width:100%;overflow:hidden;background-color:var(--intergalactic-progress-bar-bg,#e0e1e9)}.___SValue_m8oi3_gg_{position:absolute;top:0;left:0;background-color:var(--intergalactic-progress-bar-value-bg,#000);background-image:var(--intergalactic-progress-bar-value-gradient,linear-gradient(-45deg,rgba(0,159,129,.9) 25%,#009f81 0,#009f81 50%,rgba(0,159,129,.9) 0,rgba(0,159,129,.9) 75%,#009f81 0));overflow:hidden;animation-name:loading_m8oi3;animation-timing-function:linear;animation-iteration-count:infinite;transition-property:width;transition-timing-function:linear;transition-duration:1s;width:var(--width_m8oi3);animation-duration:var(--duration_m8oi3)}.___SProgressBar_m8oi3_gg_._size_s_m8oi3_gg_,.___SValue_m8oi3_gg_._size_s_m8oi3_gg_{height:4px;border-radius:var(--intergalactic-rounded-medium,6px);background-size:8px 8px}.___SProgressBar_m8oi3_gg_._size_m_m8oi3_gg_,.___SValue_m8oi3_gg_._size_m_m8oi3_gg_{height:8px;border-radius:var(--intergalactic-rounded-medium,6px);background-size:12px 12px}.___SProgressBar_m8oi3_gg_._size_l_m8oi3_gg_,.___SValue_m8oi3_gg_._size_l_m8oi3_gg_{height:12px;border-radius:var(--intergalactic-rounded-medium,6px);background-size:16px 16px}.___SProgressBar_m8oi3_gg_._theme_dark_m8oi3_gg_{background-color:var(--intergalactic-progress-bar-bg-invert,hsla(0,0%,100%,.2))}.___SProgressBar_m8oi3_gg_._theme_invert_m8oi3_gg_{background-color:var(--intergalactic-progress-bar-bg,#e0e1e9)}@keyframes loading_m8oi3{0%{background-position:0 0}to{background-position:60px 0}}.___SProgressBar_m8oi3_gg_.__animation_m8oi3_gg_{background-color:var(--intergalactic-progress-bar-value-bg,#000);background-image:var(--intergalactic-progress-bar-pattern-gradient,linear-gradient(-45deg,rgba(224,225,233,.9) 25%,#e0e1e9 0,#e0e1e9 50%,rgba(224,225,233,.9) 0,rgba(224,225,233,.9) 75%,#e0e1e9 0));animation-name:loading_m8oi3;animation-timing-function:linear;animation-iteration-count:infinite;animation-duration:var(--duration_m8oi3)}.___SProgressBar_m8oi3_gg_._theme_custom_m8oi3_gg_{background-color:var(--colorBg_m8oi3);background-image:var(--colorBg_m8oi3)}.___SValue_m8oi3_gg_.__theme_m8oi3_gg_{background-color:var(--colorBg_m8oi3);background-image:var(--colorBg_m8oi3)}@media (prefers-reduced-motion){.___SValue_m8oi3_gg_{animation-name:none}.___SProgressBar_m8oi3_gg_.__animation_m8oi3_gg_{animation-name:none}}"
/*__inner_css_end__*/
, "m8oi3_gg_")
/*__reshadow_css_end__*/
, {
  "__SProgressBar": "___SProgressBar_m8oi3_gg_",
  "__SValue": "___SValue_m8oi3_gg_",
  "_size_s": "_size_s_m8oi3_gg_",
  "_size_m": "_size_m_m8oi3_gg_",
  "_size_l": "_size_l_m8oi3_gg_",
  "_theme_dark": "_theme_dark_m8oi3_gg_",
  "_theme_invert": "_theme_invert_m8oi3_gg_",
  "@loading": "loading_m8oi3",
  "_animation": "__animation_m8oi3_gg_",
  "_theme_custom": "_theme_custom_m8oi3_gg_",
  "--colorBg": "--colorBg_m8oi3",
  "_theme": "__theme_m8oi3_gg_",
  "--width": "--width_m8oi3",
  "--duration": "--duration_m8oi3"
});

function isCustomTheme(theme) {
  return !['dark', 'invert'].includes(theme);
}

var ProgressBarRoot = /*#__PURE__*/function (_Component) {
  _inherits(ProgressBarRoot, _Component);

  var _super = _createSuper(ProgressBarRoot);

  function ProgressBarRoot() {
    _classCallCheck(this, ProgressBarRoot);

    return _super.apply(this, arguments);
  }

  _createClass(ProgressBarRoot, [{
    key: "getValueProps",
    value: function getValueProps() {
      var _this$asProps = this.asProps,
          value = _this$asProps.value,
          duration = _this$asProps.duration,
          size = _this$asProps.size;
      return {
        value: value,
        duration: duration,
        size: size
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref3;

      var SProgressBar = Box;
      var _this$asProps2 = this.asProps,
          Children = _this$asProps2.Children,
          styles = _this$asProps2.styles,
          duration = _this$asProps2.duration,
          theme = _this$asProps2.theme,
          value = _this$asProps2.value;
      var useTheme = isCustomTheme(theme) ? 'custom' : theme;
      return _ref3 = sstyled(styles), /*#__PURE__*/React.createElement(SProgressBar, _ref3.cn("SProgressBar", _objectSpread({}, _assignProps({
        "use:theme": useTheme,
        "use:animation": !value,
        "use:duration": "".concat(duration, "ms"),
        "colorBg": resolveColor(theme),
        "role": "progressbar",
        "aria-valuenow": value
      }, _ref))), /*#__PURE__*/React.createElement(Children, _ref3.cn("Children", {})));
    }
  }]);

  return ProgressBarRoot;
}(Component);

_defineProperty(ProgressBarRoot, "displayName", 'ProgressBar');

_defineProperty(ProgressBarRoot, "style", style);

_defineProperty(ProgressBarRoot, "defaultProps", function () {
  return {
    duration: 1000,
    size: 'm',
    theme: 'invert',
    children: /*#__PURE__*/React.createElement(ProgressBar.Value, null)
  };
});

function Value(props) {
  var _ref2 = arguments[0],
      _ref4;

  var SValue = Box;
  var styles = props.styles,
      value = props.value,
      theme = props.theme,
      duration = props.duration;
  var width = "".concat(value, "%");
  return _ref4 = sstyled(styles), /*#__PURE__*/React.createElement(SValue, _ref4.cn("SValue", _objectSpread({}, _assignProps2({
    "use:width": width,
    "use:duration": "".concat(duration, "ms"),
    "colorBg": resolveColor(theme)
  }, _ref2))));
}

var ProgressBar = createComponent(ProgressBarRoot, {
  Value: Value
});
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map