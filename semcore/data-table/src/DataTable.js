import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import syncScroll from '@semcore/utils/lib/syncScroll';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import fire from '@semcore/utils/lib/fire';
import { flattenColumns } from './utils';
import Head from './Head';
import Body from './Body';

import style from './style/data-table.shadow.css';

const MAP_SORT_DIRECTION = {
  desc: 'asc',
  asc: 'desc',
};
const DEFAULT_SORT_DIRECTION = 'desc';

const ROW_GROUP = Symbol('ROW_GROUP');

const cssVarReg = /[:;]/g;

function createCssVarForWidth(name) {
  return `--${name.replace(cssVarReg, '_')}_width`;
}

class RootDefinitionTable extends Component {
  static displayName = 'DefinitionTable';

  static style = style;

  static defaultProps = {
    use: 'primary',
    sort: [],
    data: [],
  };

  columns = [];

  tableRef = React.createRef();

  constructor(props) {
    super(props);

    const createRef = syncScroll();
    // first create body ref for master scroll
    this.scrollBodyRef = createRef('body');
    this.scrollHeadRef = createRef('head');
  }

  handlerSortClick = (name, e) => {
    const column = this.columns.find((c) => c.name === name);
    return fire(
      this,
      'onSortChange',
      [
        column.name,
        column.active ? MAP_SORT_DIRECTION[column.sortDirection] : column.sortDirection,
      ],
      e,
    );
  };

  handlerResize = () => {
    this.forceUpdate();
  };

  scrollToUp = () => {
    this.tableRef?.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  setVarStyle(columns) {
    columns.forEach((column) => {
      this.tableRef.current?.style.setProperty(column.cssVar, `${column.width}px`);
    }, {});
  }

  childrenToColumns(children, options = { fixed: undefined }) {
    const { sort } = this.asProps;
    const columnsChildren = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type !== DefinitionTable.Column) return;

      let { children, name, fixed = options.fixed, resizable, sortable, ...props } = child.props;
      const isGroup = !name;
      let columns = null;

      if (isGroup) {
        columns = this.childrenToColumns(children, {
          fixed,
        });
        name = flattenColumns(columns)
          .map((c) => c.name)
          .join('/');
        if (!columns.length) return;
        children = React.Children.toArray(children).filter(
          (child) => !(React.isValidElement(child) && child.type === DefinitionTable.Column),
        );
      }

      const column = this.columns.find((c) => c.name === name);

      columnsChildren.push({
        get width() {
          return this.props.ref.current?.getBoundingClientRect().width || 0;
        },
        name,
        cssVar: createCssVarForWidth(name),
        fixed,
        resizable,
        active: sort[0] === name,
        sortable,
        sortDirection:
          sort[0] === name
            ? sort[1]
            : column?.sortDirection ||
              (typeof sortable == 'string' ? sortable : DEFAULT_SORT_DIRECTION),
        columns,
        props: {
          ref: column?.props?.ref || React.createRef(),
          children,
          ...props,
        },
      });
    });
    return columnsChildren;
  }

  getHeadProps(props) {
    const { use } = this.asProps;
    const columnsChildren = this.childrenToColumns(props.children);
    this.columns = flattenColumns(columnsChildren);
    return {
      $onSortClick: callAllEventHandlers(this.handlerSortClick, this.scrollToUp),
      columnsChildren,
      use,
      onResize: this.handlerResize,
      $scrollRef: this.scrollHeadRef,
    };
  }

  getBodyProps(props) {
    const { data, use } = this.asProps;
    const propsCells = {};
    const $propsRow = [];
    React.Children.forEach(props.children, (child) => {
      if (React.isValidElement(child)) {
        const { name, children, ...other } = child.props;
        if (child.type === DefinitionTable.Cell && name) {
          name.split('/').forEach((name) => {
            propsCells[name] = propsCells[name] || [];
            propsCells[name].push({
              ...other,
              getCellProps: children,
            });
          });
        }
        if (child.type === DefinitionTable.Row) {
          $propsRow.push({
            ...other,
            getRowProps: children,
          });
        }
      }
    });

    return {
      columns: this.columns,
      rows: this.dataToRows(data, propsCells),
      use,
      $propsRow,
      $scrollRef: this.scrollBodyRef,
    };
  }

  dataToRows(data, propsCells) {
    const columns = this.columns;

    function parseData(data, options = { exclude: [] }) {
      return data.map((row) => {
        const columnsGroups = Object.keys(row).reduce((acc, name) => {
          const names = name.split('/');
          if (names.length >= 2) {
            acc.push([names, row[name]]);
          }
          return acc;
        }, []);
        const nameColumnsGroup = columnsGroups
          .reduce((acc, [names]) => acc.concat(names), [])
          .filter((name, i, arr) => arr.indexOf(name) === i);
        const rowsGroup = row[ROW_GROUP] || [];
        const nameRowsGroup = rowsGroup
          .reduce((acc, row) => acc.concat(Object.keys(row)), [])
          .filter((name, i, arr) => arr.indexOf(name) === i);
        let isGroupRow = false;

        const cells = [];
        cells._row = row;
        return columns.reduce((acc, column) => {
          const columnGroup = columnsGroups.find((group) => group[0]?.includes(column.name));
          if (columnGroup) {
            const [names, data] = columnGroup;
            if (names[0] === column.name) {
              acc.push({
                name: names.join('/'),
                cssVar: names.map(createCssVarForWidth),
                fixed: column.fixed,
                data,
                rendersCell: propsCells[column.name] || [],
              });
            }
          } else if (column.name in row) {
            acc.push({
              name: column.name,
              cssVar: column.cssVar,
              fixed: column.fixed,
              data: row[column.name],
              rendersCell: propsCells[column.name] || [],
            });
          } else if (!isGroupRow && nameRowsGroup.includes(column.name)) {
            // TODO: сделать универсально
            isGroupRow = true;
            acc.push(
              parseData(rowsGroup, {
                exclude: [...Object.keys(row), ...nameColumnsGroup],
              }),
            );
          } else if (![...options.exclude, ...nameRowsGroup].includes(column.name)) {
            acc.push({
              name: column.name,
              cssVar: column.cssVar,
              fixed: column.fixed,
              data: null,
              rendersCell: propsCells[column.name] || [],
            });
          }
          return acc;
        }, cells);
      });
    }

    return parseData(data);
  }

  componentDidUpdate() {
    this.setVarStyle(this.columns);
  }

  render() {
    const SDataTable = Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
      <SDataTable render={Box} __excludeProps={['data']} ref={this.tableRef}>
        <Children />
      </SDataTable>,
    );
  }
}

function ComponentDefinition() {
  return null;
}

const DefinitionTable = createComponent(
  RootDefinitionTable,
  {
    Head,
    Body,
    Column: ComponentDefinition,
    Cell: ComponentDefinition,
    Row: ComponentDefinition,
  },
  {},
);

export { ROW_GROUP };
export default DefinitionTable;
