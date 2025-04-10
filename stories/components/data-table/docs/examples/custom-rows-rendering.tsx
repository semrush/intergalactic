import React from 'react';
import { DataTable } from '@semcore/data-table';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Custom rows rendering'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' />
        <DataTable.Head.Column name='tags' children='Tags' />
        <DataTable.Head.Column name='cpc' children='CPC' />
        <DataTable.Head.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body
          renderCell={(props) => {
              if (props.dataKey === 'tags') {
                  const tags = props.row[props.dataKey];

                  if (Array.isArray(tags)) {
                      return tags.map((_, i) => {
                          return <div key={i}>tag {i + 1}</div>;
                      });
                  }

                  return null;
              }
              return props.defaultRender();
          }}
        // TODO Brauer Ilia add virtual logic
        // renderRows={({ rows, renderRow }) => {
        //   const rowRenderer = ({
        //     key,
        //     index,
        //     style,
        //     parent,
        //   }: { key: string; index: number; style: any; parent: any }) => (
        //     <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
        //       {({ measure }: { measure: (event: any) => void }) => (
        //         <div key={key} style={style} onLoad={measure}>
        //           {renderRow(rows[index], { dataIndex: index })}
        //         </div>
        //       )}
        //     </CellMeasurer>
        //   );
        //
        //   return (
        //     <AutoSizer disableHeight>
        //       {({ width }: { width: number }) => (
        //         <List
        //           height={600}
        //           rowCount={rows.length}
        //           deferredMeasurementCache={cache}
        //           rowHeight={cache.rowHeight}
        //           rowRenderer={rowRenderer}
        //           width={width}
        //           overscanRowCount={3}
        //         />
        //       )}
        //     </AutoSizer>
        //   );
        // }}
      />
    </DataTable>
  );
};

const data = Array(100)
  .fill(0)
  .map((_, i) => ({
    keyword: `keyword ${i}`,
    tags: Array(Math.floor(Math.random() * 4))
      .fill(0),
      // .map((_, i) => <div key={i}>tag {i + 1}</div>),
    cpc: Math.round(Math.random() * 10),
    vol: Math.round(Math.random() * 1000000),
  }));

export default Demo;
