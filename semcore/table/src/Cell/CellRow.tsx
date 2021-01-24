import React, { useContext } from 'react';

import Context from '../context';
import Cell, { ICellProps } from './Cell';
import { createBaseComponent, Merge, styled } from '@semcore/core';

export interface ITableCellRowProps extends ICellProps {
  /** Property responsible for highlighting the cell */
  highlighted?: boolean;
  /** Property responsible for the cell interactivity */
  interactive?: boolean;
  /** The cell theme */
  theme?: 'info' | 'success' | 'warning' | 'danger' | false;
}

function CellInner(props, ref) {
  const SCellRow = Cell;
  const { theme, highlighted, interactive, styles } = props;

  return styled(styles)(
    <SCellRow
      ref={ref}
      valign="top"
      theme={theme}
      highlighted={highlighted}
      interactive={interactive}
      {...props}
    />,
  );
}

CellInner.displayName = 'CellRow';

const CellCore = createBaseComponent<
  Merge<ITableCellRowProps, React.TdHTMLAttributes<HTMLTableCellElement>>
>(CellInner);

const CellRow = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  return <CellCore ref={ref} {...contextProps} {...props} />;
});

CellRow.displayName = 'CellRow';

export default CellRow;
