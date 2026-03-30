import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, type DataTableProps } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Modal from '@semcore/ui/modal';
import type { ModalProps } from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BasicModalProps = ModalProps & {
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
      { name: 'keyword', children: 'Keyword' },
      { name: 'kd', children: 'KD,%' },
      { name: 'cpc', children: 'CPC' },
      {
        name: 'vol',
        children: 'Vol.',
        gtcWidth: '100px',
      },
    ];
  }, []);

  const cellRef = React.useRef<HTMLDivElement | null>(null);

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
        w={w}
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
        />

        {showCloseButton && (
          <Button use='primary' theme='success' size='l' onClick={handleClose}>
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

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290,000,500',
  },
];

export default Demo;
