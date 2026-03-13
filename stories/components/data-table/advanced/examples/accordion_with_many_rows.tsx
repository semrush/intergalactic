import type { EllipsisSettings } from '@semcore/ui/base-components';
import type { DataTableProps } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type TableInTableProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  onAccordionToggle?: DataTableProps<
    typeof data,
    any,
    any
  >['onAccordionToggle'];
  accordionDuration: DataTableProps<typeof data, any, any>['accordionDuration'];
  accordionAnimationRows: DataTableProps<typeof data, any, any>['accordionAnimationRows'];
  cropPosition?: EllipsisSettings['cropPosition'];
  hintProps?: false;
};

const Demo = (props: TableInTableProps) => {
  const keywordRef = React.useRef<HTMLDivElement | null>(null);
  const volRef = React.useRef<HTMLDivElement | null>(null);

  const [keywordElement, setKeywordElement] = React.useState<HTMLDivElement | null>(null);
  const [volElement, setVolElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setKeywordElement(keywordRef.current);
    setVolElement(volRef.current);
  }, []);

  const cropPos = props.cropPosition ?? 'middle';
  const resolvedHintProps = props.hintProps === false ? false : undefined;

  const expectsJsCalc = resolvedHintProps !== false || cropPos === 'middle';
  const renderCell: DataTableProps<any, any, any>['renderCell'] = React.useMemo(() => (cellProps) => {
    const ellipsisSettingsVol: EllipsisSettings = React.useMemo(() => {
      return {
        cropPosition: cropPos,
        containerElement: volElement ?? undefined,
      } as const;
    }, [volElement]);

    const ellipsisSettingsKeyword: EllipsisSettings = React.useMemo(() => {
      return {
        cropPosition: cropPos,
        containerElement: keywordElement ?? undefined,
        recalculateContainerWidth: (cellProps.isAccordionRow || cellProps.row[ACCORDION]) ? (width: number) => width - 26 : undefined,
      } as const;
    }, [keywordElement, cellProps.isAccordionRow]);

    if (cellProps.dataKey === 'keyword' && keywordElement) {
      return (
        <Text ellipsis={ellipsisSettingsKeyword} {...(resolvedHintProps !== undefined ? { hintProps: resolvedHintProps } : {})}>{cellProps.value}</Text>
      );
    }
    if (cellProps.dataKey === 'vol' && volElement) {
      return (
        <Text ellipsis={ellipsisSettingsVol} {...(resolvedHintProps !== undefined ? { hintProps: resolvedHintProps } : {})}>{cellProps.value}</Text>
      );
    }
    return cellProps.defaultRender();
  }, [keywordElement, volElement, cropPos, resolvedHintProps]);

  return (
    <DataTable
      data={data}
      aria-label='Parent'
      uniqueRowKey='keyword'
      accordionDuration={props.accordionDuration}
      accordionAnimationRows={props.accordionAnimationRows}
      accordionMode={props.accordionMode}
      columns={[
        { name: 'keyword', children: 'Keyword', ref: keywordRef, gtcWidth: '120px' },
        { name: 'kd', children: 'KD %' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.', ref: volRef, gtcWidth: 'minmax(60px, 120px)' },
        { name: 'kd1', children: 'KD %' },
        { name: 'cpc1', children: 'CPC' },
        { name: 'vol1', children: 'Vol.' },
        { name: 'kd2', children: 'KD %' },
        { name: 'cpc2', children: 'CPC' },
        { name: 'vol2', children: 'Vol.' },
        { name: 'kd3', children: 'KD %' },
        { name: 'cpc3', children: 'CPC' },
        { name: 'vol3', children: 'Vol.' },
        { name: 'kd4', children: 'KD %' },
        { name: 'cpc4', children: 'CPC' },
        { name: 'vol4', children: 'Vol.' },
      ]}
      renderCell={renderCell}
    />
  );
};

export const accordionTableInTableDefaultProps: TableInTableProps = {
  accordionMode: 'independent',
  accordionAnimationRows: undefined,
  accordionDuration: undefined,
  cropPosition: 'middle',
  hintProps: undefined,
};

Demo.defaultProps = accordionTableInTableDefaultProps;

function generateRandomString(length: number) {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const acc = Array(300)
  .fill(null)
  .map((item, id) => ({
    keyword: 'www.ebay.com' + id,
    kd: '11.2',
    cpc: '$3.4',
    vol: generateRandomString(10),

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  }));

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
    [ACCORDION]: acc,
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
    [ACCORDION]: [
      {
        keyword: 'www.ebay.com',
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
      },
      {
        keyword: 'ebay buy',
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
    ],
  },
  {
    keyword: 'www.ebay.com11',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
  {
    keyword: 'ebay buy22221112221212',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
  {
    keyword: 'ebay buy555444333xwww',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
];

export default Demo;
