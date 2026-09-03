import { ScreenReaderOnly } from '@semcore/base-components';
import React from 'react';

import type { ISelectedRows } from '../../store/SelectableRows';
import { SelectableRows } from '../../store/SelectableRows';

type Props<UniqKey> = {
  selectedRows: ISelectedRows<UniqKey>;
  getI18nText: (key: string) => string;
};

export function SRReactiveAnnouncer<UniqKey>(props: Props<UniqKey>) {
  const [ariaMessage, setAriaMessage] = React.useState('');

  const setAriaCallback = React.useCallback(() => {
    const isAllSelected = props.selectedRows.isAllSelected();

    const message = props.getI18nText(
      isAllSelected
        ? 'DataTable.allItemsSelected:aria-live'
        : 'DataTable.allItemsDeselected:aria-live',
    );
    setAriaMessage(message);
  }, [props.selectedRows]);

  const setMaxLimitReachedAriaCallback = React.useCallback((isExceeded: boolean) => {
    const message = props.getI18nText(
      isExceeded
        ? 'DataTable.maxLimitReached:aria-live'
        : 'DataTable.maxLimitNoLongerReached:aria-live',
    );
    setAriaMessage(message);
  }, [props.selectedRows]);

  React.useEffect(() => {
    const unsubscribe = props.selectedRows.on(SelectableRows.SELECT_ALL_EVENT, setAriaCallback);

    return unsubscribe;
  }, [props.selectedRows]);

  React.useEffect(() => {
    const unsubscribe = props.selectedRows.on(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, setMaxLimitReachedAriaCallback);

    return unsubscribe;
  }, [props.selectedRows]);

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 1000);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

  return (
    <ScreenReaderOnly role='status' aria-live='polite'>
      {ariaMessage}
    </ScreenReaderOnly>
  );
}
