import type { CellRenderProps } from '@semcore/ui/data-table';
import { LinkAction, DataTable } from '@semcore/ui/data-table';
import IconM from '@semcore/ui/icon/Cards/m';
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
   */
  textPreset?: TextPreset;
  /** Used only when `textPreset` is `custom`. */
  customText?: string;
  /**
   * Target of the link.
   *
   * `external` — the row URL (another host).
   * `sameOrigin` — absolute URL on the current host.
   * `relative` — internal path, no host at all.
   */
  hrefPreset?: HrefPreset;
  /** Where Ellipsis puts the dots. */
  cropPosition?: 'middle' | 'end';
  /** Render Ellipsis at all. Turning it off makes `LinkAction` wrap instead of truncate. */
  withEllipsis?: boolean;
  /** How many actions sit next to the link. `1` passes an object, `2` passes a tuple. */
  actionsCount?: 1 | 2;
  /** Give both actions the same `title`, to check that keys stay unique. */
  duplicateActionTitles?: boolean;
};

const LONG_WITH_SPACES = 'a very long link label that has plenty of spaces so it can wrap and be truncated in several different ways';
const LONG_WITHOUT_SPACES = 'averylonglinklabelwithoutanyspacesatallsothereisnoopportunitytowrapitonwordboundaries';

const buildText = (url: string, textPreset: TextPreset, customText: string) => {
  switch (textPreset) {
    case 'fullUrl':
      return url;
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
      return removeProtocol(url);
  }
};

const buildHref = (url: string, hrefPreset: HrefPreset) => {
  switch (hrefPreset) {
    case 'sameOrigin':
      return `${window.location.origin}/internal/page`;
    case 'relative':
      return '/internal/page';
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
  duplicateActionTitles = false,
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
      title: duplicateActionTitles ? 'Open in new tab' : 'Analyze this URL',
      icon: IconM,
      onClick: () => null,
    } as const;

    return actionsCount === 1 ? first : [first, second] as [typeof first, typeof second];
  }, [actionsCount, duplicateActionTitles]);

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
            text: buildText(url, textPreset, customText),
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
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
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
  duplicateActionTitles: false,
};

Demo.defaultProps = defaultProps;
