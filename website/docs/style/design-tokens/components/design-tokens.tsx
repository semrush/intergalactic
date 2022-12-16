import React from 'react';
import styles from './design-tokens.module.css';
import Input from '@semcore/input';
import SearchIcon from '@semcore/icon/search/m';
import designTokens from './design-tokens.json';
import DataTable from '@semcore/data-table';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import { brightness } from '@semcore/utils/lib/color';
import Copy from '@components/Copy';

export const ColorPreview: React.FC<{ color: string }> = ({ color }) => {
  if (!color.startsWith('#') && !color.startsWith('rgba(')) return null;

  const needsBorder = React.useMemo(
    () => color.startsWith('rgba(') || brightness(color) > 230,
    [color],
  );

  return (
    <div
      style={{
        background: color,
        borderColor: needsBorder ? '#E0E1E9' : 'transparent',
      }}
      className={styles.colorPreview}
    />
  );
};

const DesignTokens: React.FC = () => {
  const [filter, setFilter] = React.useState('');
  const filteredTokens = React.useMemo(
    () =>
      designTokens.filter(({ name, rawValue, description }) => {
        if (!filter) return true;
        if (name?.toLowerCase().includes(filter.toLowerCase())) return true;
        if (rawValue?.toLowerCase().includes(filter.toLowerCase())) return true;
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
        <Input.Addon tag={SearchIcon} />
        <Input.Value placeholder="Find token" value={filter} onChange={setFilter} />
      </Input>
      <DataTable data={filteredTokens}>
        <DataTable.Head>
          <DataTable.Column name="name" children="Token name" ref={nameHeaderRef} />
          <DataTable.Column name="value" children="Value" ref={valueHeaderRef} />
          <DataTable.Column name="description" children="Description" ref={descriptionHeaderRef} />
          <DataTable.Column name="components" children="Used in" />
        </DataTable.Head>
        <DataTable.Body virtualScroll={{ rowHeight: 45, tollerance: 10 }} h={800}>
          <DataTable.Cell name="name">
            {(props, row) => {
              return {
                children: (
                  <Copy
                    title="Copied"
                    text={row[props.name]}
                    textTooltip={`Click to copy "${row[props.name]}"`}
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
                    title="Copied"
                    text={row.rawValue}
                    textTooltip={`Click to copy "${row.rawValue}"`}
                    trigger="click"
                    className={styles.tokenValueWrapper}
                  >
                    <div className={styles.tokenValue}>
                      <ColorPreview color={row.computedValue} />
                      <Ellipsis
                        trim="middle"
                        tooltip={false}
                        containerRect={valueHeaderRect}
                        containerRef={valueHeaderRef}
                      >
                        {row.rawValue}
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
          <DataTable.Cell name="components">
            {(props, row) => {
              if (!row[props.name].length) {
                return { children: null };
              }

              if (row[props.name].length === 1) {
                return {
                  children: (
                    <div>
                      <Link
                        target="_blank"
                        href={`/intergalactic/components/${row[props.name][0]}/`}
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
                      <Tooltip.Trigger className={styles.usages}>hint links</Tooltip.Trigger>
                      <Tooltip.Popper>
                        {row[props.name].map((componentName, index) => (
                          <React.Fragment key={componentName}>
                            <Link
                              target="_blank"
                              href={`/intergalactic/components/${componentName}/`}
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
