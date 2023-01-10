import React from 'react';
import styles from './design-tokens.module.css';
import Input from '@semcore/input';
import SearchIcon from '@semcore/icon/search/m';
import baseTokens from './base-tokens.json';
import DataTable from '@semcore/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import Copy from '@components/Copy';
import { ColorPreview } from './design-tokens';

const BaseTokens = () => {
  const [filter, setFilter] = React.useState('');
  const filteredTokens = React.useMemo(
    () =>
      baseTokens.filter(({ name, value, description }) => {
        if (!filter) return true;
        if (name?.toLowerCase().includes(filter.toLowerCase())) return true;
        if (value?.toLowerCase().includes(filter.toLowerCase())) return true;
        if (description?.toLowerCase().includes(filter.toLowerCase())) return true;
        return false;
      }),
    [filter],
  );

  const nameHeaderRef = React.useRef(null);
  const nameHeaderRect = useResizeObserver(nameHeaderRef);
  const valueHeaderRef = React.useRef(null);
  const valueHeaderRect = useResizeObserver(valueHeaderRef);
  const descriptionHeaderRef = React.useRef(null);
  const descriptionHeaderRect = useResizeObserver(descriptionHeaderRef);

  return (
    <div>
      <Input className={styles.searchInput} size="l">
        <Input.Value placeholder="Find token" value={filter} onChange={setFilter} />
        <Input.Addon tag={SearchIcon} />
      </Input>
      <DataTable data={filteredTokens}>
        <DataTable.Head>
          <DataTable.Column name="name" children="Token name" ref={nameHeaderRef} />
          <DataTable.Column name="value" children="Value" ref={valueHeaderRef} />
          <DataTable.Column name="description" children="Description" ref={descriptionHeaderRef} />
        </DataTable.Head>
        <DataTable.Body virtualScroll={{ rowHeight: 45, tollerance: 10 }} h={800}>
          <DataTable.Cell name="name">
            {(props, row) => {
              return {
                children: (
                  <Copy
                    copiedToast="Copied"
                    toCopy={row[props.name]}
                    title={`Click to copy "${row[props.name]}"`}
                    trigger="click"
                    className={styles.tokenNameWrapper}
                  >
                    <div className={styles.tokenName}>
                      <Ellipsis
                        trim="middle"
                        tooltip={false}
                        containerRect={nameHeaderRect}
                        containerRef={nameHeaderRef}
                      >
                        {row[props.name]}
                      </Ellipsis>
                    </div>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name="value">
            {(props, row) => {
              return {
                children: (
                  <Copy
                    copiedToast="Copied"
                    toCopy={row[props.name]}
                    title={`Click to copy "${row[props.name]}"`}
                    trigger="click"
                    className={styles.tokenValueWrapper}
                  >
                    <div className={styles.tokenValue}>
                      <ColorPreview color={row[props.name]} />
                      <Ellipsis
                        trim="middle"
                        tooltip={false}
                        containerRect={valueHeaderRect}
                        containerRef={valueHeaderRef}
                      >
                        {row[props.name]}
                      </Ellipsis>
                    </div>
                  </Copy>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name="description">
            {(props, row) => {
              return {
                children: (
                  <Ellipsis
                    trim="middle"
                    containerRect={descriptionHeaderRect}
                    containerRef={descriptionHeaderRef}
                  >
                    {row[props.name]}
                  </Ellipsis>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </div>
  );
};

export default BaseTokens;
