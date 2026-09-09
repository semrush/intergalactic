import IconM from '@semcore/icon/Cards/m';
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
const recalculateContainerWidth = (width: number) => width - 65;

/** Which string goes into `link.text`. */
export type TextPreset =
  | 'urlWithoutProtocol'
  | 'fullUrl'
  | 'short'
  | 'longWithSpaces'
  | 'longWithoutSpaces'
  | 'startsWithHttp'
  | 'custom';

/** Which string goes into `link.href`. */
export type HrefPreset = 'external' | 'sameOrigin' | 'relative';

export type TableLinkProps = {
  /**
   * Text rendered inside the link.
   *
   * `urlWithoutProtocol` — the realistic table case (protocol stripped).
   * `fullUrl` — keeps the protocol, so `text` itself looks like a URL.
   * `startsWithHttp` — plain words that merely begin with "http".
   * `custom` — free text from the `customText` control.
   *
   * The first two follow `hrefPreset`: with `sameOrigin` they show a same-host URL.
   * The rest are plain labels and stay the same whatever the href is.
   */
  textPreset?: TextPreset;
  /** Used only when `textPreset` is `custom`. */
  customText?: string;
  /**
   * Target of the link.
   *
   * `external` — the row URL (another host).
   * `sameOrigin` — absolute URL on the current host; the URL-derived text presets switch
   * to the same origin as well, with a query and a hash so text and target still differ.
   * `relative` — internal path, no host at all. Text keeps pointing at the row URL, which
   * is what makes `fullUrl` + `relative` the mismatched pair worth looking at.
   */
  hrefPreset?: HrefPreset;
  cropPosition?: 'middle' | 'end';
  withEllipsis?: boolean;
  actionsCount?: 1 | 2;
};

const LONG_WITH_SPACES = 'a very long link label that has plenty of spaces so it can wrap and be truncated in several different ways';
const LONG_WITHOUT_SPACES = 'averylonglinklabelwithoutanyspacesatallsothereisnoopportunitytowrapitonwordboundaries';

const INTERNAL_PATH = '/internal/page';

/**
 * Same origin as the `sameOrigin` href, but with a query and a hash on top, so the text is
 * recognisably the same page without being byte-identical to the target. The row id keeps
 * the rows distinct from each other, the way the external preset does with its `#N`.
 */
const buildSameOriginUrl = (url: string) => {
  const rowId = url.split('#')[1] ?? '';

  return `${window.location.origin}${INTERNAL_PATH}?utm_source=data-table&row=${rowId}#summary`;
};

const buildText = (url: string, textPreset: TextPreset, customText: string, hrefPreset: HrefPreset) => {
  const source = hrefPreset === 'sameOrigin' ? buildSameOriginUrl(url) : url;

  switch (textPreset) {
    case 'fullUrl':
      return source;
    case 'short':
      return 'link';
    case 'longWithSpaces':
      return LONG_WITH_SPACES;
    case 'longWithoutSpaces':
      return LONG_WITHOUT_SPACES;
    case 'startsWithHttp':
      return 'httpie tutorial for beginners';
    case 'custom':
      return customText;
    case 'urlWithoutProtocol':
    default:
      return removeProtocol(source);
  }
};

const buildHref = (url: string, hrefPreset: HrefPreset) => {
  switch (hrefPreset) {
    case 'sameOrigin':
      return `${window.location.origin}${INTERNAL_PATH}`;
    case 'relative':
      return INTERNAL_PATH;
    case 'external':
    default:
      return url;
  }
};

export default function Demo({
  textPreset = 'urlWithoutProtocol',
  customText = 'Set any text you like here',
  hrefPreset = 'external',
  cropPosition = 'middle',
  withEllipsis = true,
  actionsCount = 2,
}: TableLinkProps) {
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

  const buildActions = React.useCallback(() => {
    const first = {
      title: 'Open in new tab',
      icon: IconM,
      href: '#',
    } as const;
    const second = {
      title: 'Analyze this URL',
      icon: IconM,
      onClick: () => null,
    } as const;

    return actionsCount === 1 ? first : [first, second] as [typeof first, typeof second];
  }, [actionsCount]);

  const renderCell = React.useMemo(() => (cellProps: CellRenderProps<any, any>) => {
    if (cellProps.columnName === 'url' && Boolean(columnElement)) {
      const url = cellProps.row.url as string | null | undefined;

      if (!url) {
        return null;
      }

      if (!url.startsWith('http')) {
        return url;
      }

      return (
        <LinkAction
          link={{
            href: buildHref(url, hrefPreset),
            text: buildText(url, textPreset, customText, hrefPreset),
            ellipsisSettings: withEllipsis
              ? {
                  cropPosition,
                  containerElement: columnElement,
                  recalculateContainerWidth,
                }
              : undefined,
          }}
          actions={buildActions()}
        />
      );
    }
    return cellProps.defaultRender();
  }, [columnElement, textPreset, customText, hrefPreset, cropPosition, withEllipsis, buildActions]);

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
        onCurrentPageChange={(page: number) => setCurrentPage(page - 1)}
        mt={2}
      />
    </>
  );
}

export const defaultProps: TableLinkProps = {
  textPreset: 'urlWithoutProtocol',
  customText: 'Set any text you like here',
  hrefPreset: 'external',
  cropPosition: 'middle',
  withEllipsis: true,
  actionsCount: 2,
};

Demo.defaultProps = defaultProps;
