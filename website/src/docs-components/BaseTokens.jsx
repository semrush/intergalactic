import React from 'react';
import styles from './design-tokens.module.css';
import { DataTable } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';
import Copy from '@components/Copy';
import { ColorPreview } from './DesignTokens';
import Fuse from 'fuse.js';
import { SearchInput } from './SearchInput.jsx';

import { logEvent } from '../../docs/.vitepress/theme/amplitude/amplitude';

let filteredTokensTimer = 0;
let searchTimer = 0;

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
    filteredTokensTimer = setTimeout(() => {
      cache.clearAll();
      setFilteredTokensToTable(filteredTokens);
    }, 300);

    return () => {
      clearTimeout(filteredTokensTimer);
    };
  }, [filteredTokens]);

  const handleChangeFilter = (value) => {
    clearTimeout(searchTimer);

    setFilter(value);

    searchTimer = setTimeout(() => {
      logEvent('design-tokens:searchBaseTokens', { value });
    }, 500);
  };

  return (
    <>
      <div className={styles.filters}>
        <SearchInput
          filter={filter}
          setFilter={handleChangeFilter}
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

  return (
    <DataTable data={filteredTokens} className={styles.tokensTable}>
      <DataTable.Head>
        <DataTable.Head.Column
          name='name'
          children='Token name'
          ref={nameHeaderRef}
          w={0.2}
          wMax={140}
        />
        <DataTable.Head.Column
          name='value'
          children='Value'
          ref={valueHeaderRef}
          w={0.2}
          wMax={140}
        />
        <DataTable.Head.Column
          name='description'
          children='Description'
          ref={descriptionHeaderRef}
          w={0.6}
        />
      </DataTable.Head>
      {filteredTokens.length ? (
        <DataTable.Body
          renderCell={(props) => {
            if (props.dataKey === 'name') {
              return (
                <Copy
                  copiedToast='Copied'
                  toCopy={props.row[props.dataKey]}
                  title={'Copy to clipboard'}
                  trigger='click'
                  className={styles.tokenNameWrapper}
                >
                  <button type='button' className={styles.tokenName} data-token-type={'baseToken'}>
                    {props.row[props.dataKey]}
                  </button>
                </Copy>
              );
            } else if (props.dataKey === 'value') {
              return (
                <Copy
                  copiedToast='Copied'
                  toCopy={props.row[props.dataKey]}
                  title={'Copy to clipboard'}
                  trigger='click'
                  className={styles.tokenValueWrapper}
                >
                  <button type='button' className={styles.tokenValue} data-token-type={'baseToken'}>
                    <ColorPreview color={props.row[props.dataKey]} />
                    {props.row[props.name]}
                  </button>
                </Copy>
              );
            }

            return props.defaultRender();
          }}
        />
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
