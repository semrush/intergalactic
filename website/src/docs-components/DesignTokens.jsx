import React from 'react';
import styles from './design-tokens.module.css';
import { ButtonLink } from '@semcore/button';
import Select from '@semcore/select';
import DataTable from '@semcore/data-table';
import Link from '@semcore/link';
import { DescriptionTooltip } from '@semcore/tooltip';
import { NoData } from '@semcore/widget-empty';
import Copy from '@components/Copy';
import Fuse from 'fuse.js';
import { SearchInput } from './SearchInput.jsx';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { logEvent } from '../../docs/.vitepress/theme/amplitude/amplitude';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

export const ColorPreview = ({ color }) => {
  if (!color.startsWith('#') && !color.startsWith('rgba(')) return null;

  return (
    <div
      style={{
        background: color,
        '--cell-bg-color': color,
      }}
      className={styles.colorPreview}
    />
  );
};

let filteredTokensTimer = 0;

const DesignTokens = ({ tokens }) => {
  const [nameFilter, setNameFilter] = React.useState('');
  const [componentFilter, setComponentFilter] = React.useState(null);
  const [filteredTokensToTable, setFilteredTokensToTable] = React.useState(tokens);
  const tokensIndex = React.useMemo(
    () => new Fuse(tokens, { isCaseSensitive: false, keys: ['name', 'rawValue', 'description'] }),
    [tokens],
  );
  const filteredTokens = React.useMemo(() => {
    let result = tokens;
    if (nameFilter) {
      result = tokensIndex.search(nameFilter).map(({ item }) => item);
    }
    if (componentFilter) {
      result = result.filter((token) => token.components.includes(componentFilter));
    }
    return result;
  }, [tokens, tokensIndex, nameFilter, componentFilter]);

  const components = React.useMemo(
    () => [...new Set(tokens.flatMap((token) => token.components))],
    [tokens],
  );
  const componentsFilterOptions = React.useMemo(
    () => [
      { children: 'All components', label: 'All components', value: null },
      ...components
        .map((component) => ({
          children: component,
          label: component,
          value: component,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ],
    [components],
  );

  React.useEffect(() => {
    clearTimeout(filteredTokensTimer);

    filteredTokensTimer = setTimeout(() => {
      cache.clearAll();
      setFilteredTokensToTable(filteredTokens);
      logEvent('design-tokens:searchSemanticTokens', { value: nameFilter });
    }, 300);

    return () => {
      clearTimeout(filteredTokensTimer);
    };
  }, [filteredTokens]);

  return (
    <div>
      <div className={styles.filters}>
        <SearchInput
          filter={nameFilter}
          setFilter={setNameFilter}
          resultsCount={filteredTokens.length}
          placeholder='Enter component or element name to find token'
          ariaLabel={'Search semantic tokens'}
          statusAddonId={'search-message-design'}
        />
        <Select
          className={styles.componentsFilterSelect}
          size='l'
          placeholder='All components'
          aria-label='Filter by component'
          value={componentFilter}
          onChange={setComponentFilter}
          options={componentsFilterOptions}
        />
      </div>
      <DesignTokensTable filteredTokens={filteredTokensToTable} />
    </div>
  );
};

const DesignTokensTable = React.memo(({ filteredTokens }) => {
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
        <DataTable.Column name='name' children='Token name' ref={nameHeaderRef} w={0.15} />
        <DataTable.Column name='value' children='Value' ref={valueHeaderRef} w={0.25} />
        <DataTable.Column
          name='description'
          children='Description'
          ref={descriptionHeaderRef}
          w={0.4}
        />
        <DataTable.Column name='components' children='Used in' w={0.2} />
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
                    toCopy={row.rawValue}
                    title={'Copy to clipboard'}
                    trigger='click'
                    className={styles.tokenValueWrapper}
                  >
                    <button type='button' className={styles.tokenValue}>
                      <ColorPreview color={row.computedValue} />
                      {row.rawValue}
                    </button>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name='description' />
          <DataTable.Cell name='components'>
            {(props, row) => {
              if (!row[props.name].length) {
                return { children: null };
              }

              if (row[props.name].length === 1) {
                return {
                  children: (
                    <div>
                      <Link
                        target='_blank'
                        href={`/intergalactic/components/${row[props.name][0]}/${
                          row[props.name][0]
                        }`}
                        data-link-in-tooltip={row['name']}
                      >
                        {row[props.name][0]}
                      </Link>
                    </div>
                  ),
                };
              }

              return {
                children: (
                  <>
                    <DescriptionTooltip>
                      <DescriptionTooltip.Trigger
                        tag={ButtonLink}
                        use={'secondary'}
                        data-used-in-tooltip={row['name']}
                      >
                        {row[props.name].length} components
                      </DescriptionTooltip.Trigger>
                      <DescriptionTooltip.Popper>
                        {row[props.name].map((componentName, index) => (
                          <React.Fragment key={componentName}>
                            <Link
                              target='_blank'
                              href={`/intergalactic/components/${componentName}/${componentName}`}
                              data-link-in-tooltip={row['name']}
                            >
                              {componentName}
                            </Link>
                            {index < row[props.name].length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </DescriptionTooltip.Popper>
                    </DescriptionTooltip>
                  </>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      ) : (
        <NoData
          py={10}
          type={'nothing-found'}
          description={
            'Try searching by component name or its category, for example, "control", “bg”, “border”.'
          }
        />
      )}
    </DataTable>
  );
});

export default DesignTokens;
