import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { sstyled as _sstyled } from "@semcore/core";
import { assignProps as _assignProps } from "@semcore/core";
var _excluded = ["children", "name", "fixed", "resizable", "sortable", "flex", "vBorders", "active"],
    _excluded2 = ["name", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (_e) { function e(_x) { return _e.apply(this, arguments); } e.toString = function () { return _e.toString(); }; return e; }(function (e) { throw e; }), f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function (_e2) { function e(_x2) { return _e2.apply(this, arguments); } e.toString = function () { return _e2.toString(); }; return e; }(function (e) { didErr = true; err = e; }), f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import syncScroll from '@semcore/utils/lib/syncScroll';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import { flattenColumns } from './utils';
import Head from './Head';
import Body from './Body';

/*__reshadow-styles__:"./style/data-table.shadow.css"*/
var style = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___SDataTable_67d71_gg_{position:relative}.___SDataTable_67d71_gg_.__compact_67d71_gg_ .___SCell_67d71_gg_,.___SDataTable_67d71_gg_.__compact_67d71_gg_ .___SColumn_67d71_gg_{padding:var(--intergalactic-spacing-3x,12px) var(--intergalactic-spacing-2x,8px)}.___SHeadWrapper_67d71_gg_{position:relative}.___SHeadWrapper_67d71_gg_.__sticky_67d71_gg_{position:sticky;top:0;z-index:2}.___SHead_67d71_gg_{display:flex;position:relative;flex-direction:row;min-width:-moz-fit-content;min-width:fit-content;z-index:0}.___SColumn_67d71_gg_{display:flex;align-items:flex-start;flex-grow:1;font-size:var(--intergalactic-fs-100,12px);color:var(--intergalactic-text-primary,#191b23);box-sizing:border-box;position:relative}.___SColumn_67d71_gg_.focus-visible{outline:none;box-shadow:inset var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SColumn_67d71_gg_:focus-visible{outline:none;box-shadow:inset var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SColumn_67d71_gg_.__hidden_67d71_gg_{height:0!important;padding:0!important;overflow:hidden!important;border:none!important}.___SColumn_67d71_gg_._use_primary_67d71_gg_{padding:var(--intergalactic-spacing-3x,12px);border-bottom:1px solid var(--intergalactic-border-secondary,#e0e1e9);background-color:var(--intergalactic-table-th-primary-cell,#f4f5f9)}.___SColumn_67d71_gg_._use_secondary_67d71_gg_{padding:var(--intergalactic-spacing-2x,8px);border-bottom:1px solid var(--intergalactic-border-table-accent,#a9abb6);background-color:var(--intergalactic-table-th-secondary-cell,#fff)}.___SColumn_67d71_gg_.__group_67d71_gg_.__use_67d71_gg_{display:flex;flex-wrap:wrap;flex-direction:column;align-items:normal;border-bottom:none;padding:0}.___SColumn_67d71_gg_.__groupHead_67d71_gg_{justify-content:center;z-index:1;border-bottom:none}.___SColumn_67d71_gg_.__sortable_67d71_gg_{cursor:pointer}@media (hover: hover){.___SColumn_67d71_gg_.__sortable_67d71_gg_._use_primary_67d71_gg_:hover{background-color:var(--intergalactic-table-th-primary-cell-hover,#e0e1e9)}}@media (hover: hover){.___SColumn_67d71_gg_.__sortable_67d71_gg_:hover .___SSortWrapper_67d71_gg_{display:block}}.___SColumn_67d71_gg_._use_primary_67d71_gg_.__active_67d71_gg_{background-color:var(--intergalactic-table-th-primary-cell-active,#e0e1e9);width:100%}.___SColumn_67d71_gg_.__active_67d71_gg_ .___SSortIcon_67d71_gg_{position:relative}.___SColumn_67d71_gg_.__sortIconFloat_67d71_gg_ .___SSortWrapper_67d71_gg_{width:0;flex-basis:0}.___SColumn_67d71_gg_.__active_67d71_gg_ .___SSortWrapper_67d71_gg_{display:block;width:16px;flex-basis:20px;margin-left:var(--intergalactic-spacing-1x,4px)}.___SColumn_67d71_gg_.__resizable_67d71_gg_{border-right:1px solid transparent}@media (hover: hover){.___SColumn_67d71_gg_.__resizable_67d71_gg_:hover:after{border-right-color:var(--intergalactic-border-table-accent,#a9abb6)}}.___SColumn_67d71_gg_.__resizable_67d71_gg_:after{content:\"\";position:absolute;bottom:0;right:-1px;height:100%;width:5px;background:transparent;cursor:col-resize;border-right:1px solid transparent}.___SColumn_67d71_gg_.__fixed_67d71_gg_{position:sticky;z-index:2}.___SCell_67d71_gg_.__borderLeft_67d71_gg_,.___SColumn_67d71_gg_.__borderLeft_67d71_gg_{border-left:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SCell_67d71_gg_.__borderRight_67d71_gg_,.___SColumn_67d71_gg_.__borderRight_67d71_gg_{border-right:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SSortIcon_67d71_gg_{fill:var(--intergalactic-icon-secondary-neutral-hover-active,#8a8e9b);position:absolute;top:-2px;right:0}.___SSortWrapper_67d71_gg_{display:none;flex-shrink:99999;position:relative;flex-basis:20px;height:0}.___SSortWrapper_67d71_gg_:before{content:\"\";position:absolute;top:-2px;right:0;width:20px;height:16px}.___SColumn_67d71_gg_._use_primary_67d71_gg_ .___SSortWrapper_67d71_gg_:before{background:linear-gradient(270deg,var(--intergalactic-table-th-primary-cell-hover,#e0e1e9) 67.5%,rgba(224,225,233,0) 105%)}.___SColumn_67d71_gg_._use_secondary_67d71_gg_ .___SSortWrapper_67d71_gg_:before{background:linear-gradient(270deg,var(--intergalactic-table-th-secondary-cell,#fff) 67.5%,hsla(0,0%,100%,0) 105%)}.___SBodyWrapper_67d71_gg_{position:relative}.___SBody_67d71_gg_{display:flex;flex-direction:column;position:relative;min-width:-moz-fit-content;min-width:fit-content}.___SRow_67d71_gg_{display:flex;flex-direction:row;position:relative}.___SRow_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}}.___SRow_67d71_gg_._theme_muted_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-unread,#f4f5f9)}.___SRow_67d71_gg_._theme_muted_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_._theme_muted_67d71_gg_,.___SRow_67d71_gg_._theme_muted_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_._theme_muted_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}}.___SRow_67d71_gg_._theme_info_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-selected,#e9f7ff)}.___SRow_67d71_gg_._theme_info_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-selected-hover,#c4e5fe)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_._theme_info_67d71_gg_,.___SRow_67d71_gg_._theme_info_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_._theme_info_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-selected-hover,#c4e5fe)}}.___SRow_67d71_gg_._theme_success_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-new,#dbfee8)}.___SRow_67d71_gg_._theme_success_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-new-hover,#9ef2c9)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_._theme_success_67d71_gg_,.___SRow_67d71_gg_._theme_success_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_._theme_success_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-new-hover,#9ef2c9)}}.___SRow_67d71_gg_._theme_warning_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-warning,#fff3d9)}.___SRow_67d71_gg_._theme_warning_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-warning-hover,#ffdca2)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_._theme_warning_67d71_gg_,.___SRow_67d71_gg_._theme_warning_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_._theme_warning_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-warning-hover,#ffdca2)}}.___SRow_67d71_gg_._theme_danger_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-critical,#fff0f7)}.___SRow_67d71_gg_._theme_danger_67d71_gg_.__active_67d71_gg_>.___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-critical-hover,#ffd7df)}@media (hover: hover){.___SRow_67d71_gg_:hover>.___SCell_67d71_gg_._theme_danger_67d71_gg_,.___SRow_67d71_gg_._theme_danger_67d71_gg_:hover>.___SCell_67d71_gg_:not(.__theme_67d71_gg_),.___SRow_67d71_gg_._theme_danger_67d71_gg_ .___SCell_67d71_gg_:hover+.___SGroupCell_67d71_gg_ .___SCell_67d71_gg_:not(.__theme_67d71_gg_){background-color:var(--intergalactic-table-td-cell-critical-hover,#ffd7df)}}.___SRow_67d71_gg_.__positioned_67d71_gg_{position:absolute}.___SCell_67d71_gg_{display:flex;flex:1;flex-basis:auto;font-size:var(--intergalactic-fs-200,14px);line-height:var(--intergalactic-lh-200,142%);color:var(--intergalactic-text-primary,#191b23);box-sizing:border-box;border-bottom:1px solid var(--intergalactic-border-secondary,#e0e1e9);overflow:hidden;white-space:nowrap}.___SCell_67d71_gg_._use_primary_67d71_gg_{padding:var(--intergalactic-spacing-3x,12px);min-height:45px;background-color:var(--intergalactic-bg-primary-neutral,#fff)}.___SCell_67d71_gg_._use_secondary_67d71_gg_{padding:var(--intergalactic-spacing-2x,8px);min-height:37px;background-color:var(--intergalactic-bg-primary-neutral,#fff)}.___SCell_67d71_gg_.__fixed_67d71_gg_{position:sticky;z-index:1}.___SCell_67d71_gg_._theme_muted_67d71_gg_{background-color:var(--intergalactic-table-td-cell-unread,#f4f5f9)}.___SCell_67d71_gg_._theme_info_67d71_gg_{background-color:var(--intergalactic-table-td-cell-selected,#e9f7ff)}.___SCell_67d71_gg_._theme_success_67d71_gg_{background-color:var(--intergalactic-table-td-cell-new,#dbfee8)}.___SCell_67d71_gg_._theme_warning_67d71_gg_{background-color:var(--intergalactic-table-td-cell-warning,#fff3d9)}.___SCell_67d71_gg_._theme_danger_67d71_gg_{background-color:var(--intergalactic-table-td-cell-critical,#fff0f7)}.___SScrollAreaBar_67d71_gg_._orientation_horizontal_67d71_gg_{position:sticky;bottom:0;left:0;margin-top:calc(var(--intergalactic-spacing-3x, 12px)*-1);z-index:2;margin-left:calc(var(--left) + var(--intergalactic-spacing-1x, 4px));margin-right:calc(var(--right) + var(--intergalactic-spacing-1x, 4px));width:calc(100% - var(--offsetSum_67d71) - 8px)}.___SScrollAreaBar_67d71_gg_._orientation_vertical_67d71_gg_{width:12px}.___SHeightHold_67d71_gg_{position:absolute;top:0;width:100%;pointer-events:none;z-index:-1}"
/*__inner_css_end__*/
, "67d71_gg_")
/*__reshadow_css_end__*/
, {
  "__SDataTable": "___SDataTable_67d71_gg_",
  "_compact": "__compact_67d71_gg_",
  "__SCell": "___SCell_67d71_gg_",
  "__SColumn": "___SColumn_67d71_gg_",
  "__SHeadWrapper": "___SHeadWrapper_67d71_gg_",
  "_sticky": "__sticky_67d71_gg_",
  "__SHead": "___SHead_67d71_gg_",
  "_hidden": "__hidden_67d71_gg_",
  "_use_primary": "_use_primary_67d71_gg_",
  "_use_secondary": "_use_secondary_67d71_gg_",
  "_group": "__group_67d71_gg_",
  "_use": "__use_67d71_gg_",
  "_groupHead": "__groupHead_67d71_gg_",
  "_sortable": "__sortable_67d71_gg_",
  "__SSortWrapper": "___SSortWrapper_67d71_gg_",
  "_active": "__active_67d71_gg_",
  "__SSortIcon": "___SSortIcon_67d71_gg_",
  "_sortIconFloat": "__sortIconFloat_67d71_gg_",
  "_resizable": "__resizable_67d71_gg_",
  "_fixed": "__fixed_67d71_gg_",
  "_borderLeft": "__borderLeft_67d71_gg_",
  "_borderRight": "__borderRight_67d71_gg_",
  "__SBodyWrapper": "___SBodyWrapper_67d71_gg_",
  "__SBody": "___SBody_67d71_gg_",
  "__SRow": "___SRow_67d71_gg_",
  "_theme": "__theme_67d71_gg_",
  "__SGroupCell": "___SGroupCell_67d71_gg_",
  "_theme_muted": "_theme_muted_67d71_gg_",
  "_theme_info": "_theme_info_67d71_gg_",
  "_theme_success": "_theme_success_67d71_gg_",
  "_theme_warning": "_theme_warning_67d71_gg_",
  "_theme_danger": "_theme_danger_67d71_gg_",
  "_positioned": "__positioned_67d71_gg_",
  "__SScrollAreaBar": "___SScrollAreaBar_67d71_gg_",
  "_orientation_horizontal": "_orientation_horizontal_67d71_gg_",
  "_orientation_vertical": "_orientation_vertical_67d71_gg_",
  "__SHeightHold": "___SHeightHold_67d71_gg_",
  "--offsetSum": "--offsetSum_67d71"
});
var REVERSED_SORT_DIRECTION = {
  desc: 'asc',
  asc: 'desc'
};
var DEFAULT_SORT_DIRECTION = 'desc';
var ROW_GROUP = Symbol('ROW_GROUP');
var cssVarReg = /[:;]/g;

var createCssVarForWidth = function createCssVarForWidth(name) {
  return "--".concat(name.replace(cssVarReg, '_'), "_width");
};

function setBorderGroupColumns(columns, side) {
  var firstColumn = columns[0];
  var lastColumn = columns[columns.length - 1];

  if (firstColumn && (!side || side === 'left')) {
    firstColumn.borderLeft = true;

    if (firstColumn.columns) {
      setBorderGroupColumns(firstColumn.columns, 'left');
    }
  }

  if (lastColumn && (!side || side === 'right')) {
    lastColumn.borderRight = true;

    if (lastColumn.columns) {
      setBorderGroupColumns(lastColumn.columns, 'right');
    }
  }
}

var RootDefinitionTable = /*#__PURE__*/function (_Component) {
  _inherits(RootDefinitionTable, _Component);

  var _super = _createSuper(RootDefinitionTable);

  function RootDefinitionTable(props) {
    var _this;

    _classCallCheck(this, RootDefinitionTable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "columns", []);

    _defineProperty(_assertThisInitialized(_this), "tableRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "scrollBodyRef", null);

    _defineProperty(_assertThisInitialized(_this), "scrollHeadRef", null);

    _defineProperty(_assertThisInitialized(_this), "handlerSortClick", function (name, event) {
      var column = _this.columns.find(function (column) {
        return column.name === name;
      });

      return fire(_assertThisInitialized(_this), 'onSortChange', [column.name, column.active ? REVERSED_SORT_DIRECTION[column.sortDirection] : column.sortDirection], event);
    });

    _defineProperty(_assertThisInitialized(_this), "handlerResize", function () {
      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToUp", function () {
      var _this$tableRef, _this$tableRef$curren;

      (_this$tableRef = _this.tableRef) === null || _this$tableRef === void 0 ? void 0 : (_this$tableRef$curren = _this$tableRef.current) === null || _this$tableRef$curren === void 0 ? void 0 : _this$tableRef$curren.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'smooth'
      });
    });

    var createRef = syncScroll(); // first create body ref for master scroll

    _this.scrollBodyRef = createRef('body');
    _this.scrollHeadRef = createRef('head');
    return _this;
  }

  _createClass(RootDefinitionTable, [{
    key: "setVarStyle",
    value: function setVarStyle(columns) {
      var _iterator = _createForOfIteratorHelper(columns),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _column = _step.value;

          if (_column.setVar) {
            var _this$tableRef$curren2;

            (_this$tableRef$curren2 = this.tableRef.current) === null || _this$tableRef$curren2 === void 0 ? void 0 : _this$tableRef$curren2.style.setProperty(_column.varWidth, "".concat(_column.width, "px"));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "childrenToColumns",
    value: function childrenToColumns(children) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        fixed: undefined
      };
      var sort = this.asProps.sort;
      var columnsChildren = [];
      React.Children.forEach(children, function (child) {
        var _column$props;

        if (! /*#__PURE__*/React.isValidElement(child)) return;
        if (child.type !== DefinitionTable.Column) return;

        var _ref3 = child.props,
            children = _ref3.children,
            name = _ref3.name,
            _ref3$fixed = _ref3.fixed,
            fixed = _ref3$fixed === void 0 ? options.fixed : _ref3$fixed,
            resizable = _ref3.resizable,
            sortable = _ref3.sortable,
            flex = _ref3.flex,
            vBorders = _ref3.vBorders,
            active = _ref3.active,
            props = _objectWithoutProperties(_ref3, _excluded);

        var lastColumnChildren = columnsChildren[columnsChildren.length - 1];
        var isGroup = !name;
        var columns;

        if (isGroup) {
          columns = _this2.childrenToColumns(children, {
            fixed: fixed
          });
          active = typeof active === 'boolean' ? active : columns.some(function (c) {
            return c.active;
          });

          if (vBorders) {
            setBorderGroupColumns(columns);
          }

          name = flattenColumns(columns).map(function (_ref4) {
            var name = _ref4.name;
            return name;
          }).join('/');
          if (!columns.length) return;
          children = React.Children.toArray(children).filter(function (child) {
            return !( /*#__PURE__*/React.isValidElement(child) && child.type === DefinitionTable.Column);
          });
        }

        var column = _this2.columns.find(function (column) {
          return column.name === name;
        });

        var columnChildren = {
          get width() {
            var _this$props$ref$curre;

            // @ts-ignore
            return ((_this$props$ref$curre = this.props.ref.current) === null || _this$props$ref$curre === void 0 ? void 0 : _this$props$ref$curre.getBoundingClientRect().width) || 0;
          },

          name: name,
          varWidth: createCssVarForWidth(name),
          setVar: flex !== 'inherit',
          fixed: fixed,
          resizable: resizable,
          active: typeof active === 'boolean' ? active : sort[0] === name,
          sortable: sortable,
          borderLeft: (lastColumnChildren === null || lastColumnChildren === void 0 ? void 0 : lastColumnChildren.borderRight) === true ? false : vBorders,
          borderRight: vBorders,
          sortDirection: sort[0] === name ? sort[1] : (column === null || column === void 0 ? void 0 : column.sortDirection) || (typeof sortable == 'string' ? sortable : DEFAULT_SORT_DIRECTION),
          props: _objectSpread(_objectSpread({
            name: name,
            flex: flex === 'inherit' ? undefined : flex
          }, props), {}, {
            // @ts-ignore
            forwardRef: child.ref,
            children: children,
            ref: (column === null || column === void 0 ? void 0 : (_column$props = column.props) === null || _column$props === void 0 ? void 0 : _column$props.ref) || /*#__PURE__*/React.createRef()
          })
        };

        if (columns) {
          columnChildren.columns = columns;
        }

        columnsChildren.push(columnChildren);
      });
      return columnsChildren;
    }
  }, {
    key: "getHeadProps",
    value: function getHeadProps(props) {
      var use = this.asProps.use;
      var columnsChildren = this.childrenToColumns(props.children);
      this.columns = flattenColumns(columnsChildren);
      return {
        $onSortClick: callAllEventHandlers(this.handlerSortClick, this.scrollToUp),
        columnsChildren: columnsChildren,
        use: use,
        onResize: this.handlerResize,
        $scrollRef: this.scrollHeadRef
      };
    }
  }, {
    key: "getBodyProps",
    value: function getBodyProps(props) {
      var _this$asProps = this.asProps,
          data = _this$asProps.data,
          use = _this$asProps.use,
          uniqueKey = _this$asProps.uniqueKey;
      var cellPropsLayers = {};
      var rowPropsLayers = [];
      React.Children.forEach(props.children, function (child) {
        if ( /*#__PURE__*/React.isValidElement(child)) {
          var _ref5 = child.props,
              name = _ref5.name,
              children = _ref5.children,
              other = _objectWithoutProperties(_ref5, _excluded2);

          if (child.type === DefinitionTable.Cell && name) {
            name.split('/').forEach(function (name) {
              cellPropsLayers[name] = cellPropsLayers[name] || [];
              cellPropsLayers[name].push(_objectSpread(_objectSpread({}, other), {}, {
                childrenPropsGetter: children
              }));
            });
          }

          if (child.type === DefinitionTable.Row) {
            rowPropsLayers.push(_objectSpread(_objectSpread({}, other), {}, {
              childrenPropsGetter: children
            }));
          }
        }
      });
      return {
        columns: this.columns,
        rows: this.dataToRows(data, cellPropsLayers),
        uniqueKey: uniqueKey,
        use: use,
        rowPropsLayers: rowPropsLayers,
        $scrollRef: this.scrollBodyRef
      };
    }
  }, {
    key: "dataToRows",
    value: function dataToRows(data, cellPropsLayers) {
      var _this3 = this;

      var parseData = function parseData(data, exclude) {
        return data.map(function (row) {
          var groupByName = {};
          var groupedColumns = {};
          var ungroupedColumns = {};

          for (var rowKey in row) {
            var columnNames = rowKey.split('/');

            if (columnNames.length >= 2) {
              var _iterator2 = _createForOfIteratorHelper(columnNames),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _column2 = _step2.value;
                  groupByName[_column2] = {
                    groupedColumns: columnNames,
                    groupData: row[rowKey]
                  };
                  groupedColumns[rowKey] = true;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            } else {
              ungroupedColumns[rowKey] = true;
            }
          }

          var rowsGroup = row[ROW_GROUP] || [];
          var rowsGroupedNames = Object.fromEntries(rowsGroup.map(function (subRow) {
            return Object.keys(subRow);
          }).flat().map(function (key) {
            return [key, true];
          }));
          var isGroup = false;

          var cells = _this3.columns.map(function (column) {
            if (groupByName[column.name]) {
              var _groupByName$column$n = groupByName[column.name],
                  _groupedColumns = _groupByName$column$n.groupedColumns,
                  groupData = _groupByName$column$n.groupData;

              if (_groupedColumns[0] === column.name) {
                return {
                  name: _groupedColumns.join('/'),
                  cssVar: _groupedColumns.map(createCssVarForWidth),
                  fixed: column.fixed,
                  data: groupData,
                  cellPropsLayers: cellPropsLayers[column.name] || []
                };
              }
            } else if (column.name in row) {
              return {
                name: column.name,
                cssVar: column.varWidth,
                fixed: column.fixed,
                data: row[column.name],
                cellPropsLayers: cellPropsLayers[column.name] || []
              };
            } else if (!isGroup && rowsGroupedNames[column.name]) {
              // TODO: make it work not only with first group
              isGroup = true;
              return parseData(rowsGroup, _objectSpread(_objectSpread({}, ungroupedColumns), groupedColumns));
            } else if (!exclude[column.name] && !rowsGroupedNames[column.name]) {
              return {
                name: column.name,
                cssVar: column.varWidth,
                fixed: column.fixed,
                data: null,
                cellPropsLayers: cellPropsLayers[column.name] || []
              };
            }
          }).filter(function (column) {
            return column !== undefined;
          }).map(function (column) {
            return column;
          });

          cells.flatRowData = row;
          return cells;
        });
      };

      return parseData(data, {});
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setVarStyle(this.columns);
    }
  }, {
    key: "render",
    value: function render() {
      var _ref = this.asProps,
          _ref2;

      var SDataTable = Box;
      var _this$asProps2 = this.asProps,
          Children = _this$asProps2.Children,
          styles = _this$asProps2.styles,
          data = _this$asProps2.data;
      return _ref2 = sstyled(styles), /*#__PURE__*/React.createElement(SDataTable, _ref2.cn("SDataTable", _objectSpread({}, _assignProps({
        "__excludeProps": ['data'],
        "ref": this.tableRef,
        "role": "table",
        "aria-rowcount": (data !== null && data !== void 0 ? data : []).length
      }, _ref))), /*#__PURE__*/React.createElement(Children, _ref2.cn("Children", {})));
    }
  }]);

  return RootDefinitionTable;
}(Component);

_defineProperty(RootDefinitionTable, "displayName", 'DefinitionTable');

_defineProperty(RootDefinitionTable, "style", style);

_defineProperty(RootDefinitionTable, "defaultProps", {
  use: 'primary',
  uniqueKey: 'id',
  sort: [],
  data: []
});

function ComponentDefinition() {
  return null;
}

var DefinitionTable = createComponent(RootDefinitionTable, {
  Head: Head,
  Body: Body,
  Column: ComponentDefinition,
  Cell: ComponentDefinition,
  Row: ComponentDefinition
}, {});
export { ROW_GROUP };
export default DefinitionTable;
//# sourceMappingURL=DataTable.js.map