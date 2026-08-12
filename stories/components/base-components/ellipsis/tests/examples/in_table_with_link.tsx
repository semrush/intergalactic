import type { CellRenderProps } from '@semcore/ui/data-table';
import { LinkAction, DataTable } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

const removeProtocol = (url: string) => url.replace(/^(http|https):\/\//, '');

const data = [{
  keyword: 'ebay buy',
  kd: '77.8',
  cpc: '$1.25',
  url: 'https://developer.semrush.com/intergalactic/',
}, {
  keyword: 'www.ebay.com',
  kd: '11.2',
  cpc: '$3.4',
  url: 'https://developer.semrush.com/intergalactic/',
}, {
  keyword: 'www.ebay.com',
  kd: '10',
  cpc: '$0.65',
  url: 'https://developer.semrush.com/intergalactic/',
}, {
  keyword: 'ebay buy',
  kd: '-',
  cpc: '$0',
  url: 'n/a',
}, {
  keyword: 'ebay buy no url',
  kd: '-',
  cpc: '$0',
  url: undefined,
}, {
  keyword: 'ebay buy',
  kd: '75.89',
  cpc: '$0',
  url: 'https://semrush.com',
}, {
  keyword: 'ebay buy last',
  kd: '100',
  cpc: '$999',
  url: 'https://developer.semrush.com/intergalactic/',
}];

const pageLimit = 10;
const recalculateContainerWidth = (width: number) => width - 20;

type TableLinkProps = {
  /** Text size of the URL cell. LinkAction passes it on to Link.Text only, so the
   * external icon stays 14px whatever you pick here. */
  size?: 100 | 200 | 300 | 350 | 400 | 500 | 600 | 700 | 800;
};

export const defaultProps: TableLinkProps = {
  size: 300,
};

export default function Demo(props: TableLinkProps) {
  const { size = 300 } = props;
  const [currentPage, setCurrentPage] = React.useState(0);

  const urlRef = React.useRef(null);
  const [columnElement, setColumnElement] = React.useState(undefined);

  React.useEffect(() => {
    if (urlRef.current) {
      setColumnElement(urlRef.current);
    }
  }, []);

  const columns = React.useMemo(() => {
    return [{
      name: 'keyword',
      children: 'Keyword',
    }, {
      name: 'kd',
      children: 'KD, %',
      gtcWidth: 'minmax(70px, auto)',
      justifyContent: 'flex-end',
    }, {
      name: 'cpc',
      children: 'CPC',
      gtcWidth: 'minmax(70px, auto)',
      justifyContent: 'flex-end',
    }, {
      name: 'url',
      children: 'URL',
      gtcWidth: 'minmax(auto, 200px)',
      ref: urlRef,
    }];
  }, []);

  const renderCell = React.useMemo(() => (props: CellRenderProps<any, any>) => {
    if (props.columnName === 'url' && Boolean(columnElement)) {
      const url = props.row.url as string | null | undefined;

      return (
        <LinkAction
          displayHref={url ? removeProtocol(url) : ''}
          externalHref={url as string}
          internalAction={() => console.log('here we are')}
          size={size}

          ellipsis:cropPosition='middle'
          ellipsis:containerElement={columnElement}
          ellipsis:recalculateContainerWidth={recalculateContainerWidth}
        />
      );
    }
    return props.defaultRender();
  }, [columnElement, size]);

  const tableData = [];
  let index = 0;

  for (let i = 0; i < 10; i++) {
    tableData.push(...data.map((item) => {
      index++;
      return {
        ...item,
        keyword: `${index} ${item.keyword}`,
        url: item.url == null ? item.url : `${item.url}#${index}`,
      };
    }));
  }

  return (
    <>
      <DataTable
        aria-label='Table title'
        data={tableData.slice(currentPage * pageLimit, currentPage * pageLimit + pageLimit)}
        uniqueRowKey='keyword'
        columns={columns}
        renderCell={renderCell}
      />
      <Pagination
        totalPages={Math.ceil(tableData.length / pageLimit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        mt={2}
      />
    </>
  );
}
