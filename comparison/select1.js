import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _typeof from "@babel/runtime/helpers/typeof";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
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
var _excluded = ["Children", "options", "multiselect", "value"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import cn from 'classnames';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import findComponent from '@semcore/utils/lib/findComponent';
import logger from '@semcore/utils/lib/logger';
import resolveColor from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import InputSearch from './InputSearch';
import { useBox } from '@semcore/flex-box';
import { selectContext } from './context';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

/*__reshadow-styles__:"./style/select.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SOptionCheckbox_c3odt_gg_{margin-top:var(--intergalactic-spacing-05x,2px);margin-right:var(--intergalactic-spacing-2x,8px);margin-bottom:auto;position:relative;flex-shrink:0}.___SOptionCheckbox_c3odt_gg_:before{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;background:var(--intergalactic-bg-primary-neutral,#fff);border:1px solid;border-radius:var(--intergalactic-rounded-small,4px);border-color:var(--intergalactic-border-primary,#c4c7cf)}.___SOptionCheckbox_c3odt_gg_{width:16px;height:16px}.___SOptionCheckbox_c3odt_gg_:after{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;margin:0 var(--intergalactic-spacing-05x,2px);background-repeat:no-repeat;background-position:50%;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOC4yNSAxTDQgNS4yNSAxLjc1IDMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=\")}.___SOptionCheckbox_c3odt_gg_._size_l_c3odt_gg_{width:20px;height:20px}.___SOptionCheckbox_c3odt_gg_._size_l_c3odt_gg_:after{background-image:url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgMS41TDQuNzUgNy43NSAxIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=\")}.___SOptionCheckbox_c3odt_gg_.__checked_c3odt_gg_:before{background-color:var(--intergalactic-control-primary-info,#008ff8);border-color:var(--intergalactic-control-primary-info,#008ff8)}.___SOptionCheckbox_c3odt_gg_.__theme_c3odt_gg_:before{border-color:var(--theme_c3odt)}.___SOptionCheckbox_c3odt_gg_.__theme_c3odt_gg_.__checked_c3odt_gg_:before{background-color:var(--theme_c3odt);border-color:var(--theme_c3odt)}.___SOptionCheckbox_c3odt_gg_.__selected_c3odt_gg_{background-color:var(--intergalactic-dropdown-menu-item-selected,rgba(196,229,254,.7))}@media (hover: hover){.___SOptionCheckbox_c3odt_gg_.__selected_c3odt_gg_:hover{background-color:var(--intergalactic-dropdown-menu-item-selected-hover,#c4e5fe)}}"
/*__inner_css_end__*/
, "c3odt_gg_")
/*__reshadow_css_end__*/
, {
  "__SOptionCheckbox": "___SOptionCheckbox_c3odt_gg_",
  "_size_l": "_size_l_c3odt_gg_",
  "_checked": "__checked_c3odt_gg_",
  "_theme": "__theme_c3odt_gg_",
  "--theme": "--theme_c3odt",
  "_selected": "__selected_c3odt_gg_"
});

function isSelectedOption(value, valueOption) {
  return Array.isArray(value) ? value.includes(valueOption) : valueOption === value;
}

function isEmptyValue(value) {
  return Array.isArray(value) ? value.length === 0 : value === null;
}

function getEmptyValue(multiselect) {
  return multiselect ? [] : null;
}

