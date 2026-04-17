import { ScreenReaderOnly } from '@semcore/base-components';
import React from 'react';

import type { DTRow } from '../Body/Row.types';
import { UNIQ_ROW_KEY } from '../DataTable/DataTable';

type Props<UniqKey> = {
  selectedRows: Array<UniqKey>;
  getI18nText: (key: string) => string;
  flatRows: DTRow<UniqKey>[];
  data: unknown[];
};

export function SRAnnouncer<UniqKey>(props: Props<UniqKey>) {
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [selectedAll, setSelectedAll] = React.useState(false);

  React.useEffect(() => {
    const selectedRowsSet = new Set<UniqKey>(props.selectedRows);

    const allChecked: UniqKey[] = [];
    const allUnchecked: UniqKey[] = [];

    props.flatRows.forEach((row) => {
      if (selectedRowsSet.has(row[UNIQ_ROW_KEY])) {
        allChecked.push(row[UNIQ_ROW_KEY]);
      } else {
        allUnchecked.push(row[UNIQ_ROW_KEY]);
      }
    });

    if (allChecked.length === props.data.length) {
      setSelectedAll(true);
    } else if (allUnchecked.length === props.data.length) {
      setSelectedAll(false);
    }
  }, [props.selectedRows, props.data, props.flatRows]);

  React.useEffect(() => {
    const { getI18nText } = props;

    const message = getI18nText(
      selectedAll
        ? 'DataTable.allItemsSelected:aria-live'
        : 'DataTable.allItemsDeselected:aria-live',
    );
    setAriaMessage(message);

    const timeout = setTimeout(() => setAriaMessage(''), 5000);

    return () => clearTimeout(timeout);
  }, [selectedAll, props.getI18nText]);

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
