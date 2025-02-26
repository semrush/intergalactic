import React from 'react';
import styles from './design-tokens.module.css';
import DataTable from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';
import Copy from '@components/Copy';
import { ColorPreview } from './DesignTokens';
import Fuse from 'fuse.js';
import { SearchInput } from './SearchInput.jsx';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { logEvent } from '../../docs/.vitepress/theme/amplitude/amplitude';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

let filteredTokensTimer = 0;

const BaseTokens = ({ tokens }) => {
  const [filter, setFilter] = React.useState('');
  const [filteredTokensToTable, setFilteredTokensToTable] = React.useState(tokens);
  const tokensIndex = React.useMemo(
    () => new Fuse(tokens, { isCaseSensitive: false, keys: ['name', 'value', 'description'] }),
    [tokens],
  );
  const filteredTokens = React.useMemo(
    () => (filter ? tokensIndex.search(filter).map(({ item }) => item) : tokens),
    [tokens, tokensIndex, filter],
  );

  React.useEffect(() => {
    clearTimeout(filteredTokensTimer);

    filteredTokensTimer = setTimeout(() => {
      cache.clearAll();
      setFilteredTokensToTable(filteredTokens);
      logEvent('design-tokens:searchBaseTokens', { value: filter });
    }, 300);

    return () => {
      clearTimeout(filteredTokensTimer);
    };
  }, [filteredTokens]);

  return (
    <>
      <div className={styles.filters}>
        <SearchInput
          filter={filter}
          setFilter={setFilter}
          resultsCount={filteredTokens.length}
          placeholder='Enter color name to find token'
          ariaLabel={'Search base tokens'}
          statusAddonId={'search-message-base'}
        />
      </div>
      <BaseTokensTable filteredTokens={filteredTokensToTable} />
    </>
  );
};

const BaseTokensTable = React.memo(({ filteredTokens }) => {
  const nameHeaderRef = React.useRef(null);
  const valueHeaderRef = React.useRef(null);
  const descriptionHeaderRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      cache.clearAll();
    }, 0);
  }, []);

  return (
    <DataTable data={filteredTokens} className={styles.tokensTable}>
      <DataTable.Head>
        <DataTable.Column
          name='name'
          children='Token name'
          ref={nameHeaderRef}
          w={0.2}
          wMax={140}
        />
        <DataTable.Column name='value' children='Value' ref={valueHeaderRef} w={0.2} wMax={140} />
        <DataTable.Column
          name='description'
          children='Description'
          ref={descriptionHeaderRef}
          w={0.6}
        />
      </DataTable.Head>
      {filteredTokens.length ? (
        <DataTable.Body
          renderRows={({ rows, renderRow }) => {
            const rowRenderer = ({ key, index, style, parent }) => {
              return (
                <CellMeasurer
                  key={key}
                  cache={cache}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  {({ measure }) => (
                    <div key={key} style={style} onLoad={measure}>
                      {renderRow(rows[index], { dataIndex: index })}
                    </div>
                  )}
                </CellMeasurer>
              );
            };

            return (
              <AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <List
                      height={800}
                      rowCount={rows.length}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowRenderer={rowRenderer}
                      width={width}
                      overscanRowCount={10}
                      tabIndex={-1}
                    />
                  );
                }}
              </AutoSizer>
            );
          }}
        >
          <DataTable.Cell name='name'>
            {(props, row) => {
              return {
                children: (
                  <Copy
                    copiedToast='Copied'
                    toCopy={row[props.name]}
                    title={'Copy to clipboard'}
                    trigger='click'
                    className={styles.tokenNameWrapper}
                  >
                    <button type='button' className={styles.tokenName}>
                      {row[props.name]}
                    </button>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name='value'>
            {(props, row) => {
              return {
                children: (
                  <Copy
                    copiedToast='Copied'
                    toCopy={row[props.name]}
                    title={'Copy to clipboard'}
                    trigger='click'
                    className={styles.tokenValueWrapper}
                  >
                    <button type='button' className={styles.tokenValue}>
                      <ColorPreview color={row[props.name]} />
                      {row[props.name]}
                    </button>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name='description' />
        </DataTable.Body>
      ) : (
        <NoData
          py={10}
          type={'nothing-found'}
          description={'Try searching by color, for example, "blue" or #c4e5fe.'}
        />
      )}
    </DataTable>
  );
});

export default BaseTokens;
