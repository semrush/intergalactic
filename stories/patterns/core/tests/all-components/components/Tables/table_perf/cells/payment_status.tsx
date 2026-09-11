import { Box } from '@semcore/ui/base-components';
import type { NSTag } from '@semcore/ui/tag';
import Tag from '@semcore/ui/tag';
import React from 'react';
import type { FC } from 'react';
import { defineMessage, useIntl } from 'react-intl';

type PaymentStatusProps = {
  status: 'success' | 'failed' | 'pending';
  short?: boolean;
  testIdPrefix?: string;
};

const colorsMap = {
  success: 'green-500',
  failed: 'red-500',
  pending: 'gray-500',
};

const textsMap = {
  success: defineMessage({
    defaultMessage: 'Success',
    id: 'app.components.payments_status.success',
  }),
  failed: defineMessage({
    defaultMessage: 'Failure',
    id: 'app.components.payments_status.failed',
  }),
  pending: defineMessage({
    defaultMessage: 'Pending',
    id: 'app.components.payments_status.pending',
  }),
};

const PaymentStatus: FC<PaymentStatusProps> = ({
  status,
  short,
  testIdPrefix = 'common',
  ...rest
}) => {
  const intl = useIntl();
  const title = intl.formatMessage(textsMap[status]);

  if (short) {
    return <Box aria-label={title} />;
  }

  return (
    <Tag
      {...rest}
      color={colorsMap[status]}
      data-test={`${testIdPrefix}-payment-status`}
    >
      {title}
    </Tag>
  );
};

export default PaymentStatus;
export type { PaymentStatusProps };
