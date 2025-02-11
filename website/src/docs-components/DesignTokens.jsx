import React from 'react';
import styles from './design-tokens.module.css';
import Input from '@semcore/input';
import { ButtonLink } from '@semcore/button';
import Select from '@semcore/select';
import SearchIcon from '@semcore/icon/Search/m';
import DataTable from '@semcore/data-table';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import Copy from '@components/Copy';
import Fuse from 'fuse.js';

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

const DesignTokens = ({ tokens }) => {
  const [nameFilter, setNameFilter] = React.useState('');
  const [componentFilter, setComponentFilter] = React.useState(null);
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

  const nameHeaderRef = React.useRef(null);
  const valueHeaderRef = React.useRef(null);
  const descriptionHeaderRef = React.useRef(null);

  return (
    <div>
      <div className={styles.filters}>
        <Input className={styles.nameFilterInput} size='l'>
          <Input.Addon>
            <SearchIcon />
          </Input.Addon>
          <Input.Value
            placeholder='Enter component or element name to find token'
            value={nameFilter}
            onChange={setNameFilter}
            aria-label={'Search semantic tokens'}
          />
        </Input>
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
      <DataTable data={filteredTokens} className={styles.tokensTable}>
        <DataTable.Head>
          <DataTable.Column name='name' children='Token name' ref={nameHeaderRef} w={0.25} />
          <DataTable.Column name='value' children='Value' ref={valueHeaderRef} w={0.15} />
          <DataTable.Column
            name='description'
            children='Description'
            ref={descriptionHeaderRef}
            w={0.4}
          />
          <DataTable.Column name='components' children='Used in' w={0.2} />
        </DataTable.Head>
        <DataTable.Body h={800}>
          <DataTable.Cell name='name' className={styles.cell}>
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
                    <div className={styles.tokenName}>{row[props.name]}</div>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name='value' className={styles.cell}>
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
                    <div tabIndex={0} role={'button'} className={styles.tokenValue}>
                      <ColorPreview color={row.computedValue} />
                      {row.rawValue}
                    </div>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name='description' className={styles.cell} />
          <DataTable.Cell name='components' className={styles.cell}>
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
                    <Tooltip>
                      <Tooltip.Trigger tag={ButtonLink} use={'secondary'}>
                        {row[props.name].length} components
                      </Tooltip.Trigger>
                      <Tooltip.Popper>
                        {row[props.name].map((componentName, index) => (
                          <React.Fragment key={componentName}>
                            <Link
                              target='_blank'
                              href={`/intergalactic/components/${componentName}/${componentName}`}
                            >
                              {componentName}
                            </Link>
                            {index < row[props.name].length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </Tooltip.Popper>
                    </Tooltip>
                  </>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </div>
  );
};

export default DesignTokens;
