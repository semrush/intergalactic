import React from 'react';
import styles from './design-tokens.module.css';
import { ButtonLink } from '@semcore/button';
import Select from '@semcore/select';
import { DataTable } from '@semcore/data-table';
import Link from '@semcore/link';
import { DescriptionTooltip } from '@semcore/tooltip';
import { NoData } from '@semcore/widget-empty';
import Copy from '@components/Copy';
import Fuse from 'fuse.js';
import { SearchInput } from './SearchInput.jsx';

import { logEvent } from '../../docs/.vitepress/theme/amplitude/amplitude';

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
let searchTimer = 0;

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
    filteredTokensTimer = setTimeout(() => {
      cache.clearAll();
      setFilteredTokensToTable(filteredTokens);
    }, 300);
  }, [filteredTokens]);

  const handleChangeFilter = (value) => {
    clearTimeout(searchTimer);

    setNameFilter(value);

    searchTimer = setTimeout(() => {
      logEvent('design-tokens:searchSemanticTokens', { value });
    }, 500);
  };

  const handleChangeComponentFilter = (value) => {
    setComponentFilter(value);

    logEvent('design-tokens:selectSemanticTokens', { value });
  };

  return (
    <div>
      <div className={styles.filters}>
        <SearchInput
          filter={nameFilter}
          setFilter={handleChangeFilter}
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
          onChange={handleChangeComponentFilter}
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

  return (
    <DataTable data={filteredTokens} className={styles.tokensTable}>
      <DataTable.Head>
        <DataTable.Head.Column name='name' children='Token name' ref={nameHeaderRef} w={0.15} />
        <DataTable.Head.Column name='value' children='Value' ref={valueHeaderRef} w={0.25} />
        <DataTable.Head.Column
          name='description'
          children='Description'
          ref={descriptionHeaderRef}
          w={0.4}
        />
        <DataTable.Head.Column name='components' children='Used in' w={0.2} />
      </DataTable.Head>
      {filteredTokens.length ? (
        <DataTable.Body
          virtualScroll
          renderCell={(props) => {
            if (props.dataKey === 'name') {
              return (
                <Copy
                  copiedToast='Copied'
                  toCopy={props.value}
                  title={'Copy to clipboard'}
                  trigger='click'
                  className={styles.tokenNameWrapper}
                >
                  <button
                    type='button'
                    className={styles.tokenName}
                    data-token-type={'semanticToken'}
                  >
                    {props.value}
                  </button>
                </Copy>
              );
            } else if (props.dataKey === 'value') {
              return (
                <Copy
                  copiedToast='Copied'
                  toCopy={props.row.rawValue}
                  title={'Copy to clipboard'}
                  trigger='click'
                  className={styles.tokenValueWrapper}
                >
                  <button
                    type='button'
                    className={styles.tokenValue}
                    data-token-type={'semanticToken'}
                  >
                    <ColorPreview color={props.row.computedValue} />
                    {props.row.rawValue}
                  </button>
                </Copy>
              );
            } else if (props.dataKey === 'components') {
              const value = props.row[props.dataKey];
              if (!value.length) {
                return { children: null };
              }

              if (value.length === 1) {
                return (
                  <div>
                    <Link
                      target='_blank'
                      href={`/intergalactic/components/${value[0]}/${value[0]}`}
                      data-link-in-tooltip={row['name']}
                    >
                      {value[0]}
                    </Link>
                  </div>
                );
              }

              return (
                <>
                  <DescriptionTooltip>
                    <DescriptionTooltip.Trigger
                      tag={ButtonLink}
                      use={'secondary'}
                      data-used-in-tooltip={row['name']}
                    >
                      {value.length} components
                    </DescriptionTooltip.Trigger>
                    <DescriptionTooltip.Popper>
                      {value.map((componentName, index) => (
                        <React.Fragment key={componentName}>
                          <Link
                            target='_blank'
                            href={`/intergalactic/components/${componentName}/${componentName}`}
                            data-link-in-tooltip={row['name']}
                          >
                            {componentName}
                          </Link>
                          {index < value.length - 1 && ', '}
                        </React.Fragment>
                      ))}
                    </DescriptionTooltip.Popper>
                  </DescriptionTooltip>
                </>
              );
            }

            return props.defaultRender();
          }}
        />
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
