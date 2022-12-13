import React from 'react';
import styles from './design-tokens.module.css';
import Input from '@semcore/input';
import SearchIcon from '@semcore/icon/search/m';
import designTokens from './tokens-list.json';
import DataTable from '@semcore/data-table';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import { brightness } from '@semcore/utils/lib/color';
import Copy from '@components/Copy';

const ColorPreview: React.FC<{ color: string }> = ({ color }) => {
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
      designTokens.filter(({ name, defaultValue, description }) => {
        if (!filter) return true;
        if (name?.toLowerCase().includes(filter.toLowerCase())) return true;
        if (defaultValue?.toLowerCase().includes(filter.toLowerCase())) return true;
        if (description?.toLowerCase().includes(filter.toLowerCase())) return true;
        return false;
      }),
    [filter],
  );

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
          <DataTable.Column name="name" children="Name" wMin={350} flex="1 0 auto" />
          <DataTable.Column name="defaultValue" children="Value" ref={valueHeaderRef} />
          <DataTable.Column name="description" children="Description" ref={descriptionHeaderRef} />
          <DataTable.Column name="components" children="Used in" />
        </DataTable.Head>
        <DataTable.Body virtualScroll={{ rowHeight: 45 }} h={800}>
          <DataTable.Cell name="name">
            {(props, row) => {
              return {
                children: (
                  <div>
                    <Copy
                      title="Copied"
                      text={row[props.name]}
                      trigger="click"
                      className={styles.tokenName}
                    >
                      <div>{row[props.name]}</div>
                    </Copy>
                  </div>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name="defaultValue">
            {(props, row) => {
              return {
                children: (
                  <>
                    <ColorPreview color={row[props.name]} />
                    <Ellipsis
                      trim="middle"
                      containerRect={valueHeaderRect}
                      containerRef={valueHeaderRef}
                    >
                      {row[props.name]}
                    </Ellipsis>
                  </>
                ),
              };
            }}
          </DataTable.Cell>
          <DataTable.Cell name="description">
            {(props, row) => {
              return {
                children: (
                  <Ellipsis
                    trim="end"
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
                      <Tooltip.Trigger className={styles.usages}>
                        {row[props.name].length} components
                      </Tooltip.Trigger>
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
