import { DataTable, SelectableRows } from '@semcore/ui/data-table';
import React from 'react';

export type DemoProps = {
  reactive?: boolean;
};

const selectableRows = new SelectableRows<string>();

const columns = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD %' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const Demo = ({ reactive = false }: DemoProps) => {
  if (reactive) {
    return (
      <DataTable
        data={[]}
        aria-label='Table example with selectable rows'
        defaultGridTemplateColumnWidth='auto'
        selectedRows={selectableRows}
        columns={columns}
        uniqueRowKey='id'
      />
    );
  }

  return (
    <DataTable
      data={[]}
      aria-label='Table example with selectable rows'
      defaultGridTemplateColumnWidth='auto'
      selectedRows={[]}
      columns={columns}
      uniqueRowKey='id'
    />
  );
};

export const defaultProps: DemoProps = {
  reactive: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
