import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Custom rows rendering'} hMax={'500px'}
               totalRows={data.length}
               sort={['keyword', 'asc']}
               columns={[
                   {name: 'keyword', children: 'Keyword', sortable: true},
                   {name: 'tags', children: 'Tags'},
                   {name: 'cpc', children: 'CPC'},
                   {name: 'vol', children: 'Vol.'},
               ]}
               virtualScroll={true}
          renderCell={(props) => {
              if (props.dataKey === 'tags') {
                  const tags = props.row[props.dataKey];

                  if (Array.isArray(tags)) {
                      return (
                        <div>
                          {tags.map((_, i) => {
                            return <div key={i}>tag {i + 1}</div>;
                          })}
                        </div>
                      );
                  }

                  return null;
              }
              return props.defaultRender();
          }}
      />
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
