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

import React, { useCallback } from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

/*__reshadow-styles__:"./style/wizard.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SWizard_1da1d_gg_{max-width:980px;max-height:700px;display:flex;padding:0;background:transparent}.___SSidebar_1da1d_gg_{background:var(--intergalactic-control-primary-advertising,#5925ab);color:var(--intergalactic-text-primary-invert,#fff);font-weight:var(--intergalactic-bold,700);font-size:var(--intergalactic-fs-300,16px);line-height:var(--intergalactic-lh-300,150%);padding:var(--intergalactic-spacing-10x,40px) var(--intergalactic-spacing-2x,8px) calc(var(--intergalactic-spacing-8x, 32px) + var(--intergalactic-spacing-05x, 2px));max-width:220px;flex-shrink:0;box-sizing:border-box;border-radius:var(--intergalactic-rounded-large,12px) 0 0 var(--intergalactic-rounded-large,12px)}@media (max-width:1060px){.___SSidebar_1da1d_gg_{width:44px}}.___SSidebarHeader_1da1d_gg_{margin:0 var(--intergalactic-spacing-5x,20px) var(--intergalactic-spacing-4x,16px)}@media (max-width:1060px){.___SSidebarHeader_1da1d_gg_{display:none}}.___SStepper_1da1d_gg_{display:flex;font-size:var(--intergalactic-fs-200,14px);border-radius:var(--intergalactic-rounded-medium,6px);padding:var(--intergalactic-spacing-2x,8px) var(--intergalactic-spacing-3x,12px);cursor:pointer;position:relative;overflow:auto;line-height:var(--intergalactic-lh-200,142%)}@media (hover: hover){.___SStepper_1da1d_gg_:hover{background:var(--intergalactic-control-primary-advertising-hover,#421983);z-index:1}}.___SStepper_1da1d_gg_.__active_1da1d_gg_{background:var(--intergalactic-control-primary-advertising-active,#8649e1)}.___SStepper_1da1d_gg_:disabled,.___SStepper_1da1d_gg_.__disabled_1da1d_gg_{opacity:var(--intergalactic-disabled-opacity,.3);cursor:default;pointer-events:none}@media (max-width:1060px){.___SStepper_1da1d_gg_{padding:var(--intergalactic-spacing-2x,8px) var(--intergalactic-spacing-1x,4px)}@media (hover: hover){.___SStepper_1da1d_gg_:hover{width:-moz-fit-content;width:fit-content;max-width:220px}}@media (hover: hover){.___SStepper_1da1d_gg_:hover .___SStepDescription_1da1d_gg_{display:block;border-radius:var(--intergalactic-rounded-medium,6px);white-space:nowrap;overflow:auto}}@media (hover: hover){.___SStepper_1da1d_gg_.__active_1da1d_gg_:hover .___SStepDescription_1da1d_gg_{background:var(--intergalactic-control-primary-advertising-active,#8649e1)}}}.___SStepNumber_1da1d_gg_{display:inline-block;min-width:24px}.___SCompleted_1da1d_gg_{margin-top:1px}@media (max-width:1060px){.___SStepDescription_1da1d_gg_{display:none}}.___SContent_1da1d_gg_{padding:var(--intergalactic-spacing-10x,40px);width:100%;border-radius:0 var(--intergalactic-rounded-large,12px) var(--intergalactic-rounded-large,12px) 0;background:var(--intergalactic-bg-primary-neutral,#fff)}"
/*__inner_css_end__*/
, "1da1d_gg_")
/*__reshadow_css_end__*/
, {
  "__SWizard": "___SWizard_1da1d_gg_",
  "__SSidebar": "___SSidebar_1da1d_gg_",
  "__SSidebarHeader": "___SSidebarHeader_1da1d_gg_",
  "__SStepper": "___SStepper_1da1d_gg_",
  "_active": "__active_1da1d_gg_",
  "_disabled": "__disabled_1da1d_gg_",
  "__SStepDescription": "___SStepDescription_1da1d_gg_",
  "__SStepNumber": "___SStepNumber_1da1d_gg_",
  "__SCompleted": "___SCompleted_1da1d_gg_",
  "__SContent": "___SContent_1da1d_gg_"
});

