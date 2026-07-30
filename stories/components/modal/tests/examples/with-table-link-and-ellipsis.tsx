import LinkExternalM from '@semcore/icon/LinkExternal/m';
import type { NSEllipsis } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Modal from '@semcore/ui/modal';
import type { NSModal } from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';
type WithTableLinkProps = NSModal.Props & {
  title?: string;
  content?: string;
  showCloseButton?: boolean;
  ellipsis?: true | NSEllipsis.Settings;
};
const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const recalculateContainerWidth = (width: number) => width - 28;

const ModalContent = ({ title, content, text, showCloseButton, handleClose }: any) => {
  const urlRef = React.useRef(null);
  const [columnElement, setColumnElement] = React.useState<HTMLElement | undefined>(undefined);

  React.useEffect(() => {
    if (urlRef.current) {
      console.log('mount table');
      setColumnElement(urlRef.current);
    }
  }, []);

  return (
    <>
      <Modal.Title>{title}</Modal.Title>
      <Text size={200} mb={4} tag='p'>
        {content}
      </Text>
      <Text
        ellipsis:cropPosition='middle'
        ellipsis:lastRequiredSymbols={5}
        size={300}
        w='300px'
      >
        {text}
      </Text>
      <DataTable
        data={data}
        aria-label='Table title'
        columns={[
          { name: 'keyword', children: 'Keyword' },
          {
            name: 'kd',
            children: 'KD, %',
            gtcWidth: 'minmax(70px, auto)',
            justifyContent: 'flex-end',
          },
          {
            name: 'cpc',
            children: 'CPC',
            gtcWidth: 'minmax(70px, auto)',
            justifyContent: 'flex-end',
          },
          {
            name: 'url',
            children: 'URL',
            gtcWidth: 'minmax(auto, 200px)',
            ref: urlRef,
          },
        ]}
        renderCell={(props) => {
          const triggerRef = React.useRef<HTMLAnchorElement | null>(null);

          if (props.columnName === 'url') {
            const pageUrl = props.value?.toString?.() || '';

            return (
              <Link
                href={pageUrl}
                target='_blank'
                rel='noopener noreferrer'
                color='text-primary'
                wMin={0}
                style={{ display: 'inline-flex', alignItems: 'center' }}
                ref={triggerRef}
              >
                <Link.Text
                  wMin={0}
                  wMax='calc(100% - 20px)'
                  ellipsis:cropPosition='end'
                  ellipsis:containerElement={columnElement}
                  ellipsis:recalculateContainerWidth={recalculateContainerWidth}
                  hint:triggerRef={triggerRef}
                >
                  {removeProtocol(pageUrl)}
                </Link.Text>
                <Link.Addon tag={LinkExternalM} color='icon-secondary-neutral' />
              </Link>
            );
          }

          return props.defaultRender();
        }}
      />
      {showCloseButton && (
        <Button use='primary' theme='success' size='l' onClick={handleClose}>
          Close
        </Button>
      )}
    </>
  );
};

const Demo = (props: WithTableLinkProps) => {
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
  // const urlRef = React.useRef(null);
  // const [columnElement, setColumnElement] = React.useState<HTMLElement | undefined>(undefined);
  //
  // React.useEffect(() => {
  //   if (urlRef.current) {
  //     setColumnElement(urlRef.current);
  //   }
  // }, []);
  //
  // const ellipsisSettings: NSEllipsis.Settings = React.useMemo(() => {
  //   return {
  //     cropPosition: 'end',
  //     containerElement: columnElement,
  //     recalculateContainerWidth: (width: number) => width - 28,
  //   };
  // }, [columnElement]);
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);
  const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

  return (
    <React.Fragment>
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
        <ModalContent
          title={title}
          content={content}
          text={text}
          showCloseButton={showCloseButton}
          handleClose={handleClose}
        />
      </Modal>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>
      <h2>Start editing to see some magic happen!</h2>

    </React.Fragment>
  );
};

export const defaultProps: WithTableLinkProps = {
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
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    url: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    url: 'https://semrush.com',
  },
];

Demo.defaultProps = defaultProps;

export default Demo;
