import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, type DataTableProps } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Modal from '@semcore/ui/modal';
import type { NSModal } from '@semcore/ui/modal';
import Tag from '@semcore/ui/tag';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BasicModalProps = NSModal.Props & {
  title?: string;
  content?: string;
  showCloseButton?: boolean;
};

const Demo = (props: BasicModalProps) => {
  const {
    title = 'Modal Title',
    content = 'Modal content goes here',
    showCloseButton = true,
    duration = 200,
    closable = true,
    disablePreventScroll = false,
    ghost = false,
    w,
    locale,
    ...restProps
  } = props;

  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  const columns = React.useMemo(() => {
    return [
      { name: 'keyword', children: 'Keyword', gtcWidth: '160px' },
      { name: 'tags', children: 'Tags', gtcWidth: '210px' },
      { name: 'kd', children: 'KD,%', gtcWidth: '80px' },
      { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
      {
        name: 'vol',
        children: 'Vol.',
        gtcWidth: '220px',
      },
    ];
  }, []);

  const renderCell: DataTableProps<any, any, any>['renderCell'] | undefined = React.useMemo(() => {
    return (props) => {
      const cellRef = React.useRef<HTMLDivElement | null>(null);

      if (props.columnName === 'vol') {
        return {
          ref: cellRef,
          children: (
            <Text
              ellipsis:cropPosition='middle'
              hint:triggerRef={cellRef}
              hint:placement='right'
              flex={1}
            >
              {props.value}
            </Text>
          ),
        };
      }

      if (props.columnName === 'tags') {
        const tags = props.row.tags;

        if (Array.isArray(tags)) {
          return (
            <Flex gap={1} flexWrap>
              {tags.map((tag) => (
                <Tooltip
                  key={tag.label}
                  placement='top'
                >
                  <Tooltip.Trigger tag={Tag} size='m' theme='secondary' color={tag.color}>
                    <Tag.Text>{tag.label}</Tag.Text>
                  </Tooltip.Trigger>
                  <Tooltip.Popper>{tag.tooltip}</Tooltip.Popper>
                </Tooltip>
              ))}
            </Flex>
          );
        }

        return null;
      }

      return props.defaultRender();
    };
  }, []);

  const text =
        'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        visible={visible}
        onClose={handleClose}
        duration={duration}
        closable={closable}
        disablePreventScroll={disablePreventScroll}
        ghost={ghost}
        w={w ?? 820}
        locale={locale}
        {...restProps}
      >
        <Modal.Title>{title}</Modal.Title>

        <Text size={200} mb={4} tag='p'>
          {content}
        </Text>

        <Flex direction='column'>
          <Text
            ellipsis:cropPosition='middle'
            ellipsis:lastRequiredSymbols={5}
            size={300}
            w='300px'
          >
            {text}
          </Text>

          <Link href='#'>
            <Link.Text w={480} ellipsis={true}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
              Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
              Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
            </Link.Text>
            <Link.Addon mt='-3px'>
              <LinkExternalM />
            </Link.Addon>
          </Link>
        </Flex>
        <DataTable
          data={data}
          aria-label='Table title'
          columns={columns}
          renderCell={renderCell}
          hMax={240}
          headerProps={{ sticky: true, withScrollBar: true }}
          w='100%'
        />

        {showCloseButton && (
          <Button use='primary' theme='success' size='l' mt={4} onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal>
    </>
  );
};

export const defaultProps: BasicModalProps = {
  title: 'Modal Title',
  content: 'Modal content goes here',
  showCloseButton: true,
  duration: 200,
  closable: true,
  disablePreventScroll: false,
  ghost: false,
  w: undefined,
  locale: undefined,
};

const baseData = [
  {
    keyword: 'ebay buy',
    tags: [
      { label: 'SEO', tooltip: 'Search engine optimization keyword', color: 'blue-500' },
      { label: 'Paid', tooltip: 'Paid search campaign keyword', color: 'green-500' },
    ],
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    tags: [
      { label: 'Brand', tooltip: 'Branded domain keyword', color: 'violet-500' },
      { label: 'Top', tooltip: 'Top-performing keyword cluster', color: 'orange-500' },
    ],
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    tags: [
      { label: 'Organic', tooltip: 'Organic traffic opportunity', color: 'salad-500' },
      { label: 'Audit', tooltip: 'Keyword requires manual review', color: 'red-500' },
    ],
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'ebay buy',
    tags: [
      { label: 'Low CPC', tooltip: 'Low cost-per-click keyword', color: 'gray-500' },
    ],
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    tags: [
      { label: 'Growth', tooltip: 'Growing keyword segment', color: 'green-500' },
      { label: 'Watch', tooltip: 'Track this keyword weekly', color: 'pink-500' },
    ],
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290,000,500',
  },
];

const data = Array.from({ length: 20 }, (_, index) => {
  const row = baseData[index % baseData.length];

  return {
    ...row,
    keyword: `${row.keyword} ${index + 1}`,
  };
});

export default Demo;
