import CopyM from '@semcore/icon/Copy/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import {
  type FC,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormattedNumber, FormattedDate, FormattedTime, defineMessage, useIntl } from 'react-intl';

import PaymentOperationType from './op_type';
import PaymentStatus from './payment_status';

type Timeout = ReturnType<typeof setTimeout>;

const titleMessageDescriptor = defineMessage({
  defaultMessage: '{value}. {br} Click to copy.',
  id: 'app.components.payments_table.custom_cells.copy.tooltip',
});

const copiedMessageDescriptor = defineMessage({
  defaultMessage: 'Copied!',
  id: 'app.components.payments_table.custom_cells.copy.tooltip.success',
});

type CopyProps = {
  value: string;
  cropPosition?: 'middle' | 'end' | 'none';
  handle?: boolean;
  cellProps: any;
  headerRef: HTMLElement | null;
};

// `width - 28` because there is custom copy icon (20px) on each cell + 8px gap between text and Icon. Therefore, the header width should be reduced based on the width of this icon.
const recalcFunc = (width: number) => (width - 28 - 26);
const recalcFuncNoHandle = (width: number) => width - 26;

const Copy: FC<CopyProps> = ({ value, cropPosition = 'none', handle = true, cellProps, headerRef }) => {
  const timeourRef = useRef<Timeout>();
  const [copied, setCopied] = useState(false);
  const intl = useIntl();

  useEffect(() => () => clearTimeout(timeourRef.current), []);

  if (!handle) {
    return (
      <Flex w='100%' inline alignItems='flex-start'>
        {cropPosition === 'none'
          ? (
              <Box inline>{value}</Box>
            )
          : (
              <Text
                ellipsis:cropPosition={cropPosition ?? 'end'}
                ellipsis:containerElement={headerRef ?? undefined}
                ellipsis:recalculateContainerWidth={recalcFuncNoHandle}
                hint={false}
                data-test-id={cellProps.dataKey}
              >
                {value}
              </Text>
            )}
      </Flex>
    );
  }

  const onClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    clearTimeout(timeourRef.current);
    navigator.clipboard.writeText(value);
    setCopied(true);
    timeourRef.current = setTimeout(() => setCopied(false), 1000);
  };

  const defaultTitle = intl.formatMessage(titleMessageDescriptor, {
    value,
    br: <br />,
  });
  const copiedTitle = intl.formatMessage(copiedMessageDescriptor);

  return (
    <Tooltip
      w='100%'
      tag={Flex}
      onClick={onClick}
      inline
      title={copied ? copiedTitle : defaultTitle}
      alignItems='flex-start'
      gap={2}
    >
      {cropPosition === 'none'
        ? (
            <Box inline>{value}</Box>
          )
        : (
            <Text
              ellipsis:cropPosition={cropPosition ?? 'end'}
              ellipsis:containerElement={headerRef ?? undefined}
              ellipsis:recalculateContainerWidth={recalcFunc}
              hint={false}
              data-test-id={cellProps.dataKey}
            >
              {value}
            </Text>
          )}
      {handle && (
        <Box>
          <CopyM width='20px' />
        </Box>
      )}
    </Tooltip>
  );
};

const CopyCell = ({ value, cellProps, headerRef, cropPosition = 'middle', handle = true }: any) => (
  <Copy value={value} cropPosition={cropPosition} cellProps={cellProps} headerRef={headerRef} handle={handle} />
);

const StatusCell = ({ value }: any) => <PaymentStatus status={value} />;

const OperationType = ({ value }: any) => (
  <PaymentOperationType operationType={value} />
);

const Money = ({ value, row }: any) => {
  const currency = row.currency as string | undefined;

  return (
    <FormattedNumber
      value={Number(value)}
      style='currency'
      currency={currency}
    />
  );
};

const Currency = ({ value }: any) => value.toUpperCase();

const DateCell = ({ value }: any) => {
  return (
    <FormattedDate value={value} month='short' year='numeric' day='numeric' />
  );
};

const TimeCell = ({ value }: any) => {
  return <FormattedTime value={value} />;
};

export {
  CopyCell,
  StatusCell,
  OperationType,
  Money,
  Currency,
  DateCell,
  TimeCell,
};
