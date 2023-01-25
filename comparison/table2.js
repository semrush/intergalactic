import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { sstyled as _sstyled } from "@semcore/core";
var _excluded = ["use", "style", "className", "compact"];
import React, { useRef } from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies

import cn from 'classnames';
import { CellHead, CellRow } from './Cell';
import Row from './Row';
import Head from './Head';
import StickyHead from './StickyHead';
import Body from './Body';
import { Provider } from './context';
import { Box } from '@semcore/flex-box';
import { sstyled } from '@semcore/core';
import { useForkRef } from '@semcore/utils/lib/ref';

/*__reshadow-styles__:"./style/table.shadow.css"*/
var styles = (
/*__reshadow_css_start__*/
_sstyled.insert(
/*__inner_css_start__*/
".___STable_1kwbg_gg_{width:100%;border-collapse:collapse;border-spacing:0;box-sizing:border-box;border-style:hidden}thead .___SRow_1kwbg_gg_{border:none}thead .___SRow_1kwbg_gg_:last-child{border-bottom:1px solid var(--intergalactic-border-table-accent,#a9abb6)}.___SCell_1kwbg_gg_{background:inherit;box-sizing:border-box}.___SCell_1kwbg_gg_._align_center_1kwbg_gg_{text-align:center}.___SCell_1kwbg_gg_._align_left_1kwbg_gg_{text-align:left}.___SCell_1kwbg_gg_._align_right_1kwbg_gg_{text-align:right}.___SCell_1kwbg_gg_._valign_middle_1kwbg_gg_{vertical-align:middle}.___SCell_1kwbg_gg_._valign_top_1kwbg_gg_{vertical-align:top}.___SCell_1kwbg_gg_._valign_bottom_1kwbg_gg_{vertical-align:bottom}.___SCell_1kwbg_gg_._use_primary_1kwbg_gg_{padding:var(--intergalactic-spacing-3x,12px)}.___SCell_1kwbg_gg_._use_primary_1kwbg_gg_.__compact_1kwbg_gg_{padding:var(--intergalactic-spacing-3x,12px) var(--intergalactic-spacing-2x,8px)}.___SCell_1kwbg_gg_._use_secondary_1kwbg_gg_{padding:var(--intergalactic-spacing-2x,8px)}.___SCellHead_1kwbg_gg_{font-size:var(--intergalactic-fs-100,12px);font-weight:400;line-height:18px;color:var(--intergalactic-text-primary,#191b23);cursor:default;box-sizing:border-box;z-index:1}.___SCellHead_1kwbg_gg_.focus-visible{outline:none;box-shadow:inset var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SCellHead_1kwbg_gg_:focus-visible{outline:none;box-shadow:inset var(--intergalactic-keyboard-focus,0 0 0 3px rgba(0,143,248,.3))}.___SCellHeadContent_1kwbg_gg_{display:inline-flex;max-width:100%;min-width:0}.___SCellHead_1kwbg_gg_._use_primary_1kwbg_gg_{background-color:var(--intergalactic-table-th-primary-cell,#f4f5f9);border-color:var(--intergalactic-border-secondary,#e0e1e9)}.___SCellHead_1kwbg_gg_._use_secondary_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell,#fff);border-width:1px 0;border-color:var(--intergalactic-border-table-accent,#a9abb6)}.___SCellHead_1kwbg_gg_.__borderLeft_1kwbg_gg_{border-left:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SCellHead_1kwbg_gg_.__borderRight_1kwbg_gg_{border-right:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SCellHead_1kwbg_gg_.__sorting_1kwbg_gg_{cursor:pointer}@media (hover: hover){.___SCellHead_1kwbg_gg_.__sorting_1kwbg_gg_._use_primary_1kwbg_gg_:hover{background-color:var(--intergalactic-table-th-primary-cell-hover,#e0e1e9)}}@media (hover: hover){.___SCellHead_1kwbg_gg_.__sorting_1kwbg_gg_:hover .___SSortWrapper_1kwbg_gg_{display:block}}.___SCellHead_1kwbg_gg_._use_primary_1kwbg_gg_.__active_1kwbg_gg_{background-color:var(--intergalactic-table-th-primary-cell-active,#e0e1e9)}.___SCellHead_1kwbg_gg_.__active_1kwbg_gg_ .___SCellHeadIconAsc_1kwbg_gg_{position:relative}.___SCellHead_1kwbg_gg_.__active_1kwbg_gg_ .___SCellHeadIconDesc_1kwbg_gg_{position:relative}.___SColumn_1kwbg_gg_.__sortIconFloat_1kwbg_gg_ .___SSortWrapper_1kwbg_gg_{width:0;flex-basis:0}.___SCellHead_1kwbg_gg_.__active_1kwbg_gg_ .___SSortWrapper_1kwbg_gg_{display:block;width:16px;flex-basis:20px;margin-left:var(--intergalactic-spacing-1x,4px)}.___SSortWrapper_1kwbg_gg_{display:none;flex-shrink:99999;position:relative;flex-basis:20px;height:0}.___SSortWrapper_1kwbg_gg_:before{content:\"\";position:absolute;top:-2px;right:0;width:20px;height:16px}.___SCellHead_1kwbg_gg_._use_primary_1kwbg_gg_ .___SSortWrapper_1kwbg_gg_:before{background:linear-gradient(270deg,var(--intergalactic-table-th-primary-cell-hover,#e0e1e9) 67.5%,rgba(224,225,233,0) 105%)}.___SCellHead_1kwbg_gg_._use_secondary_1kwbg_gg_ .___SSortWrapper_1kwbg_gg_:before{background:linear-gradient(270deg,var(--intergalactic-table-th-secondary-cell,#fff) 67.5%,hsla(0,0%,100%,0) 105%)}.___SCellHeadIconAsc_1kwbg_gg_,.___SCellHeadIconDesc_1kwbg_gg_{fill:var(--intergalactic-icon-secondary-neutral-hover-active,#8a8e9b);position:absolute;top:0;right:0}.___SRow_1kwbg_gg_{transition:background-color .1s ease;border-bottom:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SRow_1kwbg_gg_:last-child .___SCellRow_1kwbg_gg_{box-shadow:none}.___SCellRow_1kwbg_gg_._theme_default_1kwbg_gg_,.___SRow_1kwbg_gg_._theme_default_1kwbg_gg_{background-color:var(--intergalactic-bg-primary-neutral,#fff)}.___SCellRow_1kwbg_gg_.__highlighted_1kwbg_gg_._theme_default_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}@media (hover: hover){.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_._theme_default_1kwbg_gg_:hover,.___SRow_1kwbg_gg_._theme_default_1kwbg_gg_:hover,.___SRow_1kwbg_gg_.__theme_1kwbg_gg_:hover .___SCellRow_1kwbg_gg_._theme_default_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-hover,#f0f0f4)}}.___SCellRow_1kwbg_gg_._theme_info_1kwbg_gg_,.___SRow_1kwbg_gg_._theme_info_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-selected,#e9f7ff)}.___SCellRow_1kwbg_gg_.__highlighted_1kwbg_gg_._theme_info_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-selected-hover,#c4e5fe)}@media (hover: hover){.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_._theme_info_1kwbg_gg_:hover,.___SRow_1kwbg_gg_._theme_info_1kwbg_gg_:hover,.___SRow_1kwbg_gg_.__theme_1kwbg_gg_:hover .___SCellRow_1kwbg_gg_._theme_info_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-selected-hover,#c4e5fe)}}.___SCellRow_1kwbg_gg_._theme_success_1kwbg_gg_,.___SRow_1kwbg_gg_._theme_success_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-new,#dbfee8)}.___SCellRow_1kwbg_gg_.__highlighted_1kwbg_gg_._theme_success_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-new-hover,#9ef2c9)}@media (hover: hover){.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_._theme_success_1kwbg_gg_:hover,.___SRow_1kwbg_gg_._theme_success_1kwbg_gg_:hover,.___SRow_1kwbg_gg_.__theme_1kwbg_gg_:hover .___SCellRow_1kwbg_gg_._theme_success_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-new-hover,#9ef2c9)}}.___SCellRow_1kwbg_gg_._theme_warning_1kwbg_gg_,.___SRow_1kwbg_gg_._theme_warning_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-warning,#fff3d9)}.___SCellRow_1kwbg_gg_.__highlighted_1kwbg_gg_._theme_warning_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-warning-hover,#ffdca2)}@media (hover: hover){.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_._theme_warning_1kwbg_gg_:hover,.___SRow_1kwbg_gg_._theme_warning_1kwbg_gg_:hover,.___SRow_1kwbg_gg_.__theme_1kwbg_gg_:hover .___SCellRow_1kwbg_gg_._theme_warning_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-warning-hover,#ffdca2)}}.___SCellRow_1kwbg_gg_._theme_danger_1kwbg_gg_,.___SRow_1kwbg_gg_._theme_danger_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-critical,#fff0f7)}.___SCellRow_1kwbg_gg_.__highlighted_1kwbg_gg_._theme_danger_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-critical-hover,#ffd7df)}@media (hover: hover){.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_._theme_danger_1kwbg_gg_:hover,.___SRow_1kwbg_gg_._theme_danger_1kwbg_gg_:hover,.___SRow_1kwbg_gg_.__theme_1kwbg_gg_:hover .___SCellRow_1kwbg_gg_._theme_danger_1kwbg_gg_{background-color:var(--intergalactic-table-td-cell-critical-hover,#ffd7df)}}.___SCellRow_1kwbg_gg_.__interactive_1kwbg_gg_,.___SRow_1kwbg_gg_.__interactive_1kwbg_gg_{cursor:pointer}.___SCellRow_1kwbg_gg_.__borderRight_1kwbg_gg_{border-right:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SCellRow_1kwbg_gg_.__borderLeft_1kwbg_gg_{border-left:1px solid var(--intergalactic-border-secondary,#e0e1e9)}.___SCellRow_1kwbg_gg_{font-size:var(--intergalactic-fs-200,14px);line-height:var(--intergalactic-lh-200,142%);color:var(--intergalactic-text-primary,#191b23)}.___SStickyHead_1kwbg_gg_{position:absolute;height:auto;width:auto}.___SStickyHeadTable_1kwbg_gg_{table-layout:fixed;border-bottom:none}.___SStickyHead_1kwbg_gg_._position_fixed_1kwbg_gg_{position:fixed;z-index:1}.___SStickyHead_1kwbg_gg_._position_top_1kwbg_gg_{top:0}.___Table-parent_1kwbg_gg_{table-layout:fixed}.___Header-hidden_1kwbg_gg_{visibility:hidden;z-index:-1}@media (prefers-reduced-motion){.___SRow_1kwbg_gg_{transition:none}}"
/*__inner_css_end__*/
, "1kwbg_gg_")
/*__reshadow_css_end__*/
, {
  "__STable": "___STable_1kwbg_gg_",
  "__SRow": "___SRow_1kwbg_gg_",
  "__SCell": "___SCell_1kwbg_gg_",
  "_align_center": "_align_center_1kwbg_gg_",
  "_align_left": "_align_left_1kwbg_gg_",
  "_align_right": "_align_right_1kwbg_gg_",
  "_valign_middle": "_valign_middle_1kwbg_gg_",
  "_valign_top": "_valign_top_1kwbg_gg_",
  "_valign_bottom": "_valign_bottom_1kwbg_gg_",
  "_use_primary": "_use_primary_1kwbg_gg_",
  "_compact": "__compact_1kwbg_gg_",
  "_use_secondary": "_use_secondary_1kwbg_gg_",
  "__SCellHead": "___SCellHead_1kwbg_gg_",
  "__SCellHeadContent": "___SCellHeadContent_1kwbg_gg_",
  "_borderLeft": "__borderLeft_1kwbg_gg_",
  "_borderRight": "__borderRight_1kwbg_gg_",
  "_sorting": "__sorting_1kwbg_gg_",
  "__SSortWrapper": "___SSortWrapper_1kwbg_gg_",
  "_active": "__active_1kwbg_gg_",
  "__SCellHeadIconAsc": "___SCellHeadIconAsc_1kwbg_gg_",
  "__SCellHeadIconDesc": "___SCellHeadIconDesc_1kwbg_gg_",
  "__SColumn": "___SColumn_1kwbg_gg_",
  "_sortIconFloat": "__sortIconFloat_1kwbg_gg_",
  "__SCellRow": "___SCellRow_1kwbg_gg_",
  "_theme_default": "_theme_default_1kwbg_gg_",
  "_highlighted": "__highlighted_1kwbg_gg_",
  "_interactive": "__interactive_1kwbg_gg_",
  "_theme": "__theme_1kwbg_gg_",
  "_theme_info": "_theme_info_1kwbg_gg_",
  "_theme_success": "_theme_success_1kwbg_gg_",
  "_theme_warning": "_theme_warning_1kwbg_gg_",
  "_theme_danger": "_theme_danger_1kwbg_gg_",
  "__SStickyHead": "___SStickyHead_1kwbg_gg_",
  "__SStickyHeadTable": "___SStickyHeadTable_1kwbg_gg_",
  "_position_fixed": "_position_fixed_1kwbg_gg_",
  "_position_top": "_position_top_1kwbg_gg_",
  "__Table-parent": "___Table-parent_1kwbg_gg_",
  "__Header-hidden": "___Header-hidden_1kwbg_gg_"
});
var Table = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var STable = Box;
  var refTable = useRef(null);

  var _props$use = props.use,
      use = _props$use === void 0 ? 'primary' : _props$use,
      _props$style = props.style,
      styleProps = _props$style === void 0 ? {} : _props$style,
      classNameProps = props.className,
      compact = props.compact,
      other = _objectWithoutProperties(props, _excluded);

  var sstyles = sstyled(sstyled.merge(styles, other.styles));

  var _sstyles$cn = sstyles.cn('STable', styleProps),
      className = _sstyles$cn.className,
      style = _sstyles$cn.style;

  return /*#__PURE__*/React.createElement(Provider, {
    value: {
      use: use,
      styles: styles,
      self: {
        ref: refTable,
        props: props
      },
      compact: compact
    }
  }, /*#__PURE__*/React.createElement(STable, _extends({
    ref: useForkRef(refTable, ref),
    tag: "table",
    "data-ui-name": "Table",
    style: Object.assign({}, style, styleProps),
    className: cn(className, classNameProps) || undefined
  }, other)));
});
Table.displayName = 'Table';
Table.Head = Head;
Table.StickyHead = StickyHead;
Table.Body = Body;
Table.Row = Row;
Table.Cell = CellRow;
Table.CellHead = CellHead;
export default Table;
//# sourceMappingURL=Table.js.map