var RootSelect = /*#__PURE__*/function (_Component) {
  _inherits(RootSelect, _Component);

  var _super = _createSuper(RootSelect);

  function RootSelect() {
    var _this;

    _classCallCheck(this, RootSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "firstSelectedOptionRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "isScrolledToFirstOption", false);

    _defineProperty(_assertThisInitialized(_this), "bindHandlerOptionClick", function (optionValue) {
      return function (e) {
        var newValue = optionValue;
        var _this$asProps = _this.asProps,
            value = _this$asProps.value,
            multiselect = _this$asProps.multiselect;

        if (Array.isArray(value)) {
          if (value.includes(optionValue)) {
            newValue = value.filter(function (v) {
              return v !== optionValue;
            });
          } else {
            newValue = value.concat(optionValue);
          }
        }

        _this.handlers.value(newValue, e);

        if (!multiselect) _this.handlers.visible(false);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handlerClear", function (e) {
      var value = _this.asProps.value;
      var emptyValue = getEmptyValue(Array.isArray(value));

      _this.handlers.value(emptyValue, e);

      _this.handlers.visible(false);
    });

    return _this;
  }

  _createClass(RootSelect, [{
    key: "uncontrolledProps",
    value: function uncontrolledProps() {
      return {
        visible: null,
        value: null
      };
    }
  }, {
    key: "getTriggerProps",
    value: function getTriggerProps() {
      var _this$asProps2 = this.asProps,
          size = _this$asProps2.size,
          disabled = _this$asProps2.disabled,
          visible = _this$asProps2.visible,
          state = _this$asProps2.state,
          placeholder = _this$asProps2.placeholder,
          value = _this$asProps2.value,
          options = _this$asProps2.options,
          forwardRef = _this$asProps2.forwardRef,
          name = _this$asProps2.name,
          multiselect = _this$asProps2.multiselect,
          uid = _this$asProps2.uid,
          disablePortal = _this$asProps2.disablePortal,
          getI18nText = _this$asProps2.getI18nText;
      return {
        id: "igc-".concat(uid, "-trigger"),
        'aria-controls': visible ? "igc-".concat(uid, "-list") : undefined,
        'aria-flowto': visible && !disablePortal ? "igc-".concat(uid, "-list") : undefined,
        'aria-label': visible && !disablePortal ? getI18nText('triggerHint') : undefined,
        'aria-haspopup': 'listbox',
        empty: isEmptyValue(value),
        size: size,
        value: value,
        name: name,
        $hiddenRef: forwardRef,
        multiselect: multiselect,
        state: state,
        placeholder: placeholder,
        disabled: disabled,
        active: visible,
        onClear: this.handlerClear,
        children: this.renderChildrenTrigger(value, options),
        getI18nText: getI18nText
      };
    }
  }, {
    key: "getListProps",
    value: function getListProps() {
      var _this$asProps3 = this.asProps,
          multiselect = _this$asProps3.multiselect,
          uid = _this$asProps3.uid;
      return {
        'aria-multiselectable': multiselect ? 'true' : undefined,
        id: "igc-".concat(uid, "-list"),
        role: 'listbox',
        'aria-label': 'List of options',
        'aria-flowto': "igc-".concat(uid, "-trigger")
      };
    }
  }, {
    key: "getMenuProps",
    value: function getMenuProps() {
      var _this$asProps4 = this.asProps,
          uid = _this$asProps4.uid,
          getI18nText = _this$asProps4.getI18nText;
      return {
        id: "igc-".concat(uid, "-list"),
        role: 'listbox',
        'aria-label': getI18nText('optionsList'),
        'aria-flowto': "igc-".concat(uid, "-trigger")
      };
    }
  }, {
    key: "getOptionProps",
    value: function getOptionProps(props) {
      var _this$asProps5 = this.asProps,
          value = _this$asProps5.value,
          uid = _this$asProps5.uid;
      var selected = isSelectedOption(value, props.value);
      var other = {};
      this._optionSelected = selected;

      if (selected && !this.isScrolledToFirstOption) {
        other.ref = this.firstSelectedOptionRef;
        this.isScrolledToFirstOption = true;
      }

      return _objectSpread({
        selected: selected,
        'aria-selected': selected ? 'true' : 'false',
        id: "igc-".concat(uid, "-option-").concat(props.value),
        role: 'option',
        onClick: this.bindHandlerOptionClick(props.value)
      }, other);
    }
  }, {
    key: "getOptionCheckboxProps",
    value: function getOptionCheckboxProps(props) {
      var size = this.asProps.size;
      var hasOption = props.value === undefined;
      var optionProps = hasOption ? {} : this.getOptionProps(props);
      var selected = this._optionSelected;
      this._optionSelected = null;
      return _objectSpread(_objectSpread({}, optionProps), {}, {
        size: size,
        selected: selected
      });
    }
  }, {
    key: "getDividerProps",
    value: function getDividerProps() {
      return {
        my: 1
      };
    }
  }, {
    key: "renderChildrenTrigger",
    value: function renderChildrenTrigger(value, options) {
      if (options) {
        return [].concat(value).reduce(function (acc, value) {
          var selectedOption = options.find(function (o) {
            return isSelectedOption(value, o.value);
          });
          if (!selectedOption) return acc;
          if (acc.length) acc.push(', ');
          acc.push(selectedOption.label || selectedOption.value);
          return acc;
        }, []);
      }

      return Array.isArray(value) ? value.reduce(function (acc, value) {
        if (acc.length) acc.push(', ');
        acc.push(value);
        return acc;
      }, []) : value;
    }
  }, {
    key: "scrollToSelectedOption",
    value: function scrollToSelectedOption() {
      var _this2 = this;

      setTimeout(function () {
        var _this2$firstSelectedO;

        (_this2$firstSelectedO = _this2.firstSelectedOptionRef.current) === null || _this2$firstSelectedO === void 0 ? void 0 : _this2$firstSelectedO.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }, 0);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var visible = this.asProps.visible;

      if (visible) {
        this.scrollToSelectedOption();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var visible = this.asProps.visible;

      if (visible) {
        this.isScrolledToFirstOption = false;

        if (prevProps.visible === undefined) {
          if (prevState.visible !== visible) this.scrollToSelectedOption();
        } else {
          if (prevProps.visible !== visible) this.scrollToSelectedOption();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _ref2 = this.asProps;

      var _this$asProps6 = this.asProps,
          Children = _this$asProps6.Children,
          options = _this$asProps6.options,
          multiselect = _this$asProps6.multiselect,
          value = _this$asProps6.value,
          other = _objectWithoutProperties(_this$asProps6, _excluded);

      var advanceMode = findComponent(Children, [Select.Trigger.displayName, Select.Popper.displayName]);
      logger.warn(options && advanceMode, "Don't use at the same time 'options' property and '<Select.Trigger/>/<Select.Popper/>'", other['data-ui-name'] || Select.displayName);

      if (options) {
        var _ref = this.asProps;
        return /*#__PURE__*/React.createElement(DropdownMenu, _assignProps({}, _ref), /*#__PURE__*/React.createElement(Select.Trigger, _extends({}, other, {
          tabIndex: -1,
          role: "button"
        })), /*#__PURE__*/React.createElement(Select.Menu, null, options.map(function (option, i) {
          return /*#__PURE__*/React.createElement(Select.Option, _extends({
            key: i,
            id: option.value,
            "aria-selected": value === i
          }, option), multiselect && /*#__PURE__*/React.createElement(Select.Option.Checkbox, null), option.children);
        })));
      }

      return /*#__PURE__*/React.createElement(DropdownMenu, _assignProps2({}, _ref2), /*#__PURE__*/React.createElement(Children, null));
    }
  }]);

  return RootSelect;
}(Component);

_defineProperty(RootSelect, "displayName", 'Select');

_defineProperty(RootSelect, "style", style);

_defineProperty(RootSelect, "enhance", [uniqueIDEnhancement(), i18nEnhance(localizedMessages)]);

_defineProperty(RootSelect, "defaultProps", function (props) {
  return {
    placeholder: props.multiselect ? 'Select options' : 'Select option',
    size: 'm',
    defaultValue: getEmptyValue(props.multiselect),
    defaultVisible: false,
    i18n: localizedMessages,
    locale: 'en'
  };
});

var isInputTriggerTag = function isInputTriggerTag(tag) {
  var _tag$render;

  if (typeof tag === 'string') return tag.toLowerCase().includes('input');
  if (_typeof(tag) === 'object' && tag !== null && typeof tag.displayName === 'string') return tag.displayName.toLowerCase().includes('input');
  if (_typeof(tag) === 'object' && tag !== null && typeof ((_tag$render = tag.render) === null || _tag$render === void 0 ? void 0 : _tag$render.displayName) === 'string') return tag.render.displayName.toLowerCase().includes('input');
  return false;
};

function Trigger(_ref5) {
  var _ref3 = arguments[0];
  var Children = _ref5.Children,
      name = _ref5.name,
      uid = _ref5.uid,
      value = _ref5.value,
      $hiddenRef = _ref5.$hiddenRef,
      _ref5$tag = _ref5.tag,
      Tag = _ref5$tag === void 0 ? ButtonTrigger : _ref5$tag,
      getI18nText = _ref5.getI18nText;
  var hasInputTrigger = isInputTriggerTag(Tag);
  return /*#__PURE__*/React.createElement(DropdownMenu.Trigger, _assignProps3({
    "tag": Tag,
    "placeholder": getI18nText('selectPlaceholder'),
    "aria-autocomplete": hasInputTrigger && 'list' || undefined,
    "role": hasInputTrigger && 'combobox' || undefined,
    "aria-activedescendant": hasInputTrigger && value && "igc-".concat(uid, "-option-").concat(value) || undefined
  }, _ref3), addonTextChildren(Children, Tag.Text || ButtonTrigger.Text, Tag.Addon || ButtonTrigger.Addon, true), name && /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    defaultValue: value,
    name: name,
    ref: $hiddenRef
  }));
}

function Checkbox(props) {
  var _useBox = useBox(props, props.forwardRef),
      _useBox2 = _slicedToArray(_useBox, 2),
      SOptionCheckbox = _useBox2[0],
      componentProps = _useBox2[1];

  var size = props.size,
      theme = props.theme,
      selected = props.selected;
  var styles = sstyled(props.styles);

  var _styles$cn = styles.cn('SOptionCheckbox', {
    size: size,
    'use:theme': resolveColor(theme),
    checked: selected
  }),
      className = _styles$cn.className,
      style = _styles$cn.style;

  return /*#__PURE__*/React.createElement(SOptionCheckbox, _extends({}, componentProps, {
    className: cn(className, componentProps.className) || undefined,
    style: _objectSpread(_objectSpread({}, style), componentProps.style),
    role: "checkbox",
    tabIndex: 0,
    "aria-checked": selected
  }));
}

var InputSearchWrapper = function InputSearchWrapper() {
  var _ref4 = arguments[0];
  return /*#__PURE__*/React.createElement(InputSearch, _assignProps4({}, _ref4));
};

var Select = createComponent(RootSelect, {
  Trigger: [Trigger, {
    Addon: ButtonTrigger.Addon,
    Text: ButtonTrigger.Text
  }],
  Popper: DropdownMenu.Popper,
  List: DropdownMenu.List,
  Menu: DropdownMenu.Menu,
  Option: [DropdownMenu.Item, {
    Addon: DropdownMenu.Item.Addon,
    Checkbox: Checkbox
  }],
  OptionTitle: DropdownMenu.ItemTitle,
  OptionHint: DropdownMenu.ItemHint,
  Divider: Divider,
  InputSearch: InputSearchWrapper,
  Input: InputSearchWrapper
}, {
  parent: DropdownMenu,
  context: selectContext
});
export default Select;
//# sourceMappingURL=Select.js.map