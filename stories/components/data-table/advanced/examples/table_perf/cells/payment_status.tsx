import { Box } from '@semcore/ui/base-components';
import type { TagProps } from '@semcore/ui/tag';
import Tag from '@semcore/ui/tag';
import React from 'react';
import type { FC } from 'react';
import { defineMessage, useIntl } from 'react-intl';

type PaymentStatusProps = {
  status: 'success' | 'failed';
  short?: boolean;
  testIdPrefix?: string;
} & Omit<TagProps, 'color'>;

const colorsMap = {
  success: 'green-500',
  failed: 'red-500',
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
