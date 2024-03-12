import React from 'react';
import DataTable from '@semcore/ui/data-table';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head wMin={1000}>
        <DataTable.Column name='keyword' children='Keyword' fixed='left' />
        <DataTable.Column name='tags' children='Tags' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body
        renderRows={({ rows, renderRow }) => {
          const rowRenderer = ({
            key,
            index,
            style,
            parent,
          }: { key: string; index: number; style: any; parent: any }) => (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
              {({ measure }: { measure: (event: any) => void }) => (
                <div key={key} style={style} onLoad={measure}>
                  {renderRow(rows[index], { dataIndex: index })}
                </div>
              )}
            </CellMeasurer>
          );

          return (
            <AutoSizer disableHeight>
              {({ width }: { width: number }) => (
                <List
                  height={600}
                  rowCount={rows.length}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  width={width}
                  overscanRowCount={3}
                />
              )}
            </AutoSizer>
          );
        }}
      >
        <DataTable.Cell name='tags' direction='column' />
      </DataTable.Body>
    </DataTable>
  );
};

const data = Array(100)
  .fill(0)
  .map((_, i) => ({
    keyword: `keyword ${i}`,
    tags: Array(Math.floor(Math.random() * 4))
      .fill(0)
      .map((_, i) => <div key={i}>tag {i + 1}</div>),
    cpc: Math.round(Math.random() * 10),
    vol: Math.round(Math.random() * 1000000),
  }));

export default Demo;
