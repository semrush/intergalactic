import React from 'react';
import styles from './design-tokens.module.css';
import Input from '@semcore/input';
import SearchIcon from '@semcore/icon/Search/m';
import DataTable from '@semcore/data-table';
import Copy from '@components/Copy';
import { ColorPreview } from './DesignTokens';
import Fuse from 'fuse.js';

const BaseTokens = ({ tokens }) => {
  const [filter, setFilter] = React.useState('');
  const tokensIndex = React.useMemo(
    () => new Fuse(tokens, { isCaseSensitive: false, keys: ['name', 'value', 'description'] }),
    [tokens],
  );
  const filteredTokens = React.useMemo(
    () => (filter ? tokensIndex.search(filter).map(({ item }) => item) : tokens),
    [tokens, tokensIndex, filter],
  );

  const nameHeaderRef = React.useRef(null);
  const valueHeaderRef = React.useRef(null);
  const descriptionHeaderRef = React.useRef(null);

  return (
    <div>
      <Input className={styles.searchInput} size='l'>
        <Input.Addon>
          <SearchIcon />
        </Input.Addon>
        <Input.Value
          placeholder='Enter color name to find token'
          value={filter}
          onChange={setFilter}
          aria-label={'Search base tokens'}
        />
      </Input>
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
        <DataTable.Body h={800}>
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
                    <div className={styles.tokenName}>{row[props.name]}</div>
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
                    <div className={styles.tokenValue}>
                      <ColorPreview color={row[props.name]} />
                      {row[props.name]}
                    </div>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell className={styles.cell} name='description' />
        </DataTable.Body>
      </DataTable>
    </div>
  );
};

export default BaseTokens;