var WizardRoot = /*#__PURE__*/function (_Component) {
  _inherits(WizardRoot, _Component);

  var _super = _createSuper(WizardRoot);

  function WizardRoot() {
    var _this;

    _classCallCheck(this, WizardRoot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_steps", new Map());

    return _this;
  }

  _createClass(WizardRoot, [{
    key: "getStepProps",
    value: function getStepProps(props) {
      return {
        steps: this._steps,
        active: props.step === this.asProps.step
      };
    }
  }, {
    key: "getStepperProps",
    value: function getStepperProps(props, i) {
      var number = i + 1;

      if (this._steps.has(props.step)) {
        var step = this._steps.get(props.step);

        number = step.number;
      } else {
        this._steps.set(props.step, _objectSpread({
          number: number
        }, props));
      }

      return {
        active: props.step === this.asProps.step,
        number: number
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _ref5;

      var SWizard = this.Root;
      var _this$asProps = this.asProps,
          Children = _this$asProps.Children,
          styles = _this$asProps.styles;

      this._steps.clear();

      return _ref5 = sstyled(styles), /*#__PURE__*/React.createElement(SWizard, _ref5.cn("SWizard", {
        "render": Modal
      }), /*#__PURE__*/React.createElement(Children, _ref5.cn("Children", {})));
    }
  }]);

  return WizardRoot;
}(Component);

_defineProperty(WizardRoot, "displayName", 'Wizard');

_defineProperty(WizardRoot, "style", style);

_defineProperty(WizardRoot, "defaultProps", {
  step: null
});

function Sidebar(props) {
  var _ref = arguments[0],
      _ref6;

  var Children = props.Children,
      styles = props.styles,
      title = props.title;
  var SSidebar = Box;
  var SSidebarHeader = 'div';
  return _ref6 = sstyled(styles), /*#__PURE__*/React.createElement(SSidebar, _ref6.cn("SSidebar", _objectSpread({}, _assignProps({
    "role": "menu"
  }, _ref))), title && /*#__PURE__*/React.createElement(SSidebarHeader, _ref6.cn("SSidebarHeader", {}), title), /*#__PURE__*/React.createElement(Children, _ref6.cn("Children", {})));
}

function Step(props) {
  var _ref2 = arguments[0];
  var SStep = Box;
  var Children = props.Children,
      styles = props.styles,
      active = props.active;

  if (active) {
    var _ref7;

    return _ref7 = sstyled(styles), /*#__PURE__*/React.createElement(SStep, _ref7.cn("SStep", _objectSpread({}, _assignProps2({}, _ref2))), /*#__PURE__*/React.createElement(Children, _ref7.cn("Children", {})));
  }

  return null;
}

function Stepper(props) {
  var _ref3 = arguments[0],
      _ref8;

  var Children = props.Children,
      styles = props.styles,
      step = props.step,
      active = props.active,
      onActive = props.onActive,
      completed = props.completed,
      disabled = props.disabled,
      number = props.number;
  var SStepper = Box;
  var SStepNumber = 'span';
  var SStepDescription = 'span';
  var SCompleted = CheckM;
  var handlerClick = useCallback(function (e) {
    if (onActive) onActive(step, e);
  }, [step, onActive]);
  var handlerKeyPress = useCallback(function (e) {
    if (onActive && e.key === 'Enter') {
      onActive(step, e);
    }
  }, [step, onActive]);
  return _ref8 = sstyled(styles), /*#__PURE__*/React.createElement(SStepper, _ref8.cn("SStepper", _objectSpread({}, _assignProps3({
    "role": "menuitem",
    "aria-disabled": disabled,
    "aria-current": active,
    "onClick": handlerClick,
    "onKeyPress": handlerKeyPress
  }, _ref3))), /*#__PURE__*/React.createElement(SStepNumber, _ref8.cn("SStepNumber", {}), completed ? /*#__PURE__*/React.createElement(SCompleted, _ref8.cn("SCompleted", {})) : number), /*#__PURE__*/React.createElement(SStepDescription, _ref8.cn("SStepDescription", {}), /*#__PURE__*/React.createElement(Children, _ref8.cn("Children", {}))));
}

Stepper.enhance = [keyboardFocusEnhance()];

function Content(props) {
  var _ref4 = arguments[0],
      _ref9;

  var Children = props.Children,
      styles = props.styles;
  var SContent = Box;
  return _ref9 = sstyled(styles), /*#__PURE__*/React.createElement(SContent, _ref9.cn("SContent", _objectSpread({}, _assignProps4({}, _ref4))), /*#__PURE__*/React.createElement(Children, _ref9.cn("Children", {})));
}

var Wizard = createComponent(WizardRoot, {
  Sidebar: Sidebar,
  Content: Content,
  Step: Step,
  Stepper: Stepper
});
export default Wizard;
//# sourceMappingURL=Wizard.js.map