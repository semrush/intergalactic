import type { IconComponent } from '@semcore/icon';
import ChargebackLoss from '@semcore/icon/ChargebackLoss/m';
import ChargebackWinM from '@semcore/icon/ChargebackWin/m';
import MoneyCoinsM from '@semcore/icon/MoneyCoins/m';
import PopupM from '@semcore/icon/Popup/m';
import ReloadM from '@semcore/icon/Reload/m';
import ReturnM from '@semcore/icon/Return/m';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import type { FC } from 'react';
import { defineMessage, type MessageDescriptor, useIntl } from 'react-intl';

type PaymentOperationTypeProps = {
  operationType: string;
  testIdPrefix?: string;
};

const mapIcons: Record<string, IconComponent> = {
  purchase: MoneyCoinsM,
  charge: ReloadM,
  refund: ReturnM,
  update_card: PopupM,
  chargeback_win: ChargebackWinM,
  chargeback_loss: ChargebackLoss,
};

const mapTitles: Record<string, MessageDescriptor> = {
  purchase: defineMessage({
    defaultMessage: 'Purchase',
    id: 'app.components.payments_table.custom_cells.operation_type.purchase',
  }),
  charge: defineMessage({
    defaultMessage: 'Charge',
    id: 'app.components.payments_table.custom_cells.operation_type.charge',
  }),
  refund: defineMessage({
    defaultMessage: 'Refund',
    id: 'app.components.payments_table.custom_cells.operation_type.refund',
  }),
  update_card: defineMessage({
    defaultMessage: 'Update card',
    id: 'app.components.payments_table.custom_cells.operation_type.update_card',
  }),
  chargeback_win: defineMessage({
    defaultMessage: 'Chargeback win',
    id: 'app.components.payments_table.custom_cells.operation_type.chargeback_win',
  }),
  chargeback_loss: defineMessage({
    defaultMessage: 'Chargeback loss',
    id: 'app.components.payments_table.custom_cells.operation_type.chargeback_loss',
  }),
};

const PaymentOperationType: FC<PaymentOperationTypeProps> = ({
  operationType,
  testIdPrefix,
  ...textProps
}) => {
  const intl = useIntl();

  const Icon = mapIcons[operationType];
  const title = intl.formatMessage(mapTitles[operationType]);

  return (
    <Text
      {...textProps}
      tag={Flex}
      gap={2}
      alignItems='center'
      data-test={`${testIdPrefix}-payment-operation-type`}
    >
      <Icon color='icon-secondary-neutral' />
      {title}
    </Text>
  );
};

export default PaymentOperationType;